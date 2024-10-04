import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TextToSpeech from './components/TextToSpeech'; // Ensure this path is correct
import ImageGenerator from './components/ImageGenerator'; // Ensure this path is correct
import Home from './components/Home'; // Ensure this path is correct
import About from './components/About'; // Ensure this path is correct
import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
import './App.css'; // Import your CSS file

function App() {
    return (
        <Router>
            <div className="app-container">
                <header className="app-header">
                    <div className="app-title-container">
                        <h1 className="app-title">Gen AI: Your Voice and Vision Creator</h1>
                    </div>
                    <br />
                    <div className="navbar-container">
                        <nav>
                            <ul className="navbar">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/text-to-speech">Text to Speech</Link></li>
                                <li><Link to="/image-generator">Image Generator</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/signin">Sign In</Link></li>
                                <li><Link to="/signup">Sign Up</Link></li>
                            </ul>
                        </nav>
                    </div>
                </header>

                <main className="app-main">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/text-to-speech" element={<TextToSpeech />} />
                        <Route path="/image-generator" element={<ImageGenerator />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                    </Routes>
                </main>
                
                <div className="arrow">
                    {/* This space is intentionally left blank for the scrollbar */}
                </div>

                <footer className="app-footer">
                    <p>&copy; {new Date().getFullYear()} AI & Co. Ltd. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
