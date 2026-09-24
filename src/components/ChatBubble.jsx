import React from 'react';
import './chatBubble.css'; // Make sure to adjust the path to your CSS file

const ChatBubble = ({ message, isUser, kind, label }) => {
    const bubbleClass = kind === 'judge'
        ? 'chat-bubble judge'
        : `chat-bubble ${isUser ? 'user' : 'other'}`;
    return (
        <div className={bubbleClass}>
            {label && <div className="bubbleLabel">{label}</div>}
             {message.split('\n').map((line, index) => (
                <span key={index}>{line}<br/></span>
            ))}
        </div>
    );
};

export default React.memo(ChatBubble);
