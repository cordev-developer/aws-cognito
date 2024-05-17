// Este componente no se usa pero lo dejamos por si se quiere implementar el botón de 
// signout mediante un componente aparte. Podemos hacer también un global signout global 
// de todas las aplicaciones, y por tanto revocar todos los tokens.

import { signOut } from '@aws-amplify/auth';
import { useNavigate } from "react-router-dom";

export const SignOutButton = () => {
  const navigate = useNavigate();

  const onButtonClick = async () => {
    try {
      const response = await signOut();
      // const response = await signOut({ global: true });
      console.log('Response: ', response);
    } catch (error) {
      console.log('Error en método signout', error);
    }

    alert("Signed out");
    navigate("/public");
  }

  return ( 
    <div>
      <button onClick={() => onButtonClick()}>Sign Out</button>
    </div>
  )
};
