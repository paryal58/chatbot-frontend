const ChatMessage = ({chat}) => {
    return (
        <div className={`${chat.role === "model" ? 'ai' : 'user'}message`}>
          {chat.role === "model"}
          <p className="messagetext">{chat.text}</p>
        </div>
    );
};

export default ChatMessage;