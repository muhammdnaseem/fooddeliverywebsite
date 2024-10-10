import React, { useState } from 'react';
import './ReviewModal.css'; // Create a CSS file for styling

const ReviewModal = ({ onClose, onSubmit, foodIds }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(foodIds, rating, comment); // Pass foodIds array to onSubmit
        onClose(); // Close the modal after submission
    };

    return (
        <div className="review-modal">
            <div className="review-modal-content">
                <h3>Add Your Review for All Items</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Rating:</label>
                        <div>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => setRating(star)}
                                    style={{ cursor: 'pointer', color: rating >= star ? 'gold' : 'gray' }}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label>Comment:</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Submit Review</button>
                </form>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ReviewModal;
