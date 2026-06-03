import React from 'react';
import "./sd.css"
const ThoughtBubble = ({ thought = "I wonder what I should cook for dinner tonight... 🤔🍝" }) => {
    return (
        <>
            <div className="thought-bubble-container">
                <div className="thought-bubble-square">
                    <div className="thought-content">{thought}</div>
                </div>
                <div className="bubble-tail-1"></div>
                <div className="bubble-tail-2"></div>
            </div>
        </>
    );
};



export default ThoughtBubble;