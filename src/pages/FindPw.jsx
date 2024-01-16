import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../pages/css/findId.css';
import '../pages/css/findPw.css';
import '../pages/css/common.css';
import HeaderAndBack from "../components/HeaderAndBack.jsx";
import SubmitButton from "../components/SubmitButton.jsx";


const FindPw = () => {
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
        <HeaderAndBack headerText={"비밀번호 찾기"} />
        <div>
        <input type="text" className='iptId' placeholder="아이디" required />
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
          <Link to = {"/login"}><div className="goButton"><SubmitButton submitText={"로그인하기"} /></div></Link>
        </div>
      </div>
    </div>
  );
};

export default FindPw;
