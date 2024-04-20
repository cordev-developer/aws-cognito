import { useLocation, Navigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import React from "react";


export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { route } = useAuthenticator((context) => [context.route]);


  if (route !== "authenticated") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
