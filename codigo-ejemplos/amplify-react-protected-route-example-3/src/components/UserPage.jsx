import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useAuthenticator } from "@aws-amplify/ui-react";


export const UserPage = () => {

  const { route } = useAuthenticator((context) => [context.route]);
  const { userInfo, setUserInfo, isUser, isAdmin } = useContext(AuthContext);

  // console.log("Esto vale isUser = ", isUser);


  const username = userInfo;
 
  useEffect(() => {
    if (route === 'authenticated') {
      // Esta linea de abajo no es necesaria, sólo es para hacer algo en el useEffect,
      // por tanto se puede eliminar y la dependencia también. 
      setUserInfo(username);
    }
  }, [route, setUserInfo]);

  return(
    <div>
          { isAdmin && (
            <div>
              <h3>Eres un usuario del grupo 'admin'</h3> 
            </div>
          )}

          { isUser && (
            <div>
             <h3>Eres un usuario del grupo 'user'</h3> 
            </div>
          )}  
          <h2>Hola {userInfo} bienvenido a la página UserPage !! </h2>   
    </div>
  )
}

