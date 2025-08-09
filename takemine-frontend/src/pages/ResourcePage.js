import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getResourceById, leaveReview } from '../utils/api'; // Assuming you have this API utility
import ReviewForm from '../components/ReviewForm'; // Assuming you have this review form component
import './ResourcePage.css';

function ResourcePage() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Fetch resource details and reviews on page load
  useEffect(() => {
    const fetchResource = async () => {
      try {
        const data = await getResourceById(id);
        setResource(data);
        setReviews(data.reviews || []);
      } catch (error) {
        console.error('Error fetching resource:', error);
      }
    };
    fetchResource();
  }, [id]);

  const handleReview = async (rating, comment) => {
    try {
      const newReview = await leaveReview(id, rating, comment);
      setReviews((prevReviews) => [...prevReviews, newReview]);
    } catch (error) {
      console.error('Error leaving review:', error);
    }
  };

  if (!resource) return <div>Loading...</div>;

  return (
    <div className="resource-page-container">
      {/* Resource Details */}
      <div className="resource-header">
        <h1 className="resource-title">{resource.name}</h1>
        <p className="resource-description">{resource.description}</p>
        <p className="resource-location">Location: {resource.location}</p>
        <p className="resource-cost">Cost: {resource.cost}</p>
        <p className="resource-availability">
          Availability: {resource.availability ? 'Available' : 'Unavailable'}
        </p>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2 className="section-title">Reviews</h2>
        <div className="review-cards">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="review-avatar">
                  {review.user.charAt(0).toUpperCase()}
                </div>
                <h3 className="review-user">{review.user}</h3>
                <span className="review-rating">{review.rating} stars</span>
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* Leave a Review */}
        <div className="leave-review-form">
          <h3>Leave a Review</h3>
          <ReviewForm onSubmit={handleReview} />
        </div>
      </div>
    </div>
  );
}

export default ResourcePage;
