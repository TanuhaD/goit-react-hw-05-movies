import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCastById } from '../../API/movies';

function Cast() {
  const [cast, setCast] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  useEffect(() => {
    setLoading(true);
    fetchCastById(movieId)
      .then(({ data: { cast } }) => setCast(cast))
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [movieId]);

  return (
    <div>
      Cast
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {cast?.length === 0 && <p>No information</p>}
      {cast?.length > 0 && (
        <ul>
          {cast.map(actor => {
            return (
              <li className="castItem" key={actor.name}>
                <img
                  className="actorImg"
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.title}
                />
                {actor.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Cast;
