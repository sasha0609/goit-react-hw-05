import { Link, useLocation } from "react-router-dom";

export default function MovieList({ gettedMovies }) {
  const location = useLocation();
  return (
    <ul>
      {gettedMovies.map((gettedMovie) => (
        <li key={gettedMovie.id}>
          <Link to={`/movies/${gettedMovie.id}`} state={location}>
            {gettedMovie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
