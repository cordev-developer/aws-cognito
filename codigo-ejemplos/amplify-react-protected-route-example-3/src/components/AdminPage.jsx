import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useAuthenticator } from "@aws-amplify/ui-react";



export const AdminPage = () => {
  const { route } = useAuthenticator((context) => [context.route]);
  const { isAdmin, userInfo, setUserInfo } = useContext(AuthContext);


  // console.log("Esto vale isAdmin = ", isAdmin);

  const username = userInfo;

 
  useEffect(() => {
    if (route === 'authenticated') {
      // Esta linea de abajo no es necesaria, sólo es para hacer algo en el useEffect,
      // por tanto se puede eliminar y la dependencia también. 
      setUserInfo(username);
    }
  }, [route, setUserInfo]);

  return(
    <>
        { isAdmin ? (
          <div>
            <h3>Eres un usuario del grupo 'admin'</h3>
            <h2>Hola {userInfo} bienvenido a la página AdminPage !!</h2>
          </div>
        ) : (
          <h3>
            No perteneces al grupo 'admin', no estás autorizado !!
          </h3>
        )}     
    </>
  )
}

