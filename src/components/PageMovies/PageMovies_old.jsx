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
      .finally(() => {
        setLoading(false);
      });
  }, [movieId]);
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {!moviesInfo && <p>Nothing...</p>}
      {moviesInfo && (
        <>
          <Link className="goBackLink" to={location?.state?.from ?? '/'}>
            ← Go back
          </Link>
          <div className="containerMovInfo">
            <img
              className="imageMovInfo"
              src={`https://image.tmdb.org/t/p/w500${moviesInfo.poster_path}`}
              alt={moviesInfo.title}
            />
            <div className="containerMov">
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
          className="goBackLink"
          to={'cast'}
          state={{ from: location?.state?.from ?? '/' }}
        >
          Cast
        </Link>
        <Link
          className="goBackLink"
          to={'reviews'}
          state={{ from: location?.state?.from ?? '/' }}
        >
          Reviews
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default PageMovies;
