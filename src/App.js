import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import SocialConnect from './pages/SocialConnect';
import FindId from './pages/FindId';
import FindPw from './pages/FindPw';
import Rank from './pages/Rank';
import EmailChangePw from './pages/EmailChangePw';
import Register from './pages/Register';
import GameRoomList from './pages/GameRoomList';
import RoomOptionModal from './pages/RoomOptionModal';
import GameRoom from './pages/GameRoom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/social-connect" element={<SocialConnect/>}/>
          <Route path="/find-id" element={<FindId/>}/>
          <Route path="/find-pw" element={<FindPw/>}/>
          <Route path="/rank" element={<Rank/>}/>
          <Route path="/email-pw" element={<EmailChangePw/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/room-list" element={<GameRoomList/>}/>
          <Route path="/room-option" element={<RoomOptionModal/>}/>
          <Route path="/room" element={<GameRoom/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
