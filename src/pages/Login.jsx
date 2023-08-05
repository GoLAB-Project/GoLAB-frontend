import React from "react";
import {Link} from 'react-router-dom';
import '../pages/css/login.css'
import '../pages/css/common.css'

const Login = () => {
    
    return(
        <div className='backPage'>
            <div className='contentBox'>
                <img src={`${process.env.PUBLIC_URL}/assets/images/GoLAB.png`} alt="고랩" className="goLab"/>
                <div>
                <input type="text" className= "iptBox" placeholder="아이디" required/>
                </div>
                <div>
                <input type="password" className= "iptBox pwBox" placeholder="비밀번호" required/>
                </div>
                <div className='autoLogin'>
                <input type="checkbox"/><label for="autoLogin">자동 로그인</label>
                </div>
                <div>
                    <a href="http://localhost:8080/login/social/naver"><img src={`${process.env.PUBLIC_URL}/assets/images/login/naver.png`} className="loginIcons" alt="네이버로그인"/></a>
                    <a href="http://localhost:8080/login/social/google"><img src={`${process.env.PUBLIC_URL}/assets/images/login/google.png`} className="loginIcons" alt="구글로그인"/></a><br/>
                    <a href="http://localhost:8080/login/social/kakao"><img src={`${process.env.PUBLIC_URL}/assets/images/login/kakao.png`} className="loginIcons" alt="카카오로그인"/></a>
                    <Link to = {"/login"}><img src={`${process.env.PUBLIC_URL}/assets/images/login/loginButton.png`} className="loginIcons" alt="일반로그인"/></Link>
                </div>
                <Link to = {"/find-id"}><p className="linkText" id="idText">아이디찾기</p></Link>
                <Link to = {"/find-pw"}><p className="linkText"id="pwText">비밀번호찾기</p></Link>
                <Link to = {"/register"}><p className="linkText" id="joinText">아직 계정이 없으신가요?</p></Link>
            </div>
        </div>
    )
};

export default Login;