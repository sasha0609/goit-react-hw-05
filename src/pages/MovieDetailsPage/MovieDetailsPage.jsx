import { NavLink, Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMovieDetails } from "../../tmdbApi";
import toast, { Toaster } from "react-hot-toast";

export default function MoviesDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setError(false);
        setLoading(true);
        const movieData = await fetchMovieDetails(movieId);
        setMovie(movieData);
        setLoading(false);
      } catch (error) {
        toast.error("Oops! Please try again!", {
          position: "top-left",
        });
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);
  if (!movie) {
    return null;
  }

  return (
    <div>
      <Toaster />
      {error && <p>Oops! Try again</p>}
      {loading && <p>Loading...</p>}
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>

      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
