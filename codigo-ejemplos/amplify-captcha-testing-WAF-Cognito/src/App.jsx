import React from 'react';
import './App.css';

const App = () => {

  const url = "https://cognito-idp.us-east-1.amazonaws.com/";
  const payload = {
    AuthParameters: {
      USERNAME: "jcorral",
      PASSWORD: "Jcorral_2023#"
    },
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: "1v30fro7ad6sg2fhnmut49dukg",
    UserPoolId: "us-east-1_kXOp01ihj"
  };
  
  const headers = {
    'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',     // Petición API Cognito
    'Content-Type': 'application/x-amz-json-1.1'
  };
  
  const retardo = 300;              // Retardo en milisegundos entre peticiones
  const limiteIntentos = 100;       // Máximo número de peticiones
  
  function cognitoRequest(index) {
    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload)
    }) 
    .then(response => { 
      if (!response.ok) {
        throw new Error('La solicitud falló con código de estado ' + response.status);
      }
      
      return response.json();
    })    
    .then(data => {
      console.log(`Número de petición ${index} ejecutada`);
      
      index = index + 1;

      if (index <= limiteIntentos) {
        setTimeout(() => cognitoRequest(index), retardo);
      } else {
        console.log("Se han completado todas las peticiones");
      }
    })
    .catch(error => {
      console.error(`Error intento número  ${index}:`, error);
    });
  }
  
  cognitoRequest(1);


  return (
      <>
        <h1>Probando Cognito con WAF</h1>
      </>
  )
};


export default App;
