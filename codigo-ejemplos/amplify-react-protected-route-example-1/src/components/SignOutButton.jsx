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
