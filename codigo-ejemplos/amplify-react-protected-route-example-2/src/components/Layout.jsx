import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthenticator, Button } from "@aws-amplify/ui-react";

export function Layout() {
  const { route, signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);
  const navigate = useNavigate();

  const logOut = () => {
    signOut();
    navigate("/login");
  }
  
  return (
    <>
      <nav>
        <Button onClick={() => navigate("/home")}>Home</Button>
        <Button onClick={() => navigate("/admin")}>
          Ruta protegida para administradores
        </Button>
        <Button onClick={() => navigate("/user")}>
          Ruta protegida para usuarios normales
        </Button>
        {route !== "authenticated" ? (
          <Button onClick={() => navigate("/login")}>Login</Button>
        ) : (
          <Button onClick={() => logOut()}>Logout</Button>
        )}
      </nav>
      
      <h1>Ejemplo de rutas protegidas</h1>
      <div className="logued">
        {route === "authenticated" ? "Estás logueado !!" : "Por favor tienes que loguearte !!"}
      </div>

      <Outlet />
    </>
  );
}
