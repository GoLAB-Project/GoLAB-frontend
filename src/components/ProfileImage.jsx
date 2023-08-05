import React from "react";
import { useNavigate } from 'react-router';
import './profileImage.css'


const ProfileImage = ({imageLink}) => {

    return(
        <div className='imageCircle'>{imageLink}</div>
    )
}
export default ProfileImage;

