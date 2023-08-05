import React from "react";
import { useNavigate } from 'react-router';
import './headerAndBack.css'


const HeaderAndBack = ({headerText}) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    }

    return(
        <div className='headerAndBack'>
            <div className="backButton"><img src={`${process.env.PUBLIC_URL}/assets/images/Arrow_left.png`} alt="뒤로가기" onClick={handleGoBack}/></div>
            <div className='headerName'>{headerText}</div>
        </div>
    )
}


export default HeaderAndBack;

