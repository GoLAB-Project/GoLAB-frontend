import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../pages/css/common.css";
import "../pages/css/individualChat.css";
import ChatBubble from "../components/ChatBubble";

const socket = new WebSocket("ws://localhost:8080/socket");

const IndividualChat = () => {
  const [userId, setUserId] = useState(1); // <Muk> 추후 세션에서 값 가져오는 것으로 변경
  const [friendList, setFriendList] = useState([]);

  // useEffect(() => {
  //     getFriendChatList();
  // },[]);

  // const getFriendChatList = async () => {
  //     try{
  //         const userId = "user100";
  //         const response = await axios.get(`/friendList/${userId}`);
  //         setFriendList(response.data);
  //     }catch (error) {
  //         console.error("Error getting data from server:", error);
  //       }
  // }

  // <Muk> 서버 상의 친구(채팅방) 목록을 가져오는 부분 필요
  const dummyFriends = [
    { profileImage: "프로필2", nickname: "유저2", roomId: "1" },
    { profileImage: "프로필3", nickname: "유저3", roomId: "2" },
    { profileImage: "프로필4", nickname: "유저4", roomId: "3" },
    { profileImage: "프로필5", nickname: "유저5", roomId: "4" },
    { profileImage: "프로필6", nickname: "유저6", roomId: "5" },
  ];

  // <Muk> 서버 상의 채팅 정보를 가져오는 부분 필요
  const [messages, setMessages] = useState([]);

  const [activeFriendIndex, setActiveFriendIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(dummyFriends);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    const filteredResults = dummyFriends.filter((friend) =>
      friend.nickname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [searchQuery]);

  const convertMessages = (list) => {
    return list.map((chat) => {
      return {
        text: chat.message,
        notRead: chat.notRead,
        isUser: chat.sendUserId === userId,
      };
    });
  };

  const getChattingList = async (receiveUserId) => {
    const response = await axios.get(`/chatting/${receiveUserId}`);
    const newMessages = convertMessages(response.data);
    return [...newMessages];
  };

  const isInNotReadMessages = (newMessages) => {
    // notRead === 1이고 isUser === false인 경우 true 반환
    return newMessages.some(
      (message) => message.notRead === 1 && message.isUser === false
    );
  };

  const handleFriendClick = async (index) => {
    if (activeFriendIndex === index) {
      setActiveFriendIndex(null);
      setMessages([]);
    } else {
      setActiveFriendIndex(index);

      // <Muk> 채팅방 입장 시 채팅 목록 갱신 (테스트용으로 +2)
      const newMessages = await getChattingList(index + 2);

      if (isInNotReadMessages(newMessages)) {
        const convertData = {
          type: "read",
          receiveUserId: index + 2, // <Muk> 테스트용으로 +2
        };
        socket.send(JSON.stringify(convertData));
      }

      setMessages([...newMessages]);
    }
  };

  const closeChatClick = () => {
    setActiveFriendIndex(null);
    setMessages([]);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSendMessage = (message) => {
    if (message.trim() !== "") {
      setMessages([...messages, { text: message, isUser: true }]);
      handleSendSocket();
      setMessageInput("");
    }
  };

  useEffect(() => {
    if (activeFriendIndex !== null) {
      const msgContent = document.querySelector(".msgContent");
      msgContent.scrollTop = msgContent.scrollHeight;
    }
  }, [messages, activeFriendIndex]);

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSendMessage(messageInput);
      e.preventDefault();
    }
  };

  const handleSendSocket = () => {
    const convertData = {
      type: "chat",
      receiveUserId: activeFriendIndex + 2, // <Muk> 테스트용으로 +2
      message: messageInput,
    };
    socket.send(JSON.stringify(convertData));
  };

  socket.onopen = () => {};
  socket.onmessage = (event) => {
    // <Muk> 데이터 파싱(채팅방 목록, 채팅방)
    const data = JSON.parse(event.data);
    const { roomList, chattingList } = data;

    // <Muk> 채팅방 목록 갱신(현재 프론트 상태에서는 필요 없음)
    console.log(roomList);

    // <Muk> 채팅 목록 갱신(현재 프로토타입 버전이라 변환 필요)
    const newMessages = convertMessages(chattingList);

    // <Muk> 상대 id 가져오기
    const sendUserIdList = chattingList.map((chat) => chat.sendUserId);
    const idList = Array.from(
      new Set(sendUserIdList.filter((id) => id !== userId))
    );
    const receiveUserId = idList[0];

    // 현재 활성화된 채팅방이 업데이트 되는가?
    // 아니라면 안 읽은 메시지의 수를 출력시킬 수 있을 것이다.
    if (activeFriendIndex === receiveUserId) {
      if (isInNotReadMessages(newMessages)) {
        const convertData = {
          type: "read",
          receiveUserId: receiveUserId, // <Muk> 테스트용
        };
        if (receiveUserId) socket.send(JSON.stringify(convertData));
      }

      setMessages([...newMessages]);
    }
  };

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
            {searchResults.map((friend, index) => (
              <div
                className={`oneFriend ${
                  activeFriendIndex === index ? "activeFriend" : ""
                }`}
                key={index}
                onClick={() => handleFriendClick(index)}
              >
                <div className="friendProfile">{friend.profileImage}</div>
                <div className="friendName">{friend.nickname}</div>
                <div className="friendScore">점수/접속상태?</div>
              </div>
            ))}
          </div>
          <div className={"friendChatRoom"}>
            {activeFriendIndex !== null ? (
              <div className="friendChatting">
                <div className="chatHeader">
                  <img
                    className="closeChatBtn"
                    src={`${process.env.PUBLIC_URL}/assets/images/gameRoomList/leftArrow.png`}
                    alt="닫기"
                    onClick={closeChatClick}
                  />
                  <span className="whoChat">
                    {searchResults[activeFriendIndex].nickname} 님과의 채팅
                  </span>
                </div>
                <div className="msgContent">
                  <div className="chatBubbleContent">
                    {messages.map((message, index) => (
                      <ChatBubble
                        key={index}
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
                    onClick={() => handleSendMessage(messageInput)}
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
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualChat;
