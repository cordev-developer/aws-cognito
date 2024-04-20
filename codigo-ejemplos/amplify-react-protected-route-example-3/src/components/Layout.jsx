import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthenticator, Button } from "@aws-amplify/ui-react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router";


export function Layout() {
  const { signOut, route } = useAuthenticator((context) => [
    context.signOut,
    context.route
  ]);
  const { setIsAuth, setIsUser, setIsAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogued, setIsLogued] = useState(false);


  // Gestionamos el setLogued
  useEffect(() => {
    if (route === 'authenticated') {
      setIsLogued(true);
    }
  }, [route, setIsLogued]);

  // Gestionamos opción logout
  const logOut = () => {
    signOut();
    setIsLogued(false);
    setIsUser(false);
    setIsAdmin(false);
    setIsAuth(false);
    navigate("/login");
  }

  // Gestionamos opción login
  const logIn = () => {
    navigate("/login");
  }



  return (
    <>
      <nav>
        <Button onClick={() => navigate("/home")}>Home</Button>
        <Button onClick={() => navigate("/admin")}>
          Ruta protegida grupo administrador
        </Button>
        <Button onClick={() => navigate("/user")}>
          Ruta protegida grupo user
        </Button>
        { isLogued ? (
          <Button onClick={() => logOut()}>Logout</Button>
          ) : (
          <Button onClick={() => logIn()}>Login</Button>         
          )}
      </nav>
      <h1>Cognito con AWS Amplify y React</h1>
      <div  className="logued">
        { isLogued ? "Estás logueado !" : "Por favor logueate !"}
      </div>

      <Outlet />
    </>
  );
}
