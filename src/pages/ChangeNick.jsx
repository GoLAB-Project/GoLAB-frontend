import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../pages/css/common.css';
import '../pages/css/findPw.css';
import '../pages/css/findId.css';
import HeaderAndBack from "../components/HeaderAndBack.jsx";
import SubmitButton from "../components/SubmitButton.jsx";


const ChangeNick = () => {
  const [nick, setNick] = useState("");

  const handleNick = (event) => {
    setNick(event.target.value);
  }

  const isNickValid = nick.length > 0 && nick.length <= 10; //10자 이내
    
return (
    <div className='backPage'>
    <div className='contentBox'>
      <HeaderAndBack headerText={"닉네임 수정"} />
      <div>
      <input type="text" className='iptId' placeholder="닉네임 입력(최대 10자)" required onChange={handleNick}/>
        {!isNickValid && <div className="errorText">바꾸려는 닉네임 길이를 확인해주세요</div>}

        <div className="notification">
        길이는 최대 10자 이내<br/>
        중복 닉네임 불가<br/>
        이모티콘 및 일부 특수문자 사용 불가 &&#60;&#62;&#40;&#41;&#39;&#47;&#34;<br/>
        </div>
        <div className="goButton"><SubmitButton submitText={"수정하기"} /></div>
      </div>
    </div>
  </div>
  );
};

export default ChangeNick;
