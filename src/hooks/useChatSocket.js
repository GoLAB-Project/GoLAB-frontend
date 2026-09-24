import { useEffect, useRef, useCallback } from "react";

export const useChatSocket = (userId, activeRoomId, setMessages, setRoomList) => {
    const socketRef = useRef(null);

    const sendMessage = useCallback((roomId, message) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({
                type: "CHAT",
                roomId,
                message,
            }));
        }
    }, []);

    const sendRead = useCallback((roomId, lastReadChatId) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({
                type: "READ",
                roomId,
                lastReadChatId,
            }));
        }
    }, []);

    useEffect(() => {
        // 웹소켓 연결
        socketRef.current = new WebSocket("ws://localhost:8080/socket");

        socketRef.current.onopen = () => {
            console.log("WebSocket connected");
        };

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            
            if (data.type === 'CHAT') {
                const { roomId, chat } = data;
                if (activeRoomId === roomId) {
                    setMessages(prev => [...prev, {
                        ...chat,
                        isUser: chat.sendUserId === userId
                    }]);
                    // 현재 활성화된 방에서 메시지를 받으면 즉시 읽음 처리 전송
                    sendRead(roomId, chat.id);
                }
                // 활성/비활성 방 모두에 대해 방 목록 업데이트
                setRoomList(prev => {
                    const roomIndex = prev.findIndex(r => r.roomId === roomId);
                    if (roomIndex !== -1) {
                        const newRooms = [...prev];
                        newRooms[roomIndex] = {
                            ...newRooms[roomIndex],
                            lastChat: chat.message,
                            updatedAt: chat.sendAt,
                            notReadChat: activeRoomId === roomId ? 0 : (newRooms[roomIndex].notReadChat || 0) + 1
                        };
                        // 최상단으로 끌어올리기
                        const updatedRoom = newRooms.splice(roomIndex, 1)[0];
                        return [updatedRoom, ...newRooms];
                    }
                    return prev;
                });
            } else if (data.type === 'ROOM_UPDATE') {
                const { room } = data;
                setRoomList(prev => prev.map(r => r.roomId === room.roomId ? { ...r, ...room } : r));
            }
        };

        socketRef.current.onclose = () => {
            console.log("WebSocket disconnected");
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [userId, activeRoomId, setMessages, setRoomList, sendRead]);

    return { sendMessage, sendRead };
};
