import React, { useState } from 'react';
import './TextToSpeech.css';

const TextToSpeech = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [audioUrl, setAudioUrl] = useState('');

    const handleConvert = async () => {
        setLoading(true);
        setError('');
        setAudioUrl(''); // Reset audio URL

        try {
            const response = await fetch('http://localhost:5000/convert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                setAudioUrl(url); // Set the audio URL for playback and download
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Something went wrong!');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-to-speech-container">
            <h1>Text to Speech Converter</h1>
            <textarea
                className="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows="4"
                placeholder="Enter text here"
            />
            <br />
            <button onClick={handleConvert} disabled={loading}>
                {loading ? 'Converting...' : 'Convert to Voice'}
            </button>
            {error && <p className="error-message">{error}</p>}
            
            {audioUrl && (
                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                    <audio controls style={{ flex: 1 }}>
                        <source src={audioUrl} type="audio/mp3" />
                        Your browser does not support the audio element.
                    </audio>
                    <button 
                        onClick={() => {
                            const a = document.createElement('a');
                            a.href = audioUrl;
                            a.download = 'myvoice.mp3';
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                        }} 
                        style={{
                            marginLeft: '10px',
                            padding: '10px 15px',
                            backgroundColor: '#007BFF', // Blue background for the download button
                            color: 'white', // White text
                            border: 'none', // Remove border
                            borderRadius: '4px', // Rounded corners
                            cursor: 'pointer', // Pointer cursor on hover
                            fontSize: '16px', // Font size
                            transition: 'background-color 0.3s, transform 0.2s' // Transition effects
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'} // Darker blue on hover
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007BFF'} // Revert to original
                    >
                        Download Audio
                    </button>
                </div>
            )}
        </div>
    );
};

export default TextToSpeech;
