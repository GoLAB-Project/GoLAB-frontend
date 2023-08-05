import {React, useState} from "react";
import './profileClick.css'
import {markThousand} from '../util/markThousand';

const ProfileClick = ({closeModal}) => {
    const [score, setScore] = useState(markThousand(5505456321563));
    const friend = false;
    return(
        <div className="profileModal">
            <img className='quitBtn' onClick={closeModal} src={`${process.env.PUBLIC_URL}/assets/images/quit.png`} alt=""/>
            <div className='imageCircle' style={{cursor:'default'}}></div>
            닉네임<br/>
            {score}점
            <div className='friendButtons'>
                <button className="banBtn">차단하기</button>
                {friend? <button className="friendChkBtn">1:1대화</button> : <button className="friendChkBtn">친구추가</button>}
            </div>
        </div>
    )
}


export default ProfileClick;

