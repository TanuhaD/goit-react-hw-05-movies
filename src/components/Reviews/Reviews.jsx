import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviewById } from '../../API/movies';

function Reviews() {
  const [reviews, setReviews] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  useEffect(() => {
    setLoading(true);
    fetchReviewById(movieId)
      .then(({ data: { results } }) => setReviews(results))
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [movieId]);

  return (
    <div>
      reviews
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {reviews?.length === 0 && <p>No information</p>}
      {reviews?.length > 0 && (
        <ul>
          {reviews.map(review => {
            return (
              <li key={review.id}>
                <p>{review.author}</p>
                <p>{review.content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Reviews;
