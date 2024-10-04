import React, { useState } from 'react';
import googleIcon from '../assets/google.png';
import githubIcon from '../assets/github.png';
import facebookIcon from '../assets/facebook.png';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords don't match!");
            setSuccessMessage('');
            return;
        }

        const passwordCriteria = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordCriteria.test(password)) {
            setErrorMessage('Password must be at least 8 characters long and include letters, numbers, and symbols.');
            setSuccessMessage('');
            return;
        }

        setSuccessMessage('Registration successful!');
        setErrorMessage('');
    };

    return (
        <div className="form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
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
                <div className="input-group">
                    <input
                        type="password"
                        className="form-input"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="form-button">Sign Up</button>
                {errorMessage && <div className="form-error-message">{errorMessage}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
            </form>
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

export default SignUp;
