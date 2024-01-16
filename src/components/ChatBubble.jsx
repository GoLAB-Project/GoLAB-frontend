import React from 'react';
import './chatBubble.css';

const ChatBubble = ({ message, isUser }) => {
    return (
        <div className={`chat-bubble ${isUser ? 'user' : 'other'}`}>
             {message.split('\n').map((line, index) => (
                <span key={index}>{line}<br/></span>
            ))}
        </div>
    );
};

export default ChatBubble;
