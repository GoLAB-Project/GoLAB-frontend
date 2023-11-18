import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../pages/css/login.css'
import '../pages/css/common.css'


const Login = () => {

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const handleUserId = (e) => {
        setUserId(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        console.log('click login');
        console.log(userId);
        setUserId("");
        setPassword("");

        axios.post('/user/login', { userId, password })
            .then(response => {
                console.log("post실행");
                alert("로그인 성공~");
                // sessionStorage.setItem("vo", JSON.stringify(response.data));
                // document.location.href = '/room'
                // const data = JSON.parse(sessionStorage.getItem("vo"));
                // alert(voemail);
            })
            .catch(error => {
                console.error(error);
                alert("로그인에 실패하였습니다.");
            });
    };

    const handleLogout = () => {
        console.log('click logout');
        axios.post('/user/logout', {})
            .then(response => {
                console.log("post실행");
                alert("로그아웃 성공~");
                // sessionStorage.setItem("vo", JSON.stringify(response.data));
                // document.location.href = '/room'
                // const data = JSON.parse(sessionStorage.getItem("vo"));
                // alert(voemail);
            })
            .catch(error => {
                console.error(error);
                alert("로그아웃에 실패하였습니다.");
            });
    };


    const checkPassword = () => {
        setPassword("");
        axios.get(`/user/password=${password}`)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.error('에러:', error);
            });
    };


    return (
        <div className='backPage'>
            <div className='contentBox'>
                <img src={`${process.env.PUBLIC_URL}/assets/images/GoLAB.png`} alt="고랩" className="goLab" />
                <div>
                    <input type="text" className="iptBox" placeholder="아이디" value={userId} onChange={handleUserId} required />
                </div>
                <div>
                    <input type="password" className="iptBox pwBox" placeholder="비밀번호" value={password} onChange={handlePassword} required />
                </div>
                <div className='autoLogin'>
                    <input type="checkbox" /><label for="autoLogin">자동 로그인</label>
                </div>
                <div>
                    <a href="http://localhost:8080/login/social/naver"><img src={`${process.env.PUBLIC_URL}/assets/images/login/naver.png`} className="loginIcons" alt="네이버로그인" /></a>
                    <a href="http://localhost:8080/login/social/google"><img src={`${process.env.PUBLIC_URL}/assets/images/login/google.png`} className="loginIcons" alt="구글로그인" /></a><br />
                    <a href="http://localhost:8080/login/social/kakao"><img src={`${process.env.PUBLIC_URL}/assets/images/login/kakao.png`} className="loginIcons" alt="카카오로그인" /></a>
                    <button onClick={() => handleLogin()}><img src={`${process.env.PUBLIC_URL}/assets/images/login/loginButton.png`} className="loginIcons" alt="일반로그인" /></button>
                    {/* <Link to={"/login"}><img src={`${process.env.PUBLIC_URL}/assets/images/login/loginButton.png`} className="loginIcons" alt="일반로그인" /></Link> */}
                </div>
                <Link to={"/find-id"}><p className="linkText" id="idText">아이디찾기</p></Link>
                <Link to={"/find-pw"}><p className="linkText" id="pwText">비밀번호찾기</p></Link>
                <Link to={"/register"}><p className="linkText" id="joinText">아직 계정이 없으신가요?</p></Link>
                <button onClick={() => handleLogout()}>로그아웃</button>
                <button onClick={() => checkPassword()}>비밀번호 확인</button>
            </div>
        </div>
    )
};

export default Login;