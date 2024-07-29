import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';

const TesterPage = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (input.trim() === '') return;

        const newMessage = { text: input, sender: 'user' };
        setMessages([...messages, newMessage]);

        try {
            const response = await axios.post('http://localhost:3001/api/completions', {
                prompt: input,
            });

            const aiMessage = { text: response.data.choices[0].text.trim(), sender: 'ai' };
            setMessages([...messages, newMessage, aiMessage]);
        } catch (error) {
            console.error('Error getting response from AI:', error);
        }

        setInput('');
    };

    return (
        <div>
            <Header />
            <div style={{ margin: '20px', textAlign: 'center' }}>
                <h1>Chat with GPT-3</h1>
                <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                    {messages.length === 0 && <p>No messages yet!</p>}
                    {messages.map((message, index) => (
                        <div key={index} style={{ textAlign: message.sender === 'user' ? 'right' : 'left', margin: '10px 0' }}>
                            <span style={{ background: message.sender === 'user' ? '#d1e7dd' : '#f8d7da', padding: '10px', borderRadius: '5px' }}>
                                {message.text}
                            </span>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message"
                        style={{ padding: '10px', width: '80%' }}
                    />
                    <button type="submit" style={{ padding: '10px', width: '18%' }}>Send</button>
                </form>
            </div>
        </div>
    );
};

export default TesterPage;



//Rasheed
//Abuammar231!