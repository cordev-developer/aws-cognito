import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";


export function Login() {
  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";

  // console.log("Esta es la ruta from = ", from);



  useEffect(() => {
    if (route === "authenticated") {
      navigate(from, { replace: true });
    }
  }, [route]);


  return (
    <div className="container">
      <Authenticator signUpAttributes={['email']}></Authenticator>
    </div>
  );
}
