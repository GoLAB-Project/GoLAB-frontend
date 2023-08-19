import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../pages/css/gameRoomList.css';
import '../pages/css/common.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    
  
    return (
      <div className='paginationDiv'>
      <img
        className={`pageBtn ${isFirstPage ? 'disabledBtn' : ''}`}
        src={`${process.env.PUBLIC_URL}/assets/images/gameRoomList/leftArrow.png`}
        alt="왼쪽"
        onClick={() => onPageChange(currentPage - 1)}
      />
      <span>{currentPage}</span>
      <img
        className={`pageBtn ${isLastPage ? 'disabledBtn' : ''}`}
        src={`${process.env.PUBLIC_URL}/assets/images/gameRoomList/rightArrow.png`}
        alt="오른쪽"
        onClick={() => onPageChange(currentPage + 1)}
      />
    </div>
    );
  };

const GameRoomList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 8;
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState('');
  const [showPwModal, setShowPwModal] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const dummyRoomData = [
    { id: 1, roomType: '[일반전]', roomName: '1번 방', participants: 3, isPrivate: false },
    { id: 2, roomType: '[커스텀전]', roomName: '2번 방', participants: 5, isPrivate: true, password: '1234' },
    { id: 3, roomType: '[일반전]', roomName: '3번 방', participants: 7, isPrivate: false },
    { id: 4, roomType: '[커스텀전]', roomName: '4번 방', participants: 3, isPrivate: false },
    { id: 5, roomType: '[일반전]', roomName: '5번 방', participants: 7, isPrivate: true, password: '0000' },
    { id: 6, roomType: '[커스텀전]', roomName: '6번 방', participants: 5, isPrivate: false },
    { id: 7, roomType: '[일반전]', roomName: '7번 방', participants: 3, isPrivate: true, password: '3298' },
    { id: 8, roomType: '[커스텀전]', roomName: '8번 방', participants: 3, isPrivate: false },
    { id: 9, roomType: '[일반전]', roomName: '9번 방', participants: 5, isPrivate: true, password: '0302' },
    { id: 10, roomType: '[커스텀전]', roomName: '10번 방', participants: 7, isPrivate: false },
    { id: 11, roomType: '[일반전]', roomName: '11번 방', participants: 3, isPrivate: true, password: '0820' },
    { id: 12, roomType: '[커스텀전]', roomName: '12번 방', participants: 1, isPrivate: false },
    { id: 13, roomType: '[일반전]', roomName: '13번 방', participants: 5, isPrivate: false },
    { id: 14, roomType: '[커스텀전]', roomName: '14번 방', participants: 5, isPrivate: true, password: '1010' },
    { id: 15, roomType: '[일반전]', roomName: '15번 방', participants: 3, isPrivate: false },
    { id: 16, roomType: '[커스텀전]', roomName: '16번 방', participants: 7, isPrivate: false },
    { id: 17, roomType: '[일반전]', roomName: '17번 방', participants: 3, isPrivate: true, password: '0610' },
    { id: 18, roomType: '[커스텀전]', roomName: '18번 방', participants: 5, isPrivate: false },
    { id: 19, roomType: '[일반전]', roomName: '19번 방', participants: 7, isPrivate: true, password: '12345678' },
    { id: 20, roomType: '[커스텀전]', roomName: '20번 방', participants: 3, isPrivate: false },
];



  let filteredRooms = dummyRoomData.slice();

  if (selectedFilter === '공개방') {
    filteredRooms = dummyRoomData.filter((room) =>
      room.isPrivate == false
    );
  } else if (selectedFilter === '비공개방') {
    filteredRooms = dummyRoomData.filter((room) =>
      room.isPrivate == true
    );
  } else if (selectedFilter === '커스텀전') {
    filteredRooms = dummyRoomData.filter((room) =>
      room.roomType.includes('[커스텀전]')
    );
  } else if (selectedFilter === '일반전') {
    filteredRooms = dummyRoomData.filter((room) =>
      room.roomType.includes('[일반전]')
    );
  }
  else {
    filteredRooms = dummyRoomData.slice();
  }

  if (selectedParticipants !== '') {
    filteredRooms = filteredRooms.filter(
      (room) => room.participants === parseInt(selectedParticipants)
    );
  }

  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handleParticipantsChange = (event) => {
    setSelectedParticipants(event.target.value);
  };
    
  const handlePasswordInputChange = (event) => {
    setInputPassword(event.target.value);
    setPasswordError(false); 
  };

  const handlePasswordSubmit = () => {
    console.log('Submitted password:', inputPassword);
  
    const roomWithPassword = currentRooms.find(
      (room) => room.isPrivate && room.password === inputPassword
    );
  
    if (roomWithPassword) {
      window.location.href = '/room';
    } else {
      setPasswordError(true);
      setInputPassword('');
    }
  };

  return (
    <div className='backPage'>
      <div className='contentBox'>
        <div className='filterBox'>
          <select value={selectedFilter} onChange={handleFilterChange} className='selectGameMode'>
            <option value="">전체</option>
            <option value="공개방">공개방</option>
            <option value="비공개방">비공개방</option>
            <option value="커스텀전">커스텀전</option>
            <option value="일반전">일반전</option>
          </select>
            <select value={selectedParticipants} onChange={handleParticipantsChange} className='selectPpl'>
              <option value="">참여인원 전체</option>
              <option value="3">3명</option>
              <option value="5">5명</option>
              <option value="7">7명</option>
            </select>
        </div>
        <div className='roomListBox'>
        {currentRooms.map((room) => (
            <div
              className='oneRoomList'
              key={room.id}
              onClick={() => {
                if (room.isPrivate) {
                  setShowPwModal(true);
                } else {
                  window.location.href = '/room';
                }
              }}
            >
              <div className='roomTypeCol'>
                {room.isPrivate ? (
                  <>
                  <img
                    className='padlockImg'
                    src={`${process.env.PUBLIC_URL}/assets/images/gameRoomList/padlock.png`}
                  />
                  {room.roomType}
                  </>
                ) : (
                  <span>{room.roomType}</span>
                )}
              </div>
              <div className='roomNameCol'>{room.roomName}</div>
              <div className='participantCol'>{room.participants}</div>
            </div>
          ))}
        </div>
      <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
        <div className='enterGame'>
          <Link to='/room-option'>
            <button className='enterButton'>참여하기</button>
          </Link>
        </div>
        <input className='searchRoom' type='text' placeholder='검색' />
        <button className='searchBtn'>검색</button>
            {/* 비밀번호 모달창 */}
            {showPwModal && (
              <div className='pwModal'>
              <div className='pwModalContent'>
              <img className='quitBtn' onClick={() => setShowPwModal(false)} src={`${process.env.PUBLIC_URL}/assets/images/quit.png`} alt=""/>
              <h3>비밀번호를 입력하세요</h3>
              <input
                type='password'
                className={`gamePwInput ${passwordError ? 'error' : ''}`}
                value={inputPassword}
                onChange={handlePasswordInputChange}
              />
              <button className='pwSubmitAttend' onClick={handlePasswordSubmit}>
                참여
              </button>
              {passwordError && <p className='gamePwError'>비밀번호가 틀렸습니다</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameRoomList;
