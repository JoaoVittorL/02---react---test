import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element, isAuthenticated }: { element: JSX.Element, isAuthenticated: boolean }) => {
  return isAuthenticated ? <Navigate to="/" /> : element;
};

export default PublicRoute;