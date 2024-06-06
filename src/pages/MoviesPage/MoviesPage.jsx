import MovieList from "../../components/MovieList/MovieList";
import { searchMovies } from "../../tmdbApi";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
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
      toast.error("Oops! Please try again!", {
        position: "top-left",
      });
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formValue = form.elements.formValue.value.trim();
    if (formValue.trim() === "") {
      toast.error("Please fill the field!");
      return;
    }
    setQuery(formValue);
    getApiMovie(formValue);
    form.reset();
  };
  return (
    <div>
      <Toaster />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="formValue"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>Oops! Try again</p>}
      {loading && <p>Loading...</p>}
      {movies.length > 0 && <MovieList gettedMovies={movies} />}
    </div>
  );
}
