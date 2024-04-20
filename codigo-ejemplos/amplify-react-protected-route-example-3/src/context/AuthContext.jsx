import { useAuthenticator } from "@aws-amplify/ui-react";
import React, { useEffect, useState, createContext } from "react";
import { fetchAuthSession } from 'aws-amplify/auth';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken2, setAccessToken2] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState('');
  const { route } = useAuthenticator((context) => [context.route]);



  useEffect(() => {
    const checkAuthUser = async () => {
      try {
          setIsLoading(true);

          // const response = (await fetchAuthSession()) ?? {};
          // console.log("Esta es la info de la sesión = ", response);

          const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
          
          const { payload } = accessToken;
          const username = payload["username"];
          // console.log("user name del payload = ", username);


          setUserInfo(username);
          setAccessToken2(accessToken);
          setIsAuth(true);


          if (payload["cognito:groups"]) {
            const groups = payload["cognito:groups"];

            if (groups.includes('admin')) {
              setIsAdmin(true);
            } 

            if (groups.includes('user')) {
              setIsUser(true);
            } 

            console.log("PayLoad['cognito:groups']: ", payload["cognito:groups"]);
          } else {
            console.log("El usuario no pertenece a ningún grupo !!");
          }
      } catch (err) {
        // console.log('Error checkAuthUser: ', err);

      } finally {
        setIsLoading(false);
      }
    };

    if (route !== 'authenticated') {
      checkAuthUser();
    }

  }, [fetchAuthSession, route, setUserInfo, setUserInfo, setAccessToken2, setIsAuth, setIsAdmin, setIsUser, setIsLoading ]);



  if (isLoading) {
    return <div>Verificando estado de autenticación...</div>
  }

  return (
    <AuthContext.Provider 
    value={{
          isAuth,
          setIsAuth, 
          accessToken2,
          setAccessToken2, 
          isUser, 
          isAdmin, 
          isLoading,
          setIsUser,
          setIsAdmin,
          userInfo,
          setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};


