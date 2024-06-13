import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';

export const ProtectedRoute = () => {
  const isAuthChecked = true;
  const user = true;
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (user) {
    const { from } = location.state || { from: { pathname: '/ ' } };
    //return <Navigate to={from} />;
  }

  if (!user) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};
