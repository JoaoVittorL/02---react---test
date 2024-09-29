import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isAuthenticated }: { element: JSX.Element, isAuthenticated: boolean }) => {
  return isAuthenticated ? element : <Navigate to="/sign-in" />;
};
export default PrivateRoute;