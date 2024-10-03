import React from 'react';
import './ContactPage.css';

function ContactPage() {
    return (
        <div className="contact-container">
            <h1 className="contact-title">Contact Us</h1>
            <p>If you have any questions, feel free to reach out to us!</p>
            <form className="contact-form">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea placeholder="Your Message" required></textarea>
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
}

export default ContactPage;
