import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCastApi } from "../../tmdbApi";

export default function MovieCast() {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getCast = async () => {
      try {
        setError(false);
        setLoading(true);
        const castData = await getCastApi(movieId);
        setCast(castData);
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
    getCast();
  }, [movieId]);
  return (
    <div>
      <Toaster />
      <h2>Cast</h2>
      {error && <p>Oops! Try again</p>}
      {loading && <p>Loading...</p>}
      <ul>
        {cast.map((member) => (
          <li key={member.id}>
            <p>
              {member.name} as {member.character}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
