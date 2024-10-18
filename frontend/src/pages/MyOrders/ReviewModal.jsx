import React, { useState } from 'react';
import './ReviewModal.css'; // Create a CSS file for styling
import { Button } from 'react-bootstrap';

const ReviewModal = ({ onClose, onSubmit, foodIds }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(foodIds, rating, comment); // Pass foodIds array to onSubmit
        onClose(); // Close the modal after submission
    };

    return (
        <div className="review-modal text-center">
            <div className="review-modal-content">
                <h3>Review</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        
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
                        
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </div>
                    <Button variant="warning"  className='review-header-button' type="submit">Submit</Button>
                </form>
                {/* <button onClick={onClose}>Close</button> */}
            </div>
        </div>
    );
};

export default ReviewModal;
