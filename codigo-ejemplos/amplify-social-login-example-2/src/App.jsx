import React, { useEffect, useState } from "react";
import { Hub } from "aws-amplify/utils";
import { signInWithRedirect, signOut, getCurrentUser } from "aws-amplify/auth";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";


import  { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

import { CookieStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';

// Configurar opciones adicionales de las cookies
const cookieOptions = {
  domain: 'localhost', 
  expires: 30, 
  secure: true, 
  sameSite: 'lax',
};

Amplify.configure(awsconfig);

// cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage());
cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage(cookieOptions));



const App = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [customState, setCustomState] = useState(null);

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signInWithRedirect":
          console.log("Sign in with redirect");
          getUser();
          break;
        case "signInWithRedirect_failure":
          setError("An error has ocurred during the OAuth flow.");
          console.log("Error en signin with redirect");
          break;
        case "customOAuthState":
          setCustomState(payload.data); // this is the customState provided on signInWithRedirect function
          console.log("Custom OAuth State fixed");
          break;
        case "signedOut":
          console.log("Se ha hecho logout");
          break;
        case "signedIn":
          console.log("Se ha hecho signIn");
          break;
      }
    });

    // getUser();

    return unsubscribe;
  }, []);

  const getUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error(error);
      console.log("Not signed in");
    }
  };

  return (
    <div className="App">
      <button onClick={() => signInWithRedirect({ customState: "shopping-cart"})}>
        Open Hosted UI
      </button>
      <button onClick={() => signInWithRedirect({ provider: "Facebook", customState: "shopping-cart" })}>
        Open Facebook
      </button>
      <button onClick={() => signInWithRedirect({ provider: "Google", customState: "shopping-cart" })}>
        Open Google
      </button>
      <button onClick={() => signInWithRedirect({ provider: "Amazon", customState: "shopping-cart" })}>
        Open Amazon
      </button>
      {/* <button onClick={() => signInWithRedirect({ provider: "Apple", customState: "shopping-cart" })}>
        Open Apple
      </button> */}
      <button onClick={() => signOut()}>Sign Out</button>
      <div>{user?.username}</div>
      <div>{customState}</div>
    </div>
  );
}

export default App
