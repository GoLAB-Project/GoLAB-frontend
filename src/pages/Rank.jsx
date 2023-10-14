import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import '../pages/css/common.css';
import '../pages/css/rank.css';
import ProfileImage from "../components/ProfileImage";
import ProfileClick from "../components/ProfileClick";

const Rank = () => {
  const [rankList, setRankList] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [myRank, setMyRank] = useState([]);
  const userId = "user112";

  useEffect(() => {
    getRankList();
    getMyRank();
  }, []);

const getRankList = async () => {
    try {
    const response = await axios.get(`/gameRecord/ranks`);

    const tempRankList = response.data.map((item) => ({
      userId: item.userId,
      ranking: item.ranking,
      mmr: item.mmr
    }));

    setRankList(tempRankList);
  } catch (error) {
    console.error("Error getting data from the server:", error);
  }
}

const getMyRank = async () => {
    try{
      const myResponse = await axios.get(`/gameRecord/${userId}`);

      const tempMyRank = {
        userId : myResponse.data.userId,
        ranking: myResponse.data.ranking,
        mmr: myResponse.data.mmr
      };
      setMyRank(tempMyRank);
    } catch (error) {
      console.error("Error getting data from the server:", error);
    }
}


  const handleProfileClick = () =>{
    setShowProfile(true);
  }

  return (
    <div className='backPage'>
      <div className='contentBox' style={{backgroundColor:"#DAFFFB"}}>
        <div className='topThree'>
          {rankList.slice(0, 1).map((item, index) => (
          <div key={index}>
              <ProfileImage />
              <div>
                {item.userId}
                <br />
                {item.mmr}점
              </div>
          </div>
          ))}
            <div className='topSecondAndThird'>
          {rankList.slice(1, 3).map((item, index) => (
              <div key={index}>
              <ProfileImage />
              <div>
                {item.userId}
                <br />
                {item.mmr}점
              </div>
          </div>
          ))}

          </div>
          
        </div>
        <div className='rankListBox'>
          <table className='rankTable'>
          {rankList.slice(3, 10).map((item, index) => (
            <tr key={index}>
              <td className='trRanking'>{item.ranking}등</td>
              <td onClick={handleProfileClick} className='trProfile'>프로필이미지</td>
              <td className='trNickname'>{item.userId}</td>
              <td className='trScore'>{item.mmr}점</td>
            </tr>
          ))}
          </table>
        </div>
        <table className='myRank'>
            <tr>
            <td className='trRanking'>{myRank.ranking}등</td>
            <td className='trProfile'>프로필이미지</td>
            <td className='trNickname'>{myRank.userId}</td>
            <td className='trScore'>{myRank.mmr}점</td>
          </tr>
          </table>
          {showProfile && <ProfileClick closeModal={() => setShowProfile(false)} />}
      </div>
    </div>
  );
};

export default Rank;
