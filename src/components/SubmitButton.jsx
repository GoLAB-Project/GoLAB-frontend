import React from "react";
import { useNavigate } from 'react-router';
import './submitButton.css'


const SubmitButton = ({submitText}) => {

    return(
        <button className='submitBtn'>{submitText}</button>
    )
}


export default SubmitButton;

