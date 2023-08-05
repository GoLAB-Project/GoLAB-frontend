import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../pages/css/register.css';
import '../pages/css/common.css';
import HeaderAndBack from '../components/HeaderAndBack.jsx';
import SubmitButton from '../components/SubmitButton.jsx';

const Register = () => {

    const navigate = useNavigate();
    const [regUserId, setRegUserId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [idExistCheck, setIdExistCheck] = useState(false);
    const [emailMessage, setEmailMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [isPassword, setIsPassword] = useState();
    const [isEmail, setIsEmail] = useState();
  
    const onChangeEmail = (email) => {
        const emailRegExp =
        /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
        if (!emailRegExp.test(email)) {
            setEmailMessage("이메일 형식으로 입력해주세요.");
            setIsEmail(false);
        } else {
            setEmailMessage(null);
            setIsEmail(true);
        }
    };

    const onChangePassword = (password) => {
        setPassword(password);
        const passwordRegExp =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!passwordRegExp.test(password)) {
            setPasswordMessage(
                "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요."
                );
                setIsPassword(false);
            } else {
                setPasswordMessage("안전한 비밀번호에요.");
                setIsPassword(true);
              }
        };

        useEffect(() => {
          setPasswordMatch(password === passwordCheck);
        }, [passwordCheck]);

        const idExist = () => {
            setIdExistCheck(true)
        }

    return(
        <div className='backPage'>
            <div className='contentBox'>
            <HeaderAndBack headerText={'회원가입'} />
            <div className='join-box'>
                <div>
                    <div className='input-box'> 
                        <input type="text" id="regUserId" className='joinipt' 
                        value={regUserId}
                        onChange={(e) => {
                            setRegUserId(e.target.value); }} 
                            placeholder="아이디"
                        required />
            <button className="existId" onClick={idExist}>중복 확인</button>

                    </div>
                </div>        
                <div className='input-box'> 
                    <input type="password" id="userpw" className='joinipt joinpw'
                        value={password} 
                        onChange={(e) => {
                            onChangePassword(e.target.value);
                            setPassword(e.target.value); }} 
                        placeholder="비밀번호"
                        required/>
                </div>
                <div className='input-box'>
                    <input
                    type='password'
                    id='userpwCheck'
                    className='joinipt joinpw'
                    value={passwordCheck}
                    onChange={(e) => setPasswordCheck(e.target.value)}
                    placeholder="비밀번호 확인"
                    required
                    />
                </div>
                {!passwordMatch && <p className='regMessage'id='passwordCheck-Text'>비밀번호가 일치하지 않습니다.</p>}
                <div className='input-box'> 
                    <div className='email-box'>
                        <input type="email" id="email" className='joinipt joinEmail' 
                                value={email} 
                                onChange={(e) => {
                                    onChangeEmail(e.target.value);
                                    setEmail(e.target.value); }}
                                placeholder="이메일" 
                                required />
                        <button className="existId" onClick={idExist}>인증메일</button>

                    </div>
                    <p className={`regMessage ${!isEmail && "wrong"}`}>{emailMessage}</p> 
                </div>
        {!(idExistCheck&&passwordMatch) &&<button className='chkPlease'>확인해주세요</button>}
        {(idExistCheck)&&(passwordMatch) && <SubmitButton submitText={"가입하기"}/>}
                </div>
            </div>
        </div>
);

};
    
export default Register;