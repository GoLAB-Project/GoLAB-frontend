import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../pages/css/roomOptionModal.css';
import '../pages/css/common.css';
import SubmitButton from '../components/SubmitButton';

const RoomOptionModal = () => {
    const navigate = useNavigate();
    const [activeContent, setActiveContent] = useState('general');
    const [privateRoom, setPrivateRoom] = useState(false);


    const changeContentBtn = (content) => {
        setActiveContent(content);
    }

    const handleRoomTypeChange = (event) => {
        setPrivateRoom(event.target.value === 'private');
    };

    const inviteFriends = [
        { id: 1, profile: 'profile1.png', userName: 'Friend 1' },
        { id: 2, profile: 'profile2.png', userName: 'Friend 2' },
        { id: 3, profile: 'profile3.png', userName: 'Friend 3' },
        // 임시 데이터
    ];

    return(
        <div className='backPage'>
            <div className="optionModal">
                <div className="optionTop">
                    <div className="optionBrand">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/GolabLogo.png`} alt="GoLAB 고래" />
                        <div>
                            <p className="optionKicker">GoLAB · 고래</p>
                            <h1 className="optionTitle">모드 선택</h1>
                        </div>
                    </div>
                    <Link to={"/room-list"} className="optionClose">닫기</Link>
                </div>
                <div className='optBtnGroup'>
                    <div className={`customRoomBtn roomOptBtn ${activeContent === 'custom' ? 'activeCustomRoomBtn' : ''}`}
                        onClick={() => changeContentBtn('custom')}>
                        <p className='typeName'>커스텀전</p>
                        <span className='typeText'>친구들과 함께하자</span>
                    </div>
                    <div className={`generalRoomBtn roomOptBtn ${activeContent === 'general' ? 'activeGeneralRoomBtn' : ''}`}
                        onClick={() => changeContentBtn('general')}>
                        <p className='typeName'>연습전</p>
                        <span className='typeText'>AI와 3분 변론</span>
                    </div>
                    <div className={`rankRoomBtn roomOptBtn ${activeContent === 'rank' ? 'activeRankRoomBtn' : ''}`}
                        onClick={() => changeContentBtn('rank')}>
                        <p className='typeName'>랭킹전</p>
                        <span className='typeText'>토론 대결 한 판 뜨자</span>
                    </div>
                </div>

                {activeContent === 'custom' && (
                    <div className='customRoomContent'>
                        <input className='setRoomName' type="text" placeholder="방 이름을 설정해주세요"/>
                        <button className='randomNameBtn'>랜덤설정</button>
                        <div className='radioPrivateBtn'>
                            공개방 <input type="radio" name="roomSecurityType" value="public"  onChange={handleRoomTypeChange} />
                            &nbsp; &nbsp;비공개방 <input type="radio" name="roomSecurityType" value="private"  onChange={handleRoomTypeChange} />
                        {privateRoom && 
                        (<span>
                            <input className='setRoomPassword' type="password" placeholder="암호 입력" />
                            <button className='setPwBtn'>설정</button>
                        </span>
                        )}
                        </div>
                        <div className='inviteFriendsBox'>
                            {inviteFriends.map((friend) => (
                                <div className='oneFriendList' key={friend.id}>
                                    <div className='profileCol'>
                                        <img src={`path/to/profiles/${friend.profile}`} alt="Profile" />
                                    </div>
                                    <div className='usernameCol'>{friend.userName}</div>
                                    <div className='checkboxCol'>
                                        <input type="checkbox" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <SubmitButton submitText={"만들기"} />
                    </div>
                )}
                {activeContent === 'general' && (
                    <div className='practiceContent'>
                        <p className='practiceLead'>주제와 입장이 추첨됩니다. 오프닝·크로스·클로징 뒤 AI 심판이 승패를 가릅니다.</p>
                        <ul className='practiceRules'>
                            <li>상대는 검사 / 댓글러 / 교수 페르소나 중 하나</li>
                            <li>제약 카드가 붙습니다. 금기어와 필수어를 보세요</li>
                            <li>크로스에서는 상대 마지막 문장을 받고 반박하세요</li>
                        </ul>
                        <button className='startPracticeBtn' onClick={() => navigate('/room')}>연습전 시작</button>
                    </div>
                )}
                {activeContent === 'rank' && (
                    <div className='practiceContent'>
                        <p className='practiceLead'>랭킹전은 다음 단계에서 붙입니다. 지금은 AI 연습전을 먼저 완성합니다.</p>
                    </div>
                )}

            </div>
        </div>
    )
};

export default RoomOptionModal;