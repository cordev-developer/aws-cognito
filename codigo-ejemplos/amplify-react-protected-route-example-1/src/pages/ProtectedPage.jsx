import { Authenticator } from "@aws-amplify/ui-react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { fetchAuthSession } from 'aws-amplify/auth';
import { useEffect, useState } from "react";


export const ProtectedPage = () => {

  const [accessTokenIni, setAccesTokenIni] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  let groups = [];

  const { route } = useAuthenticator((context) => [context.route]);


  async function checkAuthUser() {
    try {
      const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
      
      setAccesTokenIni(accessToken);
      // console.log("Este es el token: ", accessToken);

      const { payload } = accessToken;
      groups = payload['cognito:groups'];


      if (groups && groups.includes('admin')) {
        console.log("Eres un usuario del grupo 'admin'");
        setIsAdmin(true);
      } else {
        console.log("Eres un usuario del grupo 'user'");
      }
    } catch (error) {
        console.log('Error checkUser() : ', error);
    }
  }


  useEffect(() => {
    if (route === 'authenticated')
      checkAuthUser();
  }, [route])
 


  return (
      <Authenticator signUpAttributes={['email']}>
        {({ user, signOut }) => (
            <main>
              <h3>Protected Page</h3>
              <div>
                <span>Hi, {user.username}</span>
              </div>
              <button onClick={() => checkAuthUser()} type="button">CurrentAuthenticatedUser</button>
              <button onClick={signOut}>Sign out</button>

              <div>
                <ul>
                  { isAdmin ? (
                    <li>
                      Eres un usuario del grupo 'admin'
                    </li>
                  ) : (
                    <li>
                      Eres un usuario del grupo 'user'
                    </li>
                  )}
                </ul>             
              </div>
              <hr />
            </main>
        )}
      </Authenticator>
  );
};


