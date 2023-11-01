// PrivateRoute.js
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ children, authenticated }) {
  return authenticated ? children : <Navigate to="/" />;
}

export default PrivateRoute;
