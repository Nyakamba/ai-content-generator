import React from "react";
import { useAuth } from "../../AuthContext/AuthContext";

const AuthRoute = () => {
  const { isAuthenticated, isError, isLoading } = useAuth;
  return <div></div>;
};

export default AuthRoute;
