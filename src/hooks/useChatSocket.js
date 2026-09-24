import { useEffect, useRef, useCallback } from "react";

export const useChatSocket = (userId, activeRoomId, setMessages, setRoomList) => {
    const socketRef = useRef(null);
    const activeRoomIdRef = useRef(activeRoomId);
    const userIdRef = useRef(userId);

    // ref 동기화 (클로저 stale 방지)
    useEffect(() => {
        activeRoomIdRef.current = activeRoomId;
    }, [activeRoomId]);

    useEffect(() => {
        userIdRef.current = userId;
    }, [userId]);

    const joinRoom = useCallback((roomId) => {
        if (!roomId) return;
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({
                type: "JOIN",
                roomId: String(roomId),
                sendUserId: userIdRef.current || 1,
            }));
        }
    }, []);

    const sendMessage = useCallback((roomId, message) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({
                type: "CHAT",
                roomId: String(roomId),
                message,
                sendUserId: userIdRef.current || 1,
            }));
        } else {
            console.warn("WebSocket is not connected. Unable to send message.");
        }
    }, []);

    const sendRead = useCallback((roomId, lastReadChatId) => {
        if (!roomId || !lastReadChatId) return;
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({
                type: "READ",
                roomId: String(roomId),
                lastReadChatId,
                sendUserId: userIdRef.current || 1,
            }));
        }
    }, []);

    // activeRoomId가 바뀔 때 해당 방에 JOIN 전송
    useEffect(() => {
        if (activeRoomId) {
            joinRoom(activeRoomId);
        }
    }, [activeRoomId, joinRoom]);

    useEffect(() => {
        const wsUrl = `ws://localhost:8080/ws/chat?userId=${userId || 1}`;
        const socket = new WebSocket(wsUrl);
        socketRef.current = socket;

        socket.onopen = () => {
            console.log("Chat WebSocket connected:", wsUrl);
            if (activeRoomIdRef.current) {
                joinRoom(activeRoomIdRef.current);
            }
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                const currentActiveRoomId = activeRoomIdRef.current;
                const currentUserId = userIdRef.current;

                if (data.type === 'CHAT') {
                    const chat = data.chatting || data.chat;
                    if (!chat) return;

                    const msgRoomId = data.roomId || chat.roomId;
                    const isCurrentRoom = currentActiveRoomId && String(currentActiveRoomId) === String(msgRoomId);

                    const formattedMsg = {
                        id: chat.id,
                        text: chat.message,
                        sendUserId: chat.sendUserId,
                        createdAt: chat.createdAt || chat.sendAt,
                        isUser: chat.sendUserId === currentUserId,
                    };

                    if (isCurrentRoom) {
                        setMessages(prev => {
                            // 중복 추가 방지
                            if (prev.some(m => m.id === chat.id)) return prev;
                            return [...prev, formattedMsg];
                        });

                        // 내가 보낸 것이 아닌 메시지를 현재 보고 있다면 읽음 처리 전송
                        if (chat.sendUserId !== currentUserId) {
                            sendRead(msgRoomId, chat.id);
                        }
                    }

                    // 방 목록 갱신 (마지막 메시지, 시간, 안읽은 수 등)
                    setRoomList(prev => {
                        const roomIndex = prev.findIndex(r => String(r.roomId || r.id) === String(msgRoomId));
                        if (roomIndex !== -1) {
                            const newRooms = [...prev];
                            const currentRoom = newRooms[roomIndex];
                            newRooms[roomIndex] = {
                                ...currentRoom,
                                lastChat: chat.message,
                                updatedAt: chat.createdAt || chat.sendAt,
                                notReadChat: isCurrentRoom ? 0 : (currentRoom.notReadChat || 0) + 1,
                            };
                            // 최신 메시지가 온 방을 목록 최상단으로 이동
                            const [updatedRoom] = newRooms.splice(roomIndex, 1);
                            return [updatedRoom, ...newRooms];
                        }
                        return prev;
                    });
                } else if (data.type === 'READ') {
                    // 방 목록 및 읽음 상태 동기화
                    const { roomId, userId: readUserId, lastReadChatId } = data;
                    if (String(currentActiveRoomId) === String(roomId)) {
                        // 필요 시 상대방이 읽었을 때 UI 갱신 (예: 1 제거 등)
                    }
                    if (readUserId === currentUserId) {
                        setRoomList(prev => prev.map(r => {
                            if (String(r.roomId || r.id) === String(roomId)) {
                                return { ...r, notReadChat: 0, lastReadChatId };
                            }
                            return r;
                        }));
                    }
                } else if (data.type === 'ROOM_UPDATE') {
                    const room = data.room;
                    if (room) {
                        const targetRoomId = room.roomId || room.id;
                        setRoomList(prev => prev.map(r => {
                            if (String(r.roomId || r.id) === String(targetRoomId)) {
                                return { ...r, ...room, roomId: targetRoomId };
                            }
                            return r;
                        }));
                    }
                }
            } catch (err) {
                console.error("Failed to parse WebSocket message:", err);
            }
        };

        socket.onerror = (error) => {
            console.error("Chat WebSocket error:", error);
        };

        socket.onclose = () => {
            console.log("Chat WebSocket disconnected");
        };

        return () => {
            if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
                socket.close();
            }
        };
    }, [userId, joinRoom, sendRead, setMessages, setRoomList]);

    return { sendMessage, sendRead, joinRoom };
};
