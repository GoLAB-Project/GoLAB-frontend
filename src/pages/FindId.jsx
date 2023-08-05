import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../pages/css/findId.css';
import '../pages/css/common.css';
import HeaderAndBack from "../components/HeaderAndBack.jsx";

const FindId = () => {
  const [email, setEmail] = useState("");
  const [validEmailFormat, setValidEmailFormat] = useState(true);

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    setValidEmailFormat(isValidEmail(emailValue));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isEmailValid = email.length > 0 && validEmailFormat;
  const isEmailEmpty = email.length === 0;

  return (
    <div className='backPage'>
      <div className='contentBox'>
        <HeaderAndBack headerText={"ID 찾기"} />
        <div className='findBox'>
          <input
            type="text"
            className={`iptEmail ${isEmailEmpty || validEmailFormat ? '' : 'error'}`}
            placeholder="이메일"
            required
            value={email}
            onChange={handleEmailChange}
          />
            <button className="btnEmail" disabled={!isEmailValid} style={{ cursor: isEmailValid ? "pointer" : "default" }} >메일 발송</button>
          {!isEmailEmpty && !validEmailFormat && <div className="errorText">올바른 이메일 형식을 입력해주세요.</div>}
          {isEmailEmpty && <div className="errorText">가입시 입력한 이메일을 입력해주세요.</div>}
        <div className="buttons">
            <Link to = {"/find-pw"}><button className='findPWandLogin'>비밀번호찾기</button></Link>
            <Link to = {"/login"}><button className='findPWandLogin'>로그인하기</button></Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default FindId;
