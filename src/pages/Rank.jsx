import React, { useState } from "react";
import StyledLink from "../components/StyledLink";
import '../pages/css/common.css';
import '../pages/css/rank.css';
import ProfileImage from "../components/ProfileImage";
import ProfileClick from "../components/ProfileClick";

const Rank = () => {

  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClick = () =>{
    setShowProfile(true);
  }

  return (
    <div className='backPage'>
      <div className='contentBox' style={{backgroundColor:"#DAFFFB"}}>
        <div className='topThree'>
          <div className='topFirst'>
            <ProfileImage/>
            <div>닉네임<br/>점수</div>
          </div>
          <div className='topSecondAndThird'>
          <div className='topSecond'>
            <ProfileImage/>
            <div>닉네임<br/>점수</div>
          </div>
          <div className='topThird'>
            <ProfileImage/>
            <div>닉네임<br/>점수</div>
          </div>
          </div>
          
        </div>
        <div className='rankListBox'>
          <table className='rankTable'> {/* 나중에 값 가져와서 map으로 돌리기*/}
            <tr>
              <td className='trRanking'>몇등</td>
              <td onClick={handleProfileClick} className='trProfile'>프로필이미지</td>
              <td className='trNickname'>닉네임</td>
              <td className='trScore'>몇점</td>
            </tr>
            <tr>
              <td className='trRanking'>몇등</td>
              <td className='trProfile'>프로필이미지</td>
              <td className='trNickname'>닉네임</td>
              <td className='trScore'>몇점</td>
            </tr>
            <tr>
              <td className='trRanking'>몇등</td>
              <td className='trProfile'>프로필이미지</td>
              <td className='trNickname'>닉네임</td>
              <td className='trScore'>몇점</td>
            </tr>
            <tr>
              <td className='trRanking'>몇등</td>
              <td className='trProfile'>프로필이미지</td>
              <td className='trNickname'>닉네임</td>
              <td className='trScore'>몇점</td>
            </tr>
            <tr>
              <td className='trRanking'>몇등</td>
              <td className='trProfile'>프로필이미지</td>
              <td className='trNickname'>닉네임</td>
              <td className='trScore'>몇점</td>
            </tr>
            <tr>
              <td className='trRanking'>몇등</td>
              <td className='trProfile'>프로필이미지</td>
              <td className='trNickname'>닉네임</td>
              <td className='trScore'>몇점</td>
            </tr>
            <tr>
              <td className='trRanking'>몇등</td>
              <td className='trProfile'>프로필이미지</td>
              <td className='trNickname'>닉네임</td>
              <td className='trScore'>몇점</td>
            </tr>
            
          </table>
        </div>
        <table className='myRank'>
          <tr>
              <td className='trRanking'>몇등</td>
              <td className='trProfile'>프로필이미지</td>
              <td className='trNickname'>닉네임</td>
              <td className='trScore'>몇점</td>
            </tr>
          </table>
          {showProfile && <ProfileClick closeModal={() => setShowProfile(false)} />}
      </div>
    </div>
  );
};

export default Rank;
