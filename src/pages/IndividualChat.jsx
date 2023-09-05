import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import '../pages/css/common.css';
import '../pages/css/individualChat.css';
import ChatBubble from '../components/ChatBubble';

const IndividualChat = () => {

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
    
    const dummyFriends = [
        {profileImage: '프로필1', nickname: '유저1'},
        {profileImage: '프로필2', nickname: '유저2'},
        {profileImage: '프로필3', nickname: '유저3'},
        {profileImage: '프로필4', nickname: '유저4'},
        {profileImage: '프로필5', nickname: '유저5'},
    ];

    const [messages, setMessages] = useState([
        { text: "자니...?", isUser: true },
        { text: "다름이 아니라 혹시 넷플릭스 비밀번호 바꿨어?? 로그인이 안되네", isUser: true },
        { text: "Hi there!", isUser: false },
    ]);

    const [activeFriendIndex, setActiveFriendIndex] = useState(null); 
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(dummyFriends);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        const filteredResults = dummyFriends.filter(
            (friend) =>
                friend.nickname.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredResults);
    }, [searchQuery]);

    

    const handleFriendClick = (index) => {
        if (activeFriendIndex === index) {
            setActiveFriendIndex(null); 
        } else {
            setActiveFriendIndex(index); 
        }
    };

    const closeChatClick = () => { 
        setActiveFriendIndex(null);
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSendMessage = (message) => {
        if(message.trim() !== ""){
            setMessages([...messages, { text: message, isUser: true }]);
            setMessageInput("");
        }
    };

    useEffect(() => {
        if (activeFriendIndex !== null) {
            const msgContent = document.querySelector('.msgContent');
            msgContent.scrollTop = msgContent.scrollHeight;
        }
    }, [messages, activeFriendIndex]);

    const handleOnKeyPress = e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSendMessage(messageInput);
            e.preventDefault();
        }
    }
    
    
    

    return (
        <div className='backPage'>
            <div className='gameContainer'>
                <div className='individualHeader'>
                    <input className='searchFriend' type='text' placeholder='닉네임으로 검색' 
                        value={searchQuery}
                        onChange={handleSearchChange}/>
                    <button className='searchFriendBtn'>검색</button>
                    <div className='commercialBox'>광고가 들어가면 어떨까?</div>
                </div>
                <div className='individualContent'>
                <div className={'friendListBox'}>
                        {searchResults.map((friend, index) => (
                            <div className={`oneFriend ${activeFriendIndex === index ? 'activeFriend':''}`} key={index} onClick={() => handleFriendClick(index)}>
                                <div className='friendProfile'>
                                    {friend.profileImage}
                                </div>
                                <div className='friendName'>{friend.nickname}</div>
                                <div className='friendScore'>점수/접속상태?</div>
                            </div>
                        ))} 
                    </div>
                    <div className={'friendChatRoom'}>
                        {activeFriendIndex !== null ? (
                            <div className='friendChatting'>
                                <div className='chatHeader'>
                                        <img
                                        className= 'closeChatBtn'
                                        src={`${process.env.PUBLIC_URL}/assets/images/gameRoomList/leftArrow.png`}
                                        alt="닫기"
                                        onClick={closeChatClick}
                                        />
                                            <span className='whoChat'>{searchResults[activeFriendIndex].nickname} 님과의 채팅</span>
                                    </div>
                                    <div className='msgContent'>
                                        <div className='chatBubbleContent'>
                                            {messages.map((message, index) => (
                                                <ChatBubble
                                                    key={index}
                                                    message={message.text}
                                                    isUser={message.isUser}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                <div className='msgInputDiv'>
                                <textarea className='msgInput'
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyDown={handleOnKeyPress}
                                />
                                <button className='sendMsg' onClick={() => handleSendMessage(messageInput)}>전송</button>

                                </div>
                            </div>
                        ) : (
                            <div className='noChoose'>
                                <img src={`${process.env.PUBLIC_URL}/assets/images/GolabLogo.png`} className='chatLogo'/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndividualChat;
