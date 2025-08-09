import React, { useState } from 'react';

function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(rating, comment);
    setComment(""); // Reset comment after submission
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <div className="rating">
        <label htmlFor="rating">Rating (1-5): </label>
        <input 
          type="number" 
          id="rating" 
          min="1" 
          max="5" 
          value={rating} 
          onChange={(e) => setRating(e.target.value)} 
          className="rating-input"
          required
        />
      </div>

      <div className="comment">
        <label htmlFor="comment">Comment: </label>
        <textarea 
          id="comment" 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          placeholder="Write your review here..."
          className="comment-input"
          rows="5"
          required
        />
      </div>

      <button type="submit" className="submit-btn">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
