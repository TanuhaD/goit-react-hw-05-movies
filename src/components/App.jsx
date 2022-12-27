import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from './';
import Cast from './Cast/Cast';
import Reviews from './Reviews/Reviews';

const Home = lazy(() => import('../pages/Home/Home'));
const Movies = lazy(() => import('../pages/Movies/Movies'));
const PageMovies = lazy(() => import('./PageMovies/PageMovies'));
export const App = () => {
  return (
    <Routes>
      <Route path="" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:movieId" element={<PageMovies />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Route>
    </Routes>
  );
};
