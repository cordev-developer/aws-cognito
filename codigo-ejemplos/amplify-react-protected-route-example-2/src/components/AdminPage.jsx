import { useAuthenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession } from 'aws-amplify/auth';
import { useEffect, useState } from "react";



export const AdminPage = () => {
  const [accessTokenIni, setAccesTokenIni] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  let groups = [];

  // Usamos el hook useAuthenticator para saber si el usuario está autenticado
  const { route } = useAuthenticator((context) => [context.route]);


  async function checkAuthUser() {
    try {
      // Llamamos a la API fetchAuthSession para obtener el token de acceso y el token de identificación
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
  
  return(
    <>
      <ul>
        { isAdmin ? (
          <h2>
            Eres un usuario del grupo 'admin'
          </h2>
        ) : (
          <h2>
            No estás autorizado !!
          </h2>
        )}
      </ul>  
    </>
  )
}

