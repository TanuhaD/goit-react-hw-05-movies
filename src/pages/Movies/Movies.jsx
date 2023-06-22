import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { fetchQuery } from '../../API/movies';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const query = searchParams.get('query') ?? '';
  const mount = useRef();

  const fetchByQuery = q => {
    setLoading(true);
    fetchQuery(q)
      .then(({ data: { results } }) => {
        setMovies(results);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!mount.current && query) {
      fetchByQuery(query);
    }
    mount.current = true;
  }, [query]);

  const handleInputChange = ({ target }) => {
    setSearchParams(target.value ? { query: target.value } : {});
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const query = searchParams.get('query') ?? '';
    if (!query) return;
    fetchByQuery(query);
  };
  return (
    <div className="containerForm">
      <form onSubmit={handleSubmit}>
        <label>
          <div className="titleForm">Search movies</div>
          <input
            className="inputForm"
            type="text"
            value={searchParams.get('query') ?? ''}
            onChange={handleInputChange}
          />
        </label>
        <button className="buttonForm" type="submit">
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {movies?.length === 0 && <p>Didn't find anything...</p>}
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

export default Movies;
