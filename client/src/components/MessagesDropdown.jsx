import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useCurrentUser } from './UserContext';

function MessagesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (isOpen && currentUser) {
      fetchMessages();
    }
  }, [isOpen, currentUser]);

  const fetchMessages = async () => {
    if (currentUser) {
      try {
        const response = await axios.get(`http://localhost:3001/messages/${currentUser.username}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
  };

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Messages</button>
      {isOpen && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {messages.length > 0 ? messages.map((message, index) => (
            <li key={index} style={{ background: '#f0f0f0', margin: '5px', padding: '10px' }}>
              <strong>{message.subject}</strong><br />
              <span>from {message.sender}</span><br />
              <small>{new Date(message.createdAt).toLocaleString()}</small>
            </li>
          )) : <li>No messages found.</li>}
        </ul>
      )}
    </div>
  );
}

export default MessagesDropdown;
