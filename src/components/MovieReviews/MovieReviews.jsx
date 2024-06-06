import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReviewsApi } from "../../tmdbApi";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getReviews = async () => {
      try {
        setError(false);
        setLoading(true);
        const reviewsData = await getReviewsApi(movieId);
        setReviews(reviewsData);
        setLoading(false);
      } catch (error) {
        console.log("Oops! Please try again!");
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getReviews();
  }, [movieId]);
  return (
    <div>
      <h2>Reviews</h2>
      {error && <p>Oops! Try again</p>}
      {loading && <p>Loading...</p>}
      <ul>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li key={review.id}>
              <h3> {review.author}</h3>
              <p> {review.content}</p>
            </li>
          ))
        ) : (
          <p>Here's no reviews yet! :(</p>
        )}
      </ul>
    </div>
  );
}
