import React from 'react';
import ReviewPage from './ReviewPage';
import './Home.css'; // Import the CSS file

const Home = () => {
    return (
        <div className="home-wrapper">
            <div className="home-container">
                <div className="welcome-container">
                    <h2>Welcome to Gen AI!</h2>
                    <p>
                        Step into the future of creativity and communication! At Gen AI, we empower you to transform text into lifelike speech and unleash your imagination through stunning image generation. Whether you’re a content creator, educator, or just someone who loves to explore new technologies, our platform is designed for you.
                    </p>
                    <p>
                        Dive in and discover how easy it is to give your words a voice and bring your ideas to life. Join a vibrant community of innovators, experiment with our tools, and watch your creativity flourish!
                    </p>
                    <p>
                        Let’s embark on this exciting journey together—your voice and vision await!
                    </p>
                </div>
            </div>
            <div className="reviews-container">
                <section>
                    <ReviewPage /> {/* Include the ReviewPage here */}
                </section>
            </div>
        </div>
    );
};

export default Home;
