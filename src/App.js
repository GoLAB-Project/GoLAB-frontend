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
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
