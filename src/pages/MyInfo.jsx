import React,{useState, useEffect} from "react";
import StyledLink from "../components/StyledLink";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/css/common.css';
import '../pages/css/myInfo.css';
import HeaderAndBack from "../components/HeaderAndBack";
import ProfileImage from "../components/ProfileImage";

const MyInfo = () => {
    const [mmr, setMmr] = useState("30");
    useEffect(() => {
        setMmr(20);
    }, []);
    
    

    return (
        <div className='backPage'>
            <div className='contentBox'>
                <HeaderAndBack headerText={""}/>
                <div className='myProfileImage'>
                    <ProfileImage/>
                    김고랩
                </div>
                <div className='myInfoBox'>
                    <div className='progressInfoBox'>
                        <div>등급</div>
                        <div>
                            경험치바
                            <ProgressBar variant="info" animated now={45} />
                        </div>
                        <div>
                            레이팅바
                            {mmr>50 ? (<ProgressBar variant="success" now={80} />):(<ProgressBar variant="danger" now={mmr} />)}
                        </div>
                        <div>승패 수</div>
                    </div>
                    <StyledLink to={"/find-id"}><p className="editText">비밀번호 수정</p></StyledLink>
                    <StyledLink to={"/social-connect"}><p className="editText">소셜로그인 연동</p></StyledLink>
                    <StyledLink to={"/faq"}><p className="editText">FAQ</p></StyledLink>
                    <StyledLink to={"/sad-bye"}><p className="editText" id="byeLink">탈퇴하기</p></StyledLink>

                </div>
            </div>

        </div>
    );
};

export default MyInfo;