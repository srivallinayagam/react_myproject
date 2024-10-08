import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
    const [userMessage, setUserMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleInputChange = (event) => {
        setUserMessage(event.target.value);
    };

    const handleSendMessage = async () => {
        if (!userMessage) {
            alert("Please enter a message.");
            return;
        }

        setChatHistory([...chatHistory, { text: userMessage, sender: 'user' }]);

        try {
            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to get response from chatbot");
            }

            const data = await response.json();
            setChatHistory(prev => [...prev, { text: data.reply, sender: 'bot' }]);
            setUserMessage('');

        } catch (error) {
            alert("Error sending message: " + error.message);
        }
    };

    return (
        <div className="chatbot-container">
            <h1>Chatbot</h1>
            <div className="chat-history">
                {chatHistory.map((entry, index) => (
                    <div key={index} className={`chat-entry ${entry.sender}`}>
                        {entry.sender === 'user' ? 'You: ' : 'Bot: '}
                        {entry.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                className="input"
                placeholder='Type your message here...'
                value={userMessage}
                onChange={handleInputChange}
            />
            <button className="chatbot-button" onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default Chatbot;
