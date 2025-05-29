import { useState, useRef, useEffect } from 'react';
import ChatForm from './components/ChatForm';
import ChatMessage from './components/ChatMessage';
import './App.css';

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const chatBodyRef = useRef();

  const close = () => {
    window.location.href = "about:blank";
  };

  const generateAiResponse = async (history) => {
    const updateHistory = (text) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking.."),
        { role: "model", text },
      ]);
    };

    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    try {
      const response = await fetch('https://chatbotbackend-n7jq.onrender.com/generate-ai-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: formattedHistory }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate AI response.');
      }
      // Format response from the API
      const apiResponseText = (data?.candidates?.[0]?.content?.parts?.[0]?.text
        ?.replace(/\*\*(.*?)\*\*/g, "$1")
        .trim() || "No response from AI.")
        .replace(/(^|\s)\*/g, "$1\n*");

      updateHistory(apiResponseText);
    } 
    catch (error) {
      console.log('Error generating AI response:', error);
      updateHistory("Error: Could not generate response, please try again.");
    }
  };

  // Auto Scroll
  useEffect(() => {
    chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
  }, [chatHistory]);

  return (
    <section className='Chatbot-window'>
      <div className='window'>
        <h4>Gemini Powered ChatBot</h4>
        <button onClick={close}>X</button>
      </div>
      <hr></hr>
      <div ref={chatBodyRef} className='display'>
        <div className="aimessage">
          <p className="messagetext">How can I help you today?</p>
        </div>
        {chatHistory.map((chat, index) => (
          <ChatMessage key={index} chat={chat} />
        ))}
      </div>
      <div className='input'>
        <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateAiResponse={generateAiResponse} />
      </div>
    </section>
  );
}

export default App