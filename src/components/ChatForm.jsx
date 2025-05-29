import React, { useState, useRef } from 'react';

const ChatForm = ({chatHistory, setChatHistory, generateAiResponse}) => {
    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage)
          return;
        inputRef.current.value = "";
        setChatHistory((history) => [...history, {role: "user", text: userMessage}]);
        setTimeout(() => {
            setChatHistory((history) => [...history, {role: "model", text: "Thinking.."}]);
            generateAiResponse([...chatHistory, {role: "user", text: userMessage}]);
        }, 600);

    }

    return (
        <form action="#" className="form" onSubmit={handleFormSubmit}>        
        <input ref={inputRef} type='text' className='text-box' placeholder='Enter something to talk to the bot' required/>
        <button className='send'>Send</button>
      </form>
    );
}

export default ChatForm