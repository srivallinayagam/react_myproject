import React from 'react';
import fullStar from '../assets/full-star.svg';
import emptyStar from '../assets/empty-star.svg';
import './ReviewPage.css';

function ReviewPage() {
    // Pre-populated reviews for demonstration
    const reviews = [
        { text: "Great experience! The voice generation is really impressive.", rating: 5 },
        { text: "I love the image generator. It's very creative!", rating: 4 },
        { text: "The app is good but could use more features.", rating: 3 },
        { text: "Amazing functionality! Highly recommend.", rating: 5 },
    ];

    return (
        <div className="review-container">
            <h1 className="review-title">User Reviews</h1>

            <div className="reviews-list">
                {reviews.map((review, index) => (
                    <div key={index} className="review-item">
                        <p className="review-text">"{review.text}"</p>
                        <div className="review-rating">
                            {[...Array(5)].map((_, i) => (
                                <img 
                                    key={i} 
                                    src={i < review.rating ? fullStar : emptyStar} 
                                    alt={i < review.rating ? "Full Star" : "Empty Star"} 
                                    className="star"
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewPage;
