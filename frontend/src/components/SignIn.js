import React, { useState } from 'react';
import googleIcon from '../assets/google.png';
import githubIcon from '../assets/github.png';
import facebookIcon from '../assets/facebook.png';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSignIn = (e) => {
        e.preventDefault();

        if (email === 'user@example.com' && password === 'Password123!') {
            setSuccessMessage('Sign in successful!');
            setErrorMessage('');
        } else {
            setErrorMessage('Invalid email or password');
            setSuccessMessage('');
        }
    };

    return (
        <div className="form-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
                <div className="input-group">
                    <input
                        type="email"
                        className="form-input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        className="form-input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="form-button">Sign In</button>
                {errorMessage && <div className="form-error-message">{errorMessage}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
            </form>
            <div>
                <a href="/forgot-password" className="switch-link">Forgot Password?</a>
            </div>
            <div className="social-buttons">
                <button className="social-button">
                    <img src={googleIcon} alt="Google" className="social-icon" />
                </button>
                <button className="social-button">
                    <img src={githubIcon} alt="GitHub" className="social-icon" />
                </button>
                <button className="social-button">
                    <img src={facebookIcon} alt="Facebook" className="social-icon" />
                </button>
            </div>
        </div>
    );
};

export default SignIn;
