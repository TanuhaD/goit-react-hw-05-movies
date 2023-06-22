import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchTrends } from '../../API/movies';
const Home = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  useEffect(() => {
    setLoading(true);
    fetchTrends()
      .then(({ data: { results } }) => {
        setMovies(results);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {movies?.length === 0 && (
        <p className="homeTextInf">Didn't find anything...</p>
      )}
      {movies?.length > 0 && (
        <ul className="homeList">
          {movies.map(movie => (
            <li className="homeItem" key={movie.id}>
              <Link
                className="homeLink"
                to={`/movies/${movie.id}`}
                state={{ from: location }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
