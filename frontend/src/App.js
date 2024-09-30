import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TextToSpeech from './components/TextToSpeech';
import ImageGenerator from './components/ImageGenerator';
import './App.css'; // Import your CSS file

function App() {
    return (
        <Router>
            <div className="app-container">
                <nav>
                    <ul className="navbar">
                        <li>
                            <Link to="/">Text to Speech</Link>
                        </li>
                        <li>
                            <Link to="/image-generator">Image Generator</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<TextToSpeech />} />
                    <Route path="/image-generator" element={<ImageGenerator />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
