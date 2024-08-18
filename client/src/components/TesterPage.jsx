import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

const TesterPage = () => {
    const [messages, setMessages] = useState(() => {
        // Load messages from localStorage when the component initializes
        const savedMessages = localStorage.getItem('chatMessages');
        return savedMessages ? JSON.parse(savedMessages) : [];
    });

    // Save messages to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    const handleSendMessage = async (event) => {
        event.preventDefault();
        const messageInput = event.target.elements.message;
        const userMessage = messageInput.value.trim();

        if (userMessage) {
            const updatedMessages = [...messages, { role: 'user', content: userMessage }];
            setMessages(updatedMessages);

            // Clear the input box after sending a message
            messageInput.value = '';

            try {
                // Send the user's message to the AI and get the response
                const response = await axios.post('http://localhost:3001/api/gemini-completions', {
                    prompt: userMessage,
                });

                const aiMessage = response.data.response;
                setMessages((prevMessages) => [...prevMessages, { role: 'ai', content: aiMessage }]);
            } catch (error) {
                console.error('Error sending message to AI:', error);
                setMessages((prevMessages) => [...prevMessages, { role: 'system', content: 'Error: Could not retrieve AI response.' }]);
            }
        }
    };

    return (
        <div>
            <Header />
            <h2>Chat</h2>
            <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
                {messages.map((message, index) => (
                    <div key={index} style={{ margin: '5px 0' }}>
                        <strong>{message.role === 'user' ? 'You' : 'AI'}:</strong> {message.content}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage}>
                <input type="text" name="message" placeholder="Type your message..." required />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default TesterPage;
