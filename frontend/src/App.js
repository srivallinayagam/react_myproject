import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TextToSpeech from './components/TextToSpeech';
import ImageGenerator from './components/ImageGenerator';
import Home from './components/Home';
import About from './components/About';
import './App.css'; // Import your CSS file

function App() {
    return (
        <Router>
            <div className="app-container">
                <header className="app-header">
                    <div className="app-title-container">
                        <h1 className="app-title">Gen AI: Your Voice and Vision Creator</h1>
                    </div><br></br>
                    <div className="navbar-container">
                        <nav>
                            <ul className="navbar">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/text-to-speech">Text to Speech</Link></li>
                                <li><Link to="/image-generator">Image Generator</Link></li>
                                <li><Link to="/about">About</Link></li>
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
                    </Routes>
                </main>

                <footer className="app-footer">
                    <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
