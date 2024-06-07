// import MovieList from "../../components/MovieList/MovieList";
// import { searchMovies } from "../../tmdbApi";
// import { useState } from "react";
// import { useSearchParams } from "react-router-dom";

// export default function MoviesPage() {
//   const [movies, setMovies] = useState([]);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [searchParams, setSearchParams] = useSearchParams();
//   // const queryRef = useRef();

//   const getApiMovie = async (query) => {
//     try {
//       setError(false);
//       setLoading(true);
//       const searchResults = await searchMovies(query);
//       setMovies(searchResults);
//       setLoading(false);
//     } catch (error) {
//       console.log("Oops! Please try again!");
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const queryFilter = searchParams.get("query") ?? "";

//   const changeQueryFilter = (newFilter) => {
//     searchParams.set("query", newFilter);
//     setSearchParams(searchParams);
//   };
//   const handleSearch = () => {
//     getApiMovie(queryFilter);
//   };
//   // const handleSearchSubmit = async (event) => {
//   //   event.preventDefault();
//   //   const query = queryRef.current.value;
//   //   if (query.trim() === "") return;

//   //   setSearchParams({ query });

//   //   try {
//   //     setError(false);
//   //     setLoading(true);
//   //     const moviesData = await searchMovies(query);
//   //     setMovies(moviesData);
//   //     setLoading(false);
//   //   } catch (error) {
//   //     console.log("Oops! Please try again!");
//   //     setError(true);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   return (
//     <div>
//       <input
//         type="text"
//         value={queryFilter}
//         autoComplete="off"
//         placeholder="Search movie"
//         autoFocus
//         onChange={(e) => changeQueryFilter(e.target.value)}
//       />
//       <button onClick={handleSearch} type="submit">
//         Search
//       </button>
//       {/* <form onSubmit={handleSearchSubmit}>
//         <input
//           type="text"
//           ref={queryRef}
//           placeholder="Search for movies..."
//           autoComplete="off"
//           autoFocus
//         />
//         <button type="submit">Search</button>
//       </form> */}

//       {error && <p>Oops! Try again</p>}
//       {loading && <p>Loading...</p>}
//       {movies.length > 0 && <MovieList gettedMovies={movies} />}
//     </div>
//   );
// }
import MovieList from "../../components/MovieList/MovieList";
import { searchMovies } from "../../tmdbApi";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const getApiMovie = async (query) => {
    try {
      setError(false);
      setLoading(true);
      const searchResults = await searchMovies(query);
      setMovies(searchResults);
    } catch (error) {
      console.log("Oops! Please try again!");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const queryFilter = searchParams.get("query") ?? "";

  useEffect(() => {
    if (queryFilter) {
      getApiMovie(queryFilter);
    }
  }, [queryFilter]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = event.target.elements.query.value;
    if (query) {
      setSearchParams({ query });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          defaultValue={queryFilter}
          autoComplete="off"
          placeholder="Search movie"
          autoFocus
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>Oops! Try again</p>}
      {loading && <p>Loading...</p>}
      {movies.length > 0 && <MovieList gettedMovies={movies} />}
    </div>
  );
}
