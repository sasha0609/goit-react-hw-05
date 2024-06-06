import MovieList from "../../components/MovieList/MovieList";
import { searchMovies } from "../../tmdbApi";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getApiMovie = async (query) => {
    try {
      setError(false);
      setLoading(true);
      const searchResults = await searchMovies(query);
      setMovies(searchResults);
      setLoading(false);
    } catch (error) {
      console.log("Oops! Please try again!");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const queryFilter = searchParams.get("query") ?? "";

  const changeQueryFilter = (newFilter) => {
    searchParams.set("query", newFilter);
    setSearchParams(searchParams);
  };
  const handleSearch = () => {
    getApiMovie(queryFilter);
  };
  return (
    <div>
      <input
        type="text"
        value={queryFilter}
        autoComplete="off"
        placeholder="Search movie"
        autoFocus
        onChange={(e) => changeQueryFilter(e.target.value)}
      />
      <button onClick={handleSearch} type="submit">
        Search
      </button>
      {error && <p>Oops! Try again</p>}
      {loading && <p>Loading...</p>}
      {movies.length > 0 && <MovieList gettedMovies={movies} />}
    </div>
  );
}
