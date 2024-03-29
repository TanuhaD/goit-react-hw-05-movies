import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchDetailsById } from '../../API/movies';

const PageMovies = () => {
  const [moviesInfo, setMoviesInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  useEffect(() => {
    setLoading(true);
    fetchDetailsById(movieId)
      .then(({ data }) => {
        setMoviesInfo(data);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [movieId]);
  console.log(this);
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message} </p>}
      {!moviesInfo && <p>Nothing...</p>}
      {moviesInfo && (
        <>
          <Link to={location.state?.from ?? '/'} className="goBackLink">
            Go back
          </Link>
          <div className="containerMov">
            {moviesInfo.poster_path && (
              <img
                className="imageMovInfo"
                src={`https://image.tmdb.org/t/p/w500${moviesInfo.poster_path}`}
                alt={moviesInfo.title}
              />
            )}
            <div>
              <h2 className="titleMov">{moviesInfo.title}</h2>
              <h3>Average vote:</h3>
              <p className="textMov">{moviesInfo.vote_average}</p>
              <h3>Overview:</h3>
              <p className="textMov">{moviesInfo.overview}</p>
              <h3>Genres:</h3>
              <p className="textMov">
                {moviesInfo.genres
                  .map(genre => {
                    return genre.name;
                  })
                  .join(', ')}
              </p>
            </div>
          </div>
        </>
      )}
      <div className="containerMovLink">
        <h3>Additional information:</h3>
        <Link
          to={'cast'}
          state={{ from: location?.state?.from ?? '/' }}
          className="goBackLink"
        >
          Cast
        </Link>
        <Link
          to={'reviews'}
          state={{ from: location?.state?.from ?? '/' }}
          className="goBackLink"
        >
          Reviews
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default PageMovies;
