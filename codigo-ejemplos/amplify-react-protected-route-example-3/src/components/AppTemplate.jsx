import React from 'react';
import { useLocation, Navigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";


export const AppTemplate = ({ children, ...rest }) => {
  const location = useLocation();
  const { route } = useAuthenticator((context) => [context.route]);

  if (route !== "authenticated") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <div>
          {children}
      </div>
    </>
  );
};




