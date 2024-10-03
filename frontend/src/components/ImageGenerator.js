import React, { useState } from 'react';
import './ImageGenerator.css'; // Make sure to import your CSS file

const ImageGenerator = () => {
    const [imageName, setImageName] = useState('');
    const [generatedImage, setGeneratedImage] = useState('');

    const handleInputChange = (event) => {
        setImageName(event.target.value);
    };

    const handleGenerateImage = async () => {
        if (!imageName) {
            alert("Please enter a name for the image.");
            return;
        }

        try {
            // Replace this URL with your actual image generation API endpoint
            const response = await fetch(`https://api.example.com/generate-image?name=${encodeURIComponent(imageName)}`);
            
            if (!response.ok) {
                throw new Error("Failed to generate image");
            }

            const data = await response.json();
            setGeneratedImage(data.imageUrl); // Assuming the API returns an image URL in this format
        } catch (error) {
            alert("Error generating image: " + error.message);
        }
    };

    return (
        <div className="image-generator-container">
            <h1>Image Generator</h1>
            <input
                type="text" 
                className="input" // Apply the input class here
                placeholder='Enter the name of the image' 
                value={imageName}
                onChange={handleInputChange}
            />
            <button onClick={handleGenerateImage}>Generate Image</button>

            {generatedImage && (
                <div className="generated-image">
                    <h2>Generated Image:</h2>
                    <img src={generatedImage} alt={imageName} />
                </div>
            )}
        </div>
    );
};

export default ImageGenerator;
