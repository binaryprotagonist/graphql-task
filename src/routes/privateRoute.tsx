import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

const PrivateRoute = ({ children }: { children: any }) => {
  const isAuthenticate = useAuth();
  return isAuthenticate ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
