import React, { useState } from 'react';

const TextToSpeech = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleConvert = async () => {
        setLoading(true);
        setError('');

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
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'myvoice.mp3';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
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
        </div>
    );
};

export default TextToSpeech;
