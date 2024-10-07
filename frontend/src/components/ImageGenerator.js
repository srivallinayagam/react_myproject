import React, { useState } from 'react';
import './ImageGenerator.css'; // Make sure to import your CSS file

const ImageGenerator = () => {
    const [imagePrompt, setImagePrompt] = useState('');
    const [generatedImage, setGeneratedImage] = useState('');

    const handleInputChange = (event) => {
        setImagePrompt(event.target.value);
    };

    const handleGenerateImage = async () => {
        if (!imagePrompt) {
            alert("Please enter a prompt for the image.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: imagePrompt }),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to generate image");
            }

            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            setGeneratedImage(imageUrl); // Set the generated image URL for display
        } catch (error) {
            alert("Error generating image: " + error.message);
        }
    };

    const handleDownload = () => {
        if (generatedImage) {
            const a = document.createElement('a');
            a.href = generatedImage;
            a.download = 'generated_image.png'; // Set the default file name
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    return (
        <div className="image-generator-container">
            <h1>Image Generator</h1>
            <input
                type="text" 
                className="input" // Apply the input class here
                placeholder='Enter your prompt for the image' 
                value={imagePrompt}
                onChange={handleInputChange}
            />
            <button onClick={handleGenerateImage}>Generate Image</button>

            {generatedImage && (
                <div className="generated-image">
                    <h2>Generated Image:</h2>
                    <img src={generatedImage} alt={imagePrompt} />
                    <div style={{ marginTop: '20px' }}>
                        <button 
                            className="download-button" // Added class here
                            onClick={handleDownload}
                        >
                            Download Image
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageGenerator;
