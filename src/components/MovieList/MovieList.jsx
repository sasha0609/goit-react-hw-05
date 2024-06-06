import { Link } from "react-router-dom";

export default function MovieList({ gettedMovies }) {
  return (
    <ul>
      {gettedMovies.map((gettedMovie) => (
        <li key={gettedMovie.id}>
          <Link to={`/movies/${gettedMovie.id}`}>{gettedMovie.title}</Link>
        </li>
      ))}
    </ul>
  );
}
