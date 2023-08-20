import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../pages/css/common.css';
import '../pages/css/gameRoom.css';
import ProfileImage from '../components/ProfileImage';

const GameRoom = () => {
    const [isReady, setIsReady] = useState(false);
    const userRole = 'observer';
    const navigate = useNavigate();

    const handleReadyClick = () => {
        setIsReady(!isReady);
    };

    const dummyParticipants = [
        {profileImage: '프로필1', nickname: '유저1', role: 'player1'},
        {profileImage: '프로필2', nickname: '유저2', role: 'observer'},
        {profileImage: '프로필3', nickname: '유저3', role: 'observer'},
        {profileImage: '프로필4', nickname: '유저4', role: 'player2'},
        {profileImage: '프로필5', nickname: '유저5', role: 'observer'},
    ];

    const roomData = [
        // {gameRoomId: 103, gameRoomType:'1', gameRoomName:'아무나 들어와'},
        {gameRoomId: 17, gameRoomType:'2', gameRoomName: '17번방'}
    ]

    const exitClick = () =>{
        const gameRoomType = roomData[0].gameRoomType
        const exitText = gameRoomType === '1' ? '정말 나가시겠습니까?' : '정말 나가시겠습니까?\n불이익이 적용됩니다.';
        const exitCheck = window.confirm(exitText);
        
        if (exitCheck) {
            navigate('/room-list');
        }

    }

    let roomTypeText = '';
    if (roomData[0].gameRoomType === '0') {
        roomTypeText = '[커스텀전]';
    } else if (roomData[0].gameRoomType === '1') {
        roomTypeText = '[일반전]';
    } else if (roomData[0].gameRoomType === '2') {
        roomTypeText = '[랭킹전]';
    }

    return (
        <div className='backPage'>
            <div className='gameContainer'>
                <div className='gameHeader'>
                    <span className='gameRoomName'> {roomTypeText} {roomData[0].gameRoomName}</span>
                    <button className='gameExitBtn' onClick={exitClick}>나가기</button>
                </div>
                <div className='gameContent'>
                    <div className='gameChatBox'>
                        <div className='chatContent'>채팅 들어가는 공간</div>
                        <div className='chatInputDiv'>
                        <input className='chatInput'/>
                        <button className='sendChat'>전송</button>
                        </div>
                    </div>
                    <div className='gameFunctions'>
                        <div className='timerBox'>타이머들어갈공간</div>
                        <div className='topicBox'>주제들어갈공간</div>
                        
                        {userRole === 'default' && (
                            <div className={`defaultBox ${isReady ? 'ready' : ''}`} onClick={handleReadyClick}>
                                {isReady ? '준비완료' : '준비하기'}
                            </div>
                        )}

                        {userRole === 'player' && (
                            <div className='ggButton'>
                                항복하기
                                <img src={`${process.env.PUBLIC_URL}/assets/images/game/white-flag.png`} className="surrenderIcon" alt="항복하다"/>
                            </div>
                        )}

                        {userRole === 'observer' && (
                            <div className='votePlayerButtons'>
                                <div className='votePlayer1'>플레이어1</div>
                                <div className='votePlayer2'>플레이어2</div>
                            </div>
                        )}

                        <div className='participantList'>
                            {dummyParticipants.map((participant, index) => (
                                <div className='oneParticipant' key={index}>
                                    <div className='participantProfile'>
                                        {participant.profileImage}
                                    </div>
                                    <div className='participantName'>{participant.nickname}</div>
                                    <div className={participant.role === 'player1' ? 'player1Role' : participant.role === 'player2' ? 'player2Role' : 'observerRole'}>
                                        {participant.role === 'player1' ? '플레이어' : participant.role === 'player2' ? '플레이어' : '관전자'}
                                    </div>
                                </div>
                            ))} 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameRoom;
