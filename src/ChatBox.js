import React, { useState } from 'react';
import './App.css'

const ChatBox = ({ messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      // Call the onSendMessage function passed as prop
      onSendMessage(newMessage);

      // Clear the input field
      setNewMessage('');
    }
  };

  return (

  
    <div className="chat-box">
    <form onSubmit={handleSubmit} className="message-form" >
      <input type="text" value={newMessage} onChange={handleChange} className="message-input" />
      <button type="submit" className="send-button">Send</button>
    </form>
  </div>
  );
};

export default ChatBox;