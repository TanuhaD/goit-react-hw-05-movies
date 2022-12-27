import { Suspense } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const SharedLayout = () => {
  return (
    <div>
      <header className="header">
        <NavLink className="headerLink" to="/">
          Home
        </NavLink>
        <NavLink className="headerLink" to="/movies">
          Movies
        </NavLink>
      </header>
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
};
export default SharedLayout;
