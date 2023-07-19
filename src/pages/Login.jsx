import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import '../pages/css/login.css'

const Login = () => {
    return(
        <div className='login'>
            <div className='loginBox'>
                <div>
                <input type="text" className= "iptBox" placeholder="아이디" required/>
                </div>
                <div>
                <input type="password" className= "iptBox pwBox" placeholder="비밀번호" required/>
                </div>
                <div>
                <input type="checkbox" className='autoLogin'/><label for="autoLogin" className='autoLogin'>자동 로그인</label>
                </div>
                <button id="loginBtn">로그인</button>
                <div className="loginIcons"></div>
                <Link to = {"/find-id"}><p className="linkText" id="idText">아이디찾기</p></Link>
                <Link to = {"/find-pw"}><p className="linkText"id="pwText">비밀번호찾기</p></Link>
                <Link to = {"/join"}><p className="linkText" id="joinText">회원가입</p></Link>
            </div>
        </div>
    )
};

export default Login;