import { Authenticator } from "@aws-amplify/ui-react";
import "./App.css";
import { AdminPage } from "./components/AdminPage";
import { RequireAuth } from "./RequireAuth";
import { Login } from "./components/Login";
import { UserPage } from "./components/UserPage";
import { Layout } from "./components/Layout";
import { FourOFour } from "./components/FourOFour";
import { Home } from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";

import { CookieStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';

// Configurar opciones adicionales de las cookies
const cookieOptions = {
  // Dominio de la cookie
  domain: 'localhost', 
  // 30 dias expiración cookies
  expires: 30,

  // Utilizar HTTPS (true/false) 
  secure: true,

  // Este parámetro puede ser lax/strict/none   
  sameSite: 'lax',
};

// Configuración por defecto de cookies (secure=true y no sameSate)
// cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage());

// Configuración personalizada de cookies
cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage(cookieOptions));

Amplify.configure(awsExports);


function MyRoutes() {
  return (
    <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminPage/>
              </RequireAuth>
            }
          />
          <Route
            path="/user"
            element={
              <RequireAuth>
                <UserPage/>
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<FourOFour/>} />
      </Route>
    </Routes>
  );
}

export const App = () => {
  return (
    <BrowserRouter>
      <Authenticator.Provider>
          <MyRoutes />
      </Authenticator.Provider>
    </BrowserRouter>
  );
}

export default App;
