import React, { useState, useEffect } from "react";
import axios from "axios";
import '../pages/css/common.css';
import '../pages/css/socialConnect.css';
import SubmitButton from "../components/SubmitButton.jsx";
import HeaderAndBack from "../components/HeaderAndBack.jsx";

const SocialConnect = () => {
  const [toggleState, setToggleState] = useState({
    google: false,
    naver: false,
    kakao: false,
  });

  const handleToggleOn = (platform) => {
    if (!toggleState[platform]) {
      const isChecked = window.confirm("연동하시겠습니까?");
      if (isChecked) {
        const userId = "shubi";
        window.location.href = `http://localhost:8080/login/social/${userId}/${platform}`;
      }
    }
  };

  const handleToggleOff = (platform) => {
    if (toggleState[platform]) {
      const isConfirmed = window.confirm("연동을 해제하시겠습니까?");
      if (isConfirmed) {
        const disconnectUserId = "shubi";
        axios({
          url: `/login/social/disconnect/${disconnectUserId}/${platform}`,
          method: 'delete', 
          headers: {
            'Content-Type': 'application/json', 
          },
        })
          .then((response) => {
            if (response.status === 200) {
              const newToggleState = { ...toggleState };
              newToggleState[platform] = false;
              setToggleState(newToggleState);
              alert("연결이 해제되었습니다.");
            } else {
              alert("연결 해제를 실패했어요.");
            }
          })
          .catch((error) => {
            console.error("Error disconnecting social:", error);
            alert("연결 해제를 실패했어요.");
          });
      }
    }
  };
  

  useEffect(() => {
    fetchDataFromServer();
  }, []);

  const fetchDataFromServer = async () => {
    try {
      const userId = "shubi";
      const response = await axios.get(`/login/social/${userId}`);
      const connectInfo = response.data;

      setToggleState({
        google: connectInfo["1"] === "YES",
        naver: connectInfo["2"] === "YES",
        kakao: connectInfo["3"] === "YES",
      });
    } catch (error) {
      console.error("Error fetching data from server:", error);
    }
  };

  return (
    <div className='backPage'>
      <div className='contentBox'>
        <HeaderAndBack headerText={"소셜 로그인 연동"} />
        <div className='socialConnectToggle'>
          <label>
            구글 로그인 연동
            <span className="switch googleToggle">
              <input
                type="checkbox"
                onClick={() => handleToggleOn("google")}
                onChange={() => handleToggleOff("google")}
                checked={toggleState.google}
              />
              <span className="slider"></span>
            </span>
          </label>

          <label>
            네이버 로그인 연동
            <span className="switch">
              <input
                type="checkbox"
                onClick={() => handleToggleOn("naver")}
                onChange={() => handleToggleOff("naver")}
                checked={toggleState.naver}
              />
              <span className="slider"></span>
            </span>
          </label>
          <label>
            카카오 로그인 연동
            <span className="switch">
              <input
                type="checkbox"
                onClick={() => handleToggleOn("kakao")}
                onChange={() => handleToggleOff("kakao")}
                checked={toggleState.kakao}
              />
              <span className="slider"></span>
            </span>
          </label>
        </div>

        <SubmitButton submitText={"저장하기"} />
      </div>
    </div>
  );
};

export default SocialConnect;
