import { useSelector } from '../services/store';
import { getIsAuthChecked, getUser } from '../services/user/slice';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUser);
  const location = useLocation();

  // Пользователь авторизован, но должен быть не авторизован
  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} replace />;
  }

  // Пользователь не авторизован, но должен быть авторизован
  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
