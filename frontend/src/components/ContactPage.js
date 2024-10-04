import React, { useState } from 'react';
import './ContactPage.css';

function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Basic validation
        if (!name || !email || !message) {
            setFeedback('Please fill in all fields.');
            return;
        }

        // Simulate a successful submission
        setFeedback('Message sent successfully!');
        
        // Clear the form fields
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="contact-container">
            <h1 className="contact-title">Contact Us</h1>
            <p>If you have any questions, feel free to reach out to us!</p>
            <form className="contact-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Your Name" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input 
                    type="email" 
                    placeholder="Your Email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <textarea 
                    placeholder="Your Message" 
                    required 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <button type="submit">Send Message</button>
            </form>
            {feedback && <p className="feedback-message">{feedback}</p>} {/* Display feedback message */}
        </div>
    );
}

export default ContactPage;
