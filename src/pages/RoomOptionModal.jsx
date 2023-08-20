import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../pages/css/roomOptionModal.css';
import '../pages/css/common.css';
import SubmitButton from '../components/SubmitButton';

const RoomOptionModal = () => {

    const [activeContent, setActiveContent] = useState(null);
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
            <Link to = {"/room-list"}><img className='quitOptBtn' src={`${process.env.PUBLIC_URL}/assets/images/quit.png`} alt=""/></Link>
                <div className='optBtnGroup'>
                    <div className={`customRoomBtn roomOptBtn ${activeContent === 'custom' ? 'activeCustomRoomBtn' : ''}`}
                        onClick={() => changeContentBtn('custom')}>
                        <p className='typeName'>커스텀전</p>
                        <span className='typeText'>친구들과 함께하자</span>
                    </div>
                    <div className={`generalRoomBtn roomOptBtn ${activeContent === 'general' ? 'activeGeneralRoomBtn' : ''}`}
                        onClick={() => changeContentBtn('general')}>
                        <p className='typeName'>일반전</p>
                        <span className='typeText'>아무나 편하게 토론하자</span>
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
                    <div className='content'>General Room Content</div>
                )}
                {activeContent === 'rank' && (
                    <div className='content'>Rank Room Content</div>
                )}

            </div>
        </div>
    )
};

export default RoomOptionModal;