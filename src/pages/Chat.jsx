import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../pages/css/common.css";
import "../pages/css/individualChat.css";
import ChatBubble from "../components/ChatBubble";
import { useChatSocket } from "../hooks/useChatSocket";

const RoomItem = React.memo(({ room, isActive, onClick }) => (
    <div
        className={`oneFriend ${isActive ? "activeFriend" : ""}`}
        onClick={() => onClick(room.roomId || room.id)}
    >
        <div className="friendProfile">{room.profile_img_url}</div>
        <div className="friendName">{room.roomName || room.name}</div>
        <div className="friendScore">
            {room.notReadChat > 0 ? `새 메시지 ${room.notReadChat}` : '점수/접속상태?'}
        </div>
    </div>
));

const Chat = () => {
    const [userId, setUserId] = useState();
    const [friendList, setFriendList] = useState([]);
    const [roomList, setRoomList] = useState([]);

    useEffect(() => {
        getFriendChatList();
        getUserId();
        getRoomList();
    }, []);

    const getFriendChatList = async () => {
        try {
            const response = await axios.get('/friend/');
            setFriendList(response.data);
        } catch (error) {
            console.error("Error getting data from server:", error);
        }
    }

    const getUserId = async () => {
        try {
            const response = await axios.get('/user/id');
            setUserId(response.data);
        } catch (error) {
            console.error("id값 불러오기 오류 Error getting data from server::", error);
        }
    }

    const getRoomList = async () => {
        try {
            const response = await axios.get('/chat/rooms'); // REST API 기획에 맞게 경로 변경
            setRoomList(response.data);
        } catch (error) {
            console.error("roomList 불러오기 오류 Error getting data from server:.", error);
        }
    }

    const [messages, setMessages] = useState([]);
    const [activeRoomId, setActiveRoomId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState(roomList);
    const [messageInput, setMessageInput] = useState("");
    const [hasMore, setHasMore] = useState(true);
    const msgContentRef = useRef(null);

    const { sendMessage, sendRead } = useChatSocket(userId, activeRoomId, setMessages, setRoomList);

    useEffect(() => {
        setSearchResults(roomList);
    }, [roomList]);

    useEffect(() => {
        const filteredResults = roomList.filter((room) =>
            (room.roomName || room.name || "").toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredResults);
    }, [searchQuery, roomList]);

    const convertMessages = React.useCallback((list) => {
        return list.map((chat) => {
            return {
                id: chat.id,
                text: chat.message,
                isUser: chat.sendUserId === userId,
            };
        });
    }, [userId]);

    const getChattingList = React.useCallback(async (roomId, cursor = null) => {
        const url = cursor 
            ? `/chat/rooms/${roomId}/messages?cursor=${cursor}&size=30`
            : `/chat/rooms/${roomId}/messages?size=30`;
        const response = await axios.get(url);
        return {
            messages: convertMessages(response.data.chattingList || response.data),
            nextCursor: response.data.nextCursor,
            hasNext: response.data.hasNext !== undefined ? response.data.hasNext : false
        };
    }, [convertMessages]);

    const handleRoomClick = React.useCallback(async (roomId) => {
        if (activeRoomId === roomId) {
            setActiveRoomId(null);
            setMessages([]);
        } else {
            setActiveRoomId(roomId);
            const data = await getChattingList(roomId);
            setMessages([...data.messages]);
            setHasMore(data.hasNext);
            
            if (data.messages.length > 0) {
                const lastMsg = data.messages[data.messages.length - 1];
                sendRead(roomId, lastMsg.id);
            }
        }
    }, [activeRoomId, getChattingList, sendRead]);

    const handleScroll = React.useCallback(async () => {
        const msgContent = msgContentRef.current;
        if (msgContent && msgContent.scrollTop === 0 && hasMore && messages.length > 0) {
            const oldestChatId = messages[0].id;
            const scrollHeightBefore = msgContent.scrollHeight;
            
            const data = await getChattingList(activeRoomId, oldestChatId);
            setMessages(prev => [...data.messages, ...prev]);
            setHasMore(data.hasNext);

            // 스크롤 위치 유지
            setTimeout(() => {
                msgContent.scrollTop = msgContent.scrollHeight - scrollHeightBefore;
            }, 0);
        }
    }, [activeRoomId, hasMore, messages, getChattingList]);

    const closeChatClick = React.useCallback(() => {
        setActiveRoomId(null);
        setMessages([]);
    }, []);

    const handleSearchChange = React.useCallback((event) => {
        setSearchQuery(event.target.value);
    }, []);

    const handleSendMessage = React.useCallback(() => {
        if (messageInput.trim() !== "") {
            sendMessage(activeRoomId, messageInput);
            setMessageInput("");
        }
    }, [messageInput, activeRoomId, sendMessage]);

    // 끝에 새 메시지가 추가될 때만 스크롤을 맨 아래로 이동 (이전 과거 메시지 로드 시에는 이동 안 함)
    const prevMessagesLength = useRef(messages.length);
    useEffect(() => {
        if (activeRoomId !== null && msgContentRef.current) {
            if (messages.length > prevMessagesLength.current) {
                const lastMessageAdded = messages[messages.length - 1];
                // 메시지가 뒤에 추가되었는지 확인하는 간단한 휴리스틱
                if (lastMessageAdded) {
                    msgContentRef.current.scrollTop = msgContentRef.current.scrollHeight;
                }
            }
        }
        prevMessagesLength.current = messages.length;
    }, [messages, activeRoomId]);

    const handleOnKeyPress = React.useCallback((e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            handleSendMessage();
            e.preventDefault();
        }
    }, [handleSendMessage]);

    return (
        <div className="backPage">
            <div className="gameContainer">
                <div className="individualHeader">
                    <input
                        className="searchFriend"
                        type="text"
                        placeholder="닉네임으로 검색"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button className="searchFriendBtn">검색</button>
                    <div className="commercialBox">광고가 들어가면 어떨까?</div>
                </div>
                <div className="individualContent">
                    <div className={"friendListBox"}>
                        {searchResults.map((room) => (
                            <RoomItem 
                                key={room.roomId || room.id} 
                                room={room} 
                                isActive={activeRoomId === (room.roomId || room.id)}
                                onClick={handleRoomClick}
                            />
                        ))}
                    </div>
                    <div className={"friendChatRoom"}>
                        {activeRoomId !== null ? (
                            <div className="friendChatting">
                                <div className="chatHeader">
                                    <img
                                        className="closeChatBtn"
                                        src={`${process.env.PUBLIC_URL}/assets/images/gameRoomList/leftArrow.png`}
                                        alt="닫기"
                                        onClick={closeChatClick}
                                    />
                                    {/* <span className="whoChat">
                                        {searchResults.find(r => r.roomId === activeRoomId)?.roomName} 님과의 채팅
                                    </span> */}
                                </div>
                                <div className="msgContent" ref={msgContentRef} onScroll={handleScroll}>
                                    <div className="chatBubbleContent">
                                        {messages.map((message, index) => (
                                            <ChatBubble
                                                key={message.id || index}
                                                message={message.text}
                                                isUser={message.isUser}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="msgInputDiv">
                                    <textarea
                                        className="msgInput"
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        onKeyDown={handleOnKeyPress}
                                    />
                                    <button
                                        className="sendMsg"
                                        onClick={handleSendMessage}
                                    >
                                        전송
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="noChoose">
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/images/GolabLogo.png`}
                                    className="chatLogo"
                                    alt="고랩"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Chat;