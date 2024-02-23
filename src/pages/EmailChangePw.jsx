import React, { useState } from 'react';
import StyledLink from "../components/StyledLink";
import '../pages/css/emailChangePw.css';
import '../pages/css/common.css';
import HeaderAndBack from '../components/HeaderAndBack.jsx';
import SubmitButton from '../components/SubmitButton.jsx';

const EmailChangePw = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordChk, setShowPasswordChk] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState();

  const showPasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const checkPasswordVisibility = () => {
    setShowPasswordChk((prevShowPasswordChk) => !prevShowPasswordChk);
  };

  const handlePasswordMatch = () => {
    const newPassword = document.querySelector('.newPw').value;
    const newPasswordChk = document.querySelector('.newPwChk').value;
    setPasswordMatch(newPassword === newPasswordChk);
  };

  return (
    <div className='backPage'>
      <div className='contentBox'>
        <HeaderAndBack headerText={'비밀번호 변경'} />
        <div>
          <input
            type={showPassword ? 'text' : 'password'}
            className='newPw'
            placeholder='새 비밀번호'
            required
          />
          <button className={showPassword ? 'hide-icon' : 'view-icon'} onClick={showPasswordVisibility} />
          <input
            type={showPasswordChk ? 'text' : 'password'}
            className='newPwChk'
            placeholder='새 비밀번호 확인'
            required
            onChange={handlePasswordMatch}
          />
          <button className={showPasswordChk ? 'hide-icon' : 'view-icon'} onClick={checkPasswordVisibility} />
          {!passwordMatch && showPasswordChk ? <div className="errorText">비밀번호가 일치하지 않습니다.</div> : null}          <StyledLink to={'/login'}>
            <div className='goLogin'>
              <SubmitButton submitText={'수정하기'} />
            </div>
          </StyledLink>
        </div>
      </div>
    </div>
  );
};

export default EmailChangePw;
