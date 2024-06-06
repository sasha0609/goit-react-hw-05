import MovieList from "../../components/MovieList/MovieList";
import { getTrendingMovie } from "../../tmdbApi";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setError(false);
        setLoading(true);
        const trandMovies = await getTrendingMovie();
        setMovies(trandMovies);
        setLoading(false);
      } catch (error) {
        setError(true);
      } finally {
        setError(false);
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);
  return (
    <>
      <h2>Trending Today</h2>
      {error && <p>Oops! Try again</p>}
      {loading && <p>Loading...</p>}
      <MovieList gettedMovies={movies} />
    </>
  );
}
