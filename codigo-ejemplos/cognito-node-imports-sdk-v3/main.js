/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */




// PASAMOS AL CÓDIGO

// Configurar las credenciales para el cliente de Cognito Identity Provider

// Credenciales de developer con acceso a la API de Cognito
const credentials = {
  accessKeyId: "tu_access_key_id",
  secretAccessKey: "tu_secret_access_key",
}

// Creamos el cliente de Cognito Identity Provider en la región "us-east-1" (N. Virginia) 
const client = new CognitoIdentityProviderClient({ region: "us-east-1" , credentials });
// const client = new CognitoIdentityProviderClient({ region: "us-east-1" });
var response;



// Creamos un grupo de usuarios o user pool
// Necesitamos permisos de IAM
import {
  CreateUserPoolCommand,
  CognitoIdentityProviderClient,
  VerifiedAttributeType,
} from "@aws-sdk/client-cognito-identity-provider";


const createUserPool = async (poolName, configOverrides = {}) => {   

  const command = new CreateUserPoolCommand({
      PoolName: poolName,
      AutoVerifiedAttributes: [VerifiedAttributeType.EMAIL],
      Schema: [{ Name: "email", Required: true }],
      UsernameConfiguration: { CaseSensitive: false },
      ...configOverrides,
  });

  try {
      return response = await client.send(command);
  } catch (err) {
    console.log("Error en CreateUserPoolCommand, este el error = ", err);
  }
}

// response = await createUserPool("pool-testing-vite-code");
// console.log("Esta es la response = ", response);




// Creamos un cliente de aplicación en el grupo de usuarios o user pool anterior
// Necesitamos permisos de IAM
import {
  CreateUserPoolClientCommand,
  ExplicitAuthFlowsType,
} from "@aws-sdk/client-cognito-identity-provider";


const createUserPoolClient = async (clientName, poolId) => {

  const command = new CreateUserPoolClientCommand({
    UserPoolId: poolId,
    ClientName: clientName,
    ExplicitAuthFlows: [
      ExplicitAuthFlowsType.ALLOW_ADMIN_USER_PASSWORD_AUTH,
      ExplicitAuthFlowsType.ALLOW_USER_PASSWORD_AUTH,
      ExplicitAuthFlowsType.ALLOW_REFRESH_TOKEN_AUTH
    ],
  });

  try {
    return response = await client.send(command);

  } catch (err) {
    console.log("Error en CreateUserPoolClientCommand, este el error = ", err);
  }
}

// response = await createUserPoolClient("user-pool-client-application", "us-east-1_ai3rf0BUl");
// console.log("Esta es la response = ", response);



// Configuramos MFA mediante token de software en un grupo de usuarios o user pool
// Necesitamos permisos de IAM
import {
  SetUserPoolMfaConfigCommand,
  UserPoolMfaType,
} from "@aws-sdk/client-cognito-identity-provider";

const setUserPoolMfaConfig = async (poolId) => {

  const command = new SetUserPoolMfaConfigCommand({
      UserPoolId: poolId,
      MfaConfiguration: UserPoolMfaType.ON,
      SoftwareTokenMfaConfiguration: { Enabled: true },
      // SmsMfaConfiguration: { Enabled: true },
  });

  try {
    return response = await client.send(command);

  } catch (err) {
    console.log("Error en SetUserPoolMfaConfigCommand, este el error = ", err);
  }
}

// response = await setUserPoolMfaConfig("us-east-1_FwIRWIYbb");
// console.log("Esta es la response = ", response);



// Eliminamos un grupo de usuarios o user pool
// Necesitamos permisos de IAM
import {
  DeleteUserPoolCommand,
} from "@aws-sdk/client-cognito-identity-provider";


const deleteUserPool = async (poolId) => {

  const command = new DeleteUserPoolCommand({
      UserPoolId: poolId,
  });

  try {
    return response = await client.send(command);

  } catch (err) {
    console.log("Error en DeleteUserPoolCommand, este el error = ", err);
  }
}

// response = await deleteUserPool("us-east-1_ai3rf0BUl");
// console.log("Esta es la response = ", response);




// Realizamos un login o signUp de un usuario en un grupo de usuarios o user pool
// No requiere permisos de IAM
import {
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const signUp = async ({ clientId, username, password, email }) => {

  const command = new SignUpCommand({
      ClientId: clientId,
      Username: username,
      Password: password,
      UserAttributes: [{ Name: "email", Value: email }],
  });

  try {
    return response = await client.send(command);

  } catch (err) {
    console.log("Error en SignUpCommand, este el error = ", err);
  }
}

// Le pasamos: clientId:"3stcgmkvu51c2347b3v0sj4i5m", 
// username: "jgarcia", password: "Jcorral_2023#", email: "jgarcia@gmail.com"});

// response = await signUp({clientId:"3stcgmkvu51c2347b3v0sj4i5m", username: "jgarcia", password: "Jcorral_2023#", email: "jgarcia@gmail.com"});
// console.log("Esta es la response = ", response);




// Confirmamos registro o signup enviando el código de confirmación al email del usuario
// No requiere permisos de IAM
import {
  ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const confirmSignUp = async ({ clientId, username, code }) => {

  const command = new ConfirmSignUpCommand({
    ClientId: clientId,
    Username: username,
    ConfirmationCode: code,
  });

  try {
    return response = await client.send(command);
  } catch (err) {
    console.log("Error en ConfirmSignUpCommand, este el error = ", err);

  }
}

// response = await confirmSignUp({ clientId: "3stcgmkvu51c2347b3v0sj4i5m", username: "jgarcia", code: "344627"});
// console.log("Esta es la response = ", response);




// Provocamos un reenvio del código de confirmación al email del usuario
// No requiere permisos de IAM
import {
  ResendConfirmationCodeCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const resendConfirmationCode = async ({ clientId, username }) => {

  const command = new ResendConfirmationCodeCommand({
    ClientId: clientId,
    Username: username
  });

  try {
    return response = await client.send(command);
  } catch (err) {
    console.log("Error en resend confirmation code, este el error = ", err);

  }
};

// response = await resendConfirmationCode({ clientId: "3stcgmkvu51c2347b3v0sj4i5m", username: "jgarcia" });
// console.log("Esta es la response = ", response);




// Cambiar el password mediante un token de acceso
// OJO !! al comando de cambiar el password, el token tiene que tener el scope "aws.cognito.signin.user.admin",
// es decir, debemos seleccionar también este permisos o scope en Cognito para el usuario que queremos cambiar el password.
// No requiere permisos de IAM
import { ChangePasswordCommand } from "@aws-sdk/client-cognito-identity-provider"; 

const changePassword = async ({ previousPassword, proposedPassword, accessToken }) => {

  const input = { // ChangePasswordRequest
    PreviousPassword: previousPassword, // required
    ProposedPassword: proposedPassword, // required
    AccessToken: accessToken, // required
  };

  const command = new ChangePasswordCommand(input);

  try {
    const response = await client.send(command);
    console.log("Esta es la response = ", response);

  } catch (err) {
    console.log("Error en changePassword, este el error = ", err);
  }
}

// response = await changePassword({ previousPassword: "Jcorral_2023#", proposedPassword: "Jcorral_2023@",
//           accessToken: "eyJraWQiOiI3ZDVUTjBPejhtdkNGZ3BXbUVsMitcL0dSVk9cL3ZlQnNZQkl3bGdXMmZLU1k9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIxOTA1OGZmNS1lNmI4LTQ2M2YtYWNlMS1kMmViMjA0NDVhZmMiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV83a0RHTGt0S3MiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIzc3RjZ21rdnU1MWMyMzQ3YjN2MHNqNGk1bSIsImV2ZW50X2lkIjoiYmQ5MDJiN2EtMzAwNy00MGZmLWE1NGMtN2I2MDkxN2NjY2JhIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBwaG9uZSBvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE2OTUyNDkzODMsImV4cCI6MTY5NTI1Mjk4MywiaWF0IjoxNjk1MjQ5MzgzLCJqdGkiOiI4MGRhN2NlOC00OWQ5LTQ2OWUtOTEzNy1iZTQwMGQ1NTFiMTUiLCJ1c2VybmFtZSI6ImpnYXJjaWEifQ.MBtTm3Vz5hK58QDF0H4UPU-G7R8cjD60MiXenkRV20YjxfWJFKvMYUAYeggCAN5LWG2aD-HmpV1IyKEvs-iDg3AfBs1yUp2xPtydZTKnPjbqIbNKcKfeHsvAN3pSARWfUtF_EkKgXhVFRoIvKDW_Ac8eJGUiZNUYHynRbx8RmqA0HOC1cMeOs9CumJAhV90rFxAd0_43u7cRWuKmfdHd70O2abg0JLQsh92PkuSrkQ717CbhbGUjEvj1ECQOrwTD6CUeMNdcsxOwJ_J6vdPBofAMiz0mLRG3xxrFkvXbRFwvGLEh1mUWFfOmC8puW_-vlH9Uj3F0eAZ4kS0gdVhSUg" });




// Eliminar usuario mediante un token de acceso
// OJO !! al comando de borrar, el token tiene que tener el scope "aws.cognito.signin.user.admin"
// es decir, tenemos que configurar ese permiso o scope en Cognito para el usuario que queremos borrar.
// No requiere permisos de IAM
import {
  DeleteUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const deleteUserCommand = async (access_token) => {

  const command = new DeleteUserCommand({
        AccessToken: access_token,
  });

  try {

      return response = await client.send(command);

    } catch (err) {
      console.log("Error en deleteUserCommand, este el error = ", err);
  }
}

// response = await deleteUserCommand("eyJraWQiOiI3ZDVUTjBPejhtdkNGZ3BXbUVsMitcL0dSVk9cL3ZlQnNZQkl3bGdXMmZLU1k9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIxOTA1OGZmNS1lNmI4LTQ2M2YtYWNlMS1kMmViMjA0NDVhZmMiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV83a0RHTGt0S3MiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIzc3RjZ21rdnU1MWMyMzQ3YjN2MHNqNGk1bSIsImV2ZW50X2lkIjoiYmQ5MDJiN2EtMzAwNy00MGZmLWE1NGMtN2I2MDkxN2NjY2JhIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBwaG9uZSBvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE2OTUyNDkzODMsImV4cCI6MTY5NTI1Mjk4MywiaWF0IjoxNjk1MjQ5MzgzLCJqdGkiOiI4MGRhN2NlOC00OWQ5LTQ2OWUtOTEzNy1iZTQwMGQ1NTFiMTUiLCJ1c2VybmFtZSI6ImpnYXJjaWEifQ.MBtTm3Vz5hK58QDF0H4UPU-G7R8cjD60MiXenkRV20YjxfWJFKvMYUAYeggCAN5LWG2aD-HmpV1IyKEvs-iDg3AfBs1yUp2xPtydZTKnPjbqIbNKcKfeHsvAN3pSARWfUtF_EkKgXhVFRoIvKDW_Ac8eJGUiZNUYHynRbx8RmqA0HOC1cMeOs9CumJAhV90rFxAd0_43u7cRWuKmfdHd70O2abg0JLQsh92PkuSrkQ717CbhbGUjEvj1ECQOrwTD6CUeMNdcsxOwJ_J6vdPBofAMiz0mLRG3xxrFkvXbRFwvGLEh1mUWFfOmC8puW_-vlH9Uj3F0eAZ4kS0gdVhSUg");
// console.log("Esta es la response = ", response);




// Eliminar usuario pero con credenciales de admin
// Requiere permisos IAM de administrador o política "AmazonESCognitoAccess" en usuario IAM
import { AdminDeleteUserCommand } from "@aws-sdk/client-cognito-identity-provider"; 

const AdmindeleteUserCommand = async ({userPoolId, username}) => {

  const input = { // AdminDeleteUserRequest
    UserPoolId: userPoolId, // required
    Username: username, // required
  };

  try {
    const command = new AdminDeleteUserCommand(input);
    const response = await client.send(command);

    console.log("Esta es la response = ", response);

  } catch (err) {
    console.log("Error en AdmindeleteUserCommand, este el error = ", err);
  }
}

// response = await AdmindeleteUserCommand({ userPoolId: "us-east-1_7kDGLktKs", username: "jcorral" });



// ********************************** EN ESTE METODO CANVIAN ALGUNAS COSAS RESPECTO DEL REPOSITORIO PARA EL NAVEGADOR
// Autenticar usuario modo Administrador
// Requiere permisos de IAM con la política AmazonESCognitoAccess, o permisos de Administrador (u otros que configuremos).
import {
  AdminInitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";

// Aquí cargamos los paquetes para gestionar el archivo .env
import fs from 'fs'; 
import dotenv from 'dotenv';

const adminInitiateAuth = async ({
  clientId,
  userPoolId,
  username,
  password,
}) => {

  const command = new AdminInitiateAuthCommand({
    ClientId: clientId,
    UserPoolId: userPoolId,
    AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
    // AuthFlow: "USER_SRP_AUTH",

    AuthParameters: { USERNAME: username, PASSWORD: password },
  });

  try {

    response = await client.send(command);
    let session = response.Session;

    // Escribe el contenido actualizado en el archivo .env
    // fs.writeFileSync('.env', `SESSION=${session}`);
    fs.writeFileSync('.env', `ACCESS_TOKEN=${response.AuthenticationResult.AccessToken}`);

    return response;

  } catch (err) {
    console.log("Error en AdminInitiateAuthCommand, este el error = ", err);
  }
};

// Usamos sesión
// response = await adminInitiateAuth({ clientId: "5mocgcednf1hbm4nltflj5ilcf", userPoolId: "us-east-1_FwIRWIYbb", 
//         username: "jcorral", password: "Jcorral_2023#" });
// console.log("Esta es la response = ", response);

// Usamos access token
// response = await adminInitiateAuth({ clientId: "3stcgmkvu51c2347b3v0sj4i5m", userPoolId: "us-east-1_7kDGLktKs", 
//         username: "jcorral", password: "Jcorral_2023#" });
// console.log("Esta es la response = ", response);



// ********************************** EN ESTE METODO CANVIAN ALGUNAS COSAS RESPECTO DEL REPOSITORIO PARA EL NAVEGADOR
// Hacemos un global signout, por tanto quedamos deslogueados de todas las aplicaciones
// No requiere permisos de IAM
import { GlobalSignOutCommand } from "@aws-sdk/client-cognito-identity-provider"; 

const GlobalSignOut = async ({ accessToken }) => {

  const input = { // GlobalSignOutRequest
    AccessToken: accessToken, // required
  };
  try {
    const command = new GlobalSignOutCommand(input);
    const response = await client.send(command);
    console.log("Esta es la response = ", response);
    
  } catch (err) {
    console.log("Error en GlobalSignOutCommand, este el error = ", err);
  }
}

// dotenv.config();
// const access_token_from_env = process.env['ACCESS_TOKEN'];

// response = await GlobalSignOut({ accessToken: access_token_from_env });



// ********************************** EN ESTE METODO CANVIAN ALGUNAS COSAS (SOLO FUERA 
// ********************************** DEL METODO EN EL USO DE VARIABLES DE AMBIENTE) RESPECTO DEL REPOSITORIO PARA EL NAVEGADOR
// Responder reto autenticación usuario
// Requiere permisos de IAM con la política de Administrador o 
// AmazonCognitoPowerUser (u otros que configuremos).
import {
  AdminRespondToAuthChallengeCommand,
} from "@aws-sdk/client-cognito-identity-provider";
// import dotenv from 'dotenv';

const adminRespondToAuthChallenge = async ({
  userPoolId,
  clientId,
  username,
  totp,
  session,
}) => {

  const command = new AdminRespondToAuthChallengeCommand({
    ChallengeName: ChallengeNameType.SOFTWARE_TOKEN_MFA,
    ChallengeResponses: {
      SOFTWARE_TOKEN_MFA_CODE: totp,
      USERNAME: username,
    },
    ClientId: clientId,
    UserPoolId: userPoolId,
    Session: session,
  });

  try {

    return response = await client.send(command);

  } catch (err) {
    console.log("Error en AdminRespondToAuthChallengeCommand, este el error = ", err);
  }
};

// dotenv.config();
// const session_from_env = process.env['SESSION'];

// response = await adminRespondToAuthChallenge({  userPoolId: "us-east-1_FwIRWIYbb", clientId: "5mocgcednf1hbm4nltflj5ilcf", 
//         username: "antonio", totp: "666723", session: session_from_env  });
// console.log("Esta es la response = ", response);




// Listamos usuarios de un grupo de usuarios o user pool
// Requiere permisos de IAM con la política de Administrador o 
// AmazonCognitoPowerUser (u otros que configuremos).
import {
  ListUsersCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const listUsers = async ({ userPoolId }) => {

  const command = new ListUsersCommand({
    UserPoolId: userPoolId,
  });

  try {

    return response = await client.send(command);

  } catch (err) {
    console.log("Error en ListUsersCommand, este el error = ", err);
  }
};

// response = await listUsers({ userPoolId: "us-east-1_7kDGLktKs"});
// console.log("Esta es la response = ", response);




// Obtener datos de un usuario (comando admin)
// Requiere permisos de IAM con la política de Administrador o 
// AmazonCognitoPowerUser (u otros que configuremos).
import {
  AdminGetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const adminGetUser = async ( userPoolId, username ) => {

  const command = new AdminGetUserCommand({
    UserPoolId: userPoolId,
    Username: username,
  });

  try {
    return response = await client.send(command);

  } catch (err) {
    console.log("Error en AdminGetUserCommand, este es el error = ", err);
  }
}

// response = await adminGetUser("us-east-1_7kDGLktKs", "jcorral" )
// console.log('Datos usuarios = \n ', response);




// Obtener datos usuario comando no admin (mediante access token)
// No requiere permisos de IAM
import {
  GetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const getUser = async ( access_token ) => {

  const command = new GetUserCommand({
    AccessToken: access_token, // required
  });

  try {
    return response = await client.send(command);

  } catch (err) {
    console.log("Error en GetUserCommand, este es el error = ", err);
  }
}

// Usaremos el user pool que no tiene activado el MFA para autenticar al usuario en sólo un paso
// response = await getUser("eyJraWQiOiI3ZDVUTjBPejhtdkNGZ3BXbUVsMitcL0dSVk9cL3ZlQnNZQkl3bGdXMmZLU1k9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJiYTA5MGZiYi03ZTA5LTRkZmItODE2Yy00OTA2NjU3YzhjNjUiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV83a0RHTGt0S3MiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIzc3RjZ21rdnU1MWMyMzQ3YjN2MHNqNGk1bSIsImV2ZW50X2lkIjoiZTMxNGRlOWYtMDVjYS00YzU2LWFjOTktMTk3Yjc5OThmNDZkIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBwaG9uZSBvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE2OTU0MDA3NjIsImV4cCI6MTY5NTQwNDM2MiwiaWF0IjoxNjk1NDAwNzYyLCJqdGkiOiJlY2RlNzc5YS1hNTFiLTRhNTctOGJjYS0yOGY5ZGU0NjBiZjIiLCJ1c2VybmFtZSI6Impjb3JyYWwifQ.PSYaPjaEbuNPCAg9LfUKkNv_G69IeDQFZ19oMVtjADlQkroiKw5Y32hJilclkA4B-YsrQgtN7iFAHftMkwPZB9DrGIXM5ELjzRHSeQVG1BoWQ6KQZPZejFd4NjPw4zH5a0p62xb8HGqwSbzQEZrE-PM4FEaUqo0S8xLZX07HJvgzVdnwL0duWPLTwkRu3s5SxZY-fXyOqKOa50QQRr6qiF7Z_vhnWWu1tD3FatTvGWYFLj9Mr7ON975bwj3Qy6hzlQPYpYzASV3s09lVVWZts8D9J-yllV-mxJUEl1aN7MoiJqa2wee7SofavoW914AIZLda4fWbEbrUhbUnvvI1vw")
// console.log('Datos usuarios = \n ', response);





// LOGIN USUARIOS Y GESTIÓN DE MFA con TOTP ******************************

// PASOS PARA EJECUTAR CORRECTAMENTE:

// 1- crear usuario en Cognito y hacer el cambio de password lanzando la hosted UI, pero
//    sin especificar el método del MFA.
// 2- ejecutar el método initiateAuth para obtener el ChallengeName y la Session.
// 3- si el ChallengeName es MFA_SETUP, ejecutar el método handleMfaSetup para leer el código QR.
//    3-1- escanear el código QR con la app Google Authenticator.
//    3-2- ejecutar el método verifySoftwareToken para verificar el código TOTP.
//    3-3- Ahora ya podemos ejecutar el método initiateAuth y después el respondToAuthChallenge.
// 4- si el ChallengeName es SOFTWARE_TOKEN_MFA, se ejecutará el método handleSoftwareTokenMfa para guardar la Session.
//    4-2- ejecutar el método RespondToAuthChallenge para obtener el Access Token.

// Usaremos el archivo .env para guardar la Session y el Access Token.

// ***********************************************************************

// ********************************** EN ESTOS METODOS CANVIAN ALGUNAS COSAS (EN EL USO DE 
// ********************************** VARIABLES DE AMBIENTE) RESPECTO DEL REPOSITORIO PARA EL NAVEGADOR

// Todos estos comandos no requieren permisos de IAM
import {
  InitiateAuthCommand,
  AssociateSoftwareTokenCommand,
  VerifySoftwareTokenCommand,
  RespondToAuthChallengeCommand,
  ChallengeNameType
} from "@aws-sdk/client-cognito-identity-provider";

// import fs from 'fs'; 
// import dotenv from 'dotenv';

import sharp from 'sharp';   
import qrcode from 'qrcode';


// Asociar código QR a usuario y sesión
const handleMfaSetup = async (session, username) => {
  const { SecretCode, Session } = await associateSoftwareToken(session);

  // Guardar la sesión para usar en el método 'VerifySoftwareToken'.
  fs.writeFileSync('.env', `SESSION=${Session}`);


  console.log(
    "Scan this code in your preferred authenticator app, then run 'verify-software-token' to finish the setup."
  );

  // Tamaño de la imagen del código QR en el archivo .png
  let imageSize = 200;
  // Montamos url para generar el código QR
  const url = `otpauth://totp/${username}?secret=${SecretCode}`;
  const filePath = `./qr2.png`;

  try {
    const qrCodeData = await qrcode.toDataURL(url, { width: imageSize });
    const qrCodeBuffer = Buffer.from(qrCodeData.replace(/^data:image\/png;base64,/, ''), 'base64');

    await sharp(qrCodeBuffer)
      .png()
      .toFile(filePath);

    console.log(`QR code image saved to ${filePath}`);
  } catch (error) {
    console.error('Error generating QR code image:', error);
  }
}




// Guardamos sesión en archivo .env
const handleSoftwareTokenMfa = (session) => {

  // Guardar sesión para usar en método 'RespondToAuthChallenge'.
    fs.writeFileSync('.env', `SESSION=${session}`);
};




// Asociar código secreto a sesion usuario, de la response podemos extraer el código secreto
const associateSoftwareToken = async (session) => {
  const command = new AssociateSoftwareTokenCommand({
    Session: session,
  });

  try {
    return response = await client.send(command);

  } catch (err) {
    console.log("Error en AssociateSoftwareTokenCommand, este es el error = ", err);
  }
}




// Verificar token de software con código totp
const verifySoftwareToken = async (totp) => {
  // The 'Session' is provided in the response to 'AssociateSoftwareToken'.
  dotenv.config();
  const session = process.env.SESSION;

  if (!session) {
    throw new Error(
      "Missing a valid Session. Did you run 'admin-initiate-auth'?"
    );
  }
  
  const command = new VerifySoftwareTokenCommand({
    Session: session,
    UserCode: totp,
  });

  try {

    const response = await client.send(command);
    console.log("Esta es la response de VerifySoftwareTokenCommand = ", response);
  
  } catch (err) {
    console.log("Error en VerifySoftwareTokenCommand, este es el error = ", err);
  }
}


// Inicia sesión usuario
// import fs from 'fs'; 
// import dotenv from 'dotenv';


const initiateAuth = async ( clientId, username, password ) => {

  const input = { // InitiateAuthRequest
    AuthFlow: "USER_PASSWORD_AUTH",// required

    AuthParameters: { // AuthParametersType (required)
      USERNAME: username,
      PASSWORD: password
    },

    ClientId: clientId, // required
  };

  let response;
  
  try {
    console.log("Signing in.");
    const command = new InitiateAuthCommand(input);

    response = await client.send(command);
    console.log("Esta es la response = ", response);
    
  } catch (err) {
    console.log("Error en InitiateAuthCommand, este es el error = ", err);
  }

  const { ChallengeName, Session } = response;

  console.log("Este es el ChallengeName = ", ChallengeName);
  console.log("Esta es la Session = ", Session);

  if (ChallengeName === "MFA_SETUP") {
    console.log("MFA setup is required.");
    return handleMfaSetup(Session, username);
  }

  if (ChallengeName === "SOFTWARE_TOKEN_MFA") {
    handleSoftwareTokenMfa(Session);
    console.log(`Run 'respond-to-auth-challenge ${username} <totp>'`);
  } 
}




// Responde a un Challenge de Autenticación
const RespondToAuthChallenge = async (
    clientId,
    username,
    totp,
  ) => {

    // Recuperamos sesión del archivo .env
    dotenv.config();
    const session = process.env.SESSION;

    const command = new RespondToAuthChallengeCommand({

      ChallengeName: ChallengeNameType.SOFTWARE_TOKEN_MFA,
      ChallengeResponses: {
        SOFTWARE_TOKEN_MFA_CODE: totp,
        USERNAME: username,
      },
      ClientId: clientId,
      Session: session,
    });

    try {

      const response = await client.send(command);
      console.log("Esta es la response de RespondToAuthChallengeCommand = ", response.AuthenticationResult);

      // Guardamos el Access Token en el archivo .env (primero leemos lo que tiene)
      const envBuffer = fs.readFileSync('.env');
      const envConfig = dotenv.parse(envBuffer);

      envConfig.ACCESS_TOKEN = response.AuthenticationResult.AccessToken;

      const envContent = Object.entries(envConfig)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');

      fs.writeFileSync('.env', envContent);


      dotenv.config();
      console.log('Este es mi access token = ', process.env['ACCESS_TOKEN']);

    } catch (err) {
      console.log("Error RespondToAuthChallengeCommand, este es el error = ", err);
    }
}


// Para estas pruebas voy a utilizar el User Pool llamado "pool-testing-1"

// initiateAuth( "5mocgcednf1hbm4nltflj5ilcf", "jgarcia", "Jcorral_2023#" ); 

// verifySoftwareToken("624189");

// RespondToAuthChallenge( "5mocgcednf1hbm4nltflj5ilcf", "jgarcia", "651192");






// ********************************************************************
// EJEMPLOS DE ACCESO A RECURSOS DE AWS MEDIANTE COGNITO IDENTITY POOLS
// ********************************************************************


// Necesitaremos usar el token de identificación (id token) para pasarlo a nuestro
// Identity Pool en el método "fromCognitoIdentityPool" y así obtener acceso
// a los recursos de AWS.

// ¡ OJO, ESTE EJEMPLO DE LISTAR LOS BUCKETS NO FUNCIONA EN EL NAVEGADOR (no lo digo yo, lo dice AWS ok ?) , PERO SÍ DESDE NodeJS DIRECTAMENTE
import {
  CognitoIdentityClient,
} from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";



const listBuckets = async ( identityPoolId, idToken ) => {

  const userPoolId = 'us-east-1_7kDGLktKs';
  const region = 'us-east-1'; // Reemplaza con tu región de AWS Cognito


  const cognitoClient = new CognitoIdentityClient({
    region: region, 
    credentials: credentials,
  });

  try {
    // Configura el cliente de S3 con el identity pool y el access token del usuario autenticado
    const s3Client = new S3Client({
      region,
      credentials: fromCognitoIdentityPool({
        client: cognitoClient, 
        identityPoolId: identityPoolId,
        logins: {
          [`cognito-idp.${region}.amazonaws.com/${userPoolId}`]: idToken,
        },
      }),
    });

    // Listamos los buckets de S3
    const response = await s3Client.send(new ListBucketsCommand({}));
    console.log("Vemos la response:", response);

    console.log("Buckets disponibles:");
      response.Buckets.forEach((bucket) => {
        console.log(bucket.Name);
    });

  } catch (error) {
    console.error("Error en listBuckets: ", error);
  }
}

// response = await listBuckets("us-east-1:99d537fb-8191-46d4-bfaa-ba79f444ffe9", "eyJraWQiOiJYa3YyaFwvbW9lSGZXeTdqRXBzUE9HZkE3dlwva05MOXQrU2ZPMWI3RE1OQk09IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoidkJTNDY4YnV2QlBydnlBZy1YVGMyUSIsInN1YiI6ImJhMDkwZmJiLTdlMDktNGRmYi04MTZjLTQ5MDY2NTdjOGM2NSIsImF1ZCI6IjNzdGNnbWt2dTUxYzIzNDdiM3Ywc2o0aTVtIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjk3MDEyMjA1LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV83a0RHTGt0S3MiLCJjb2duaXRvOnVzZXJuYW1lIjoiamNvcnJhbCIsImV4cCI6MTY5NzAxNTgwNSwiaWF0IjoxNjk3MDEyMjA1LCJlbWFpbCI6Impjb3JyYWxAZ21haWwuY29tIn0.lOO62AcxC9UQbKfsStO-8zGCs7PTPUmz8MJklsaw_qKVcTO_rmdlBylzBIxPpEAcf1b9reRJLWwUxIfkkVC5IBAkgJmQpPOgGnkT3S5FZN_YleE2ApzSyqGr4ypHS0ZOeTE5_rZOEZqX_wmrlOrjdMNQf6j1jkIh44rmsfu-Lu7gegID5Pbz6KmQGp_BoLyqq9Rbx9i_o8URSUWkysjTQSotM2RlYDq32hxPZ7UIGk2yKxl6NOICksPT-Ki2_qptkNJIxfUNagLCnyvu4eNEcvoQq5rnoVm6j2OPuwYNMIRJWT8s9sPAdm4BTwUvYp--G3rFp5kZvIGo5_e9cSQaDQ");


// Solución ejercicio obtener objeto de S3


// Credenciales de developer con acceso a la API de Cognito
// const credentials = {
//   accessKeyId: "tu_access_key_id",
//   secretAccessKey: "tu_secret_access_key",
// }

// // Creamos el cliente de Cognito Identity Provider en la región "us-east-1" (N. Virginia) 
// const client = new CognitoIdentityProviderClient({ region: "us-east-1" , credentials });
// var response;


// import {
//   CognitoIdentityClient,
// } from "@aws-sdk/client-cognito-identity";
// import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { GetObjectCommand } from "@aws-sdk/client-s3";



const listObject = async ( identityPoolId, idToken ) => {

  const userPoolId = 'us-east-1_7kDGLktKs';
  const region = 'us-east-1'; // Reemplaza con tu región de AWS Cognito


  const cognitoClient = new CognitoIdentityClient({
    region: region, 
    credentials: credentials,
  });

  try {
    // Configura el cliente de S3 con el identity pool y el access token del usuario autenticado
    const s3Client = new S3Client({
      region,
      credentials: fromCognitoIdentityPool({
        client: cognitoClient, 
        identityPoolId: identityPoolId,
        logins: {
          [`cognito-idp.${region}.amazonaws.com/${userPoolId}`]: idToken,
        },
      }),
    });

    const command = new GetObjectCommand({
      Bucket: "jcorralbucketlegal",
      Key: "holamundo3.txt",
    });

    // Obtener el fichero de texto de S3
    const response = await s3Client.send(command);
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    const str = await response.Body.transformToString();
    console.log(str);

  } catch (error) {
    console.error("Error en listObject: ", error);
  }
}

response = await listObject("us-east-1:99d537fb-8191-46d4-bfaa-ba79f444ffe9", "eyJraWQiOiJYa3YyaFwvbW9lSGZXeTdqRXBzUE9HZkE3dlwva05MOXQrU2ZPMWI3RE1OQk09IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiZ1laVmlpUm00M1ZJY2pVUGpLS0hMZyIsInN1YiI6IjcyMDI3ZmMxLTliNTYtNDcxZi05NTY4LTU0NGVjMjQyN2FmZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfN2tER0xrdEtzIiwiY29nbml0bzp1c2VybmFtZSI6ImpnYXJjaWEiLCJhdWQiOiIzc3RjZ21rdnU1MWMyMzQ3YjN2MHNqNGk1bSIsImV2ZW50X2lkIjoiNGZhYjFhOTQtNWVhMC00ZjNjLThlMTUtZWY2YWU3Y2QwZGQ0IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3MTMzMjEwMTAsImV4cCI6MTcxMzMyNDYxMCwiaWF0IjoxNzEzMzIxMDEwLCJqdGkiOiJhZmY0YjAwMS01MzljLTQzMjItYjY5Yy01ODdhNDk4ZjRkYWYiLCJlbWFpbCI6ImpnYXJjaWFAZ21haWwuY29tIn0.n2Pi4r6aT4DQeOiOhpirbcNk8JmEMg4yMwLYFJY_iq0WEsl9wmmjOr4kaNMbtWEPAr1KwHBUrMl8QfsdjltI8V11UgxbCcsYZjznscW7ZjLQRC4s5GJQovQhgKpOQn-3R1skc_RMNZonQQzFFOWklfmthQaG9sAydsKneAwjZfTxyd3SQNvAWMPAI8YFQH9XwTOU-JeXo56IzGENDfigDj815xGboELnAbhA0F0vDDje0uRM6aV_YQjx4bUHj6NZfxM7Q3zdoBsJ3RSs3DRwWovwx6PjLKV2LYq6nqpnGZutbojtL9ccQZOK1Q2V-vwlY4jKKQIEEfSKBH7Jd9JPSQ");






// Ejemplo acceso a tablas de DynamoDB. Se necesita un Identity Pool con un rol que tenga
// la política de acceso a DynamoDB (AmazonDynamoDBFullAccess por ejemplo).
// Este método se puede ejecutar desde el navegador

// import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
// import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const listDynamoDBTable = async ( identityPoolId, IdToken ) => {

  const userPoolId = 'us-east-1_7kDGLktKs';
  const region = 'us-east-1'; // Reemplaza con tu región de AWS Cognito


  const cognitoClient = new CognitoIdentityClient({
    region: region, 
    credentials: credentials,
  });

  try {

    const dynamoDBClient  = new DynamoDBClient({
      region,            // Región de la tabla de DynamoDB
      credentials: fromCognitoIdentityPool({
        client: cognitoClient, 
        identityPoolId: identityPoolId,
        logins: {
          [`cognito-idp.${region}.amazonaws.com/${userPoolId}`]: IdToken,
        },
      }),
    });

    const params = {
      TableName: "Usuarios", // Reemplaza con el nombre de tu tabla
    };

    // Vamos a listar los registros de la tabla de DynamoDB
    const response = await dynamoDBClient.send(new ScanCommand(params));

    console.log("Elementos en la tabla DynamoDB:");

    response.Items.forEach((item) => {
      // console.log(JSON.stringify(item, null, 2));
      console.log("item = ", item);
    });

  } catch (error) {
    console.error("Error en listDynamoDBTable: ", error);
  }
}

// response = await listDynamoDBTable("us-east-1:99d537fb-8191-46d4-bfaa-ba79f444ffe9", "us-east-1");




// Insertamos un registro en una tabla de DynamoDB (la tabla tiene que existir con el id como clave primaria

// import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
// import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";


const putItemDynamoDB = async ( identityPoolId, IdToken ) => {

  const userPoolId = 'us-east-1_7kDGLktKs';
  const region = 'us-east-1'; // Reemplaza con tu región de AWS Cognito


  const cognitoClient = new CognitoIdentityClient({
    region: region, 
    credentials: credentials,
  });

  try {

    const dynamoDBClient  = new DynamoDBClient({
      region,       // Región de la tabla de DynamoDB
      credentials: fromCognitoIdentityPool({
        client: cognitoClient, 
        identityPoolId: identityPoolId,
        logins: {
          [`cognito-idp.${region}.amazonaws.com/${userPoolId}`]: IdToken,
        },
      }),
    });

    // Parámetros para insertar un registro en la tabla de DynamoDB (la tabla tiene que existir con el id como clave primaria 
    // que está en formato N numérico)
    const params = {
      TableName: "PutItemsWithCognito",
      Item: {
        id: { N: "1" },
        title: { S: "aTitle_1" },
        name: { S: "aName_1" },
        body: { S: "aBody_1" },
      },
    };

    // Insertamos registros en la tabla de DynamoDB
    const response = await dynamoDBClient.send(new PutItemCommand(params));

    console.log("Esta es la response: ", response);

  } catch (error) {
    console.error("Error en putItemDynamoDB: ", error);
  }
}

// response = await putItemDynamoDB("us-east-1:99d537fb-8191-46d4-bfaa-ba79f444ffe9", "eyJraWQiOiJYa3YyaFwvbW9lSGZXeTdqRXBzUE9HZkE3dlwva05MOXQrU2ZPMWI3RE1OQk09IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoibjZhRDZUcnFwTDVfaTBhOTl3SWRYdyIsInN1YiI6ImJhMDkwZmJiLTdlMDktNGRmYi04MTZjLTQ5MDY2NTdjOGM2NSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV83a0RHTGt0S3MiLCJjb2duaXRvOnVzZXJuYW1lIjoiamNvcnJhbCIsImF1ZCI6IjNzdGNnbWt2dTUxYzIzNDdiM3Ywc2o0aTVtIiwiZXZlbnRfaWQiOiI3MmY4YTQxNC1jZGQxLTRiYTktYWY5NS04ZmNlZWUxNDRjODIiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY5NTQwODk4NywiZXhwIjoxNjk1NDEyNTg3LCJpYXQiOjE2OTU0MDg5ODcsImp0aSI6IjExOWY4ZGU5LTc3NmItNDgzOC05ZDE3LWU5MGEwZDVhNmE0ZSIsImVtYWlsIjoiamNvcnJhbEBnbWFpbC5jb20ifQ.SOZCi0ntOJhX1zw_qrTfx5AOAIKuv5GYP0xCHCY_Vq3GYGzwL2utWw9xE4XI59_jFnmF8dry8AECEzm1jqmB0MQxMjhBZ_vnS4-ey2WUcZRW7ASENgLIdgyZzZCUg9N5TqE4x4xuJVTdfJQTrFY3aMVhwRVN-3qAC8CyZXkimsppobzdXYT9CieAMq8g41N6gFEZrXu0x03qhn6kMh-7__n3QTN-28NjN4UUwDFIbFVRnbBc2FE8Rullp5tUu3T8IXhrFq_pYa1X0EKp74tHxjVqYNZIGVyM3wLTXaQ0wud-bcINx4JOAPM80YRIIsgJBg9dMW96_ZO-uY7z-s4QzA");




// ******************************************************************************************************
// EJEMPLOS DE COMANDOS DE CREACION, ELIMINACION, ETC., DE COGNITO IDENTITY POOLS O GRUPOS DE IDENTIDADES
// ******************************************************************************************************


// Creamos un grupo de identidades o Identity Pools
// Requiere permisos de IAM cómo mínimo de Developer Credentials, nosotros usaremos el AmazonCognitoPowerUser
import { CreateIdentityPoolCommand } from "@aws-sdk/client-cognito-identity"; 
// import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity"; // ES Modules import


const createIdentityPool = async ( identityPoolName ) => {

  const cognitoClient = new CognitoIdentityClient({
    region: "us-east-1", 
    credentials: credentials,
  });

  const input = { // CreateIdentityPoolInput
    IdentityPoolName: identityPoolName,         // required
    AllowUnauthenticatedIdentities: true ,    // required
    AllowClassicFlow: false,

    // IdentityProviders

    // SupportedLoginProviders: { 
    //   "accounts.google.com": "Client_ID_de_Google",
    // },

    CognitoIdentityProviders: [ 
      { 
        // Formato ProviderName = cognito-idp.<region>.amazonaws.com/<userPoolId>
        ProviderName: "cognito-idp.us-east-1.amazonaws.com/us-east-1_7kDGLktKs",
        ClientId: "3stcgmkvu51c2347b3v0sj4i5m",

        // true = antes de emitir el token de OIDC comprueba si el user ha hecho logout/signout o se ha eliminado
        ServerSideTokenCheck: true,   
      },
    ],

    IdentityPoolTags: {         // IdentityPoolTagsType
      "tag-1": "tag-1-value",
    },
  };

  const command = new CreateIdentityPoolCommand(input);

  try {
    return response = await cognitoClient.send(command);

  } catch (error) {
    console.error("Error en CreateIdentityPoolCommand: ", error);
  }
}

// response = await createIdentityPool("testing-Identity-pool-name-v10");
// console.log('Esta es la response = ' , response);




// Eliminamos un grupo de identidades o Identity Pool
// Requiere permisos de IAM cómo mínimo de Developer Credentials, nosotros usaremos el AmazonCognitoPowerUser
import { DeleteIdentityPoolCommand } from "@aws-sdk/client-cognito-identity"; 
// import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity"; // ES Modules import


const deleteIdentityPool = async ( identityPoolId ) => {

  const cognitoClient = new CognitoIdentityClient({
    region: "us-east-1", 
    credentials: credentials,
  });

  const input = {                         // CreateIdentityPoolInput
    IdentityPoolId: identityPoolId,       // required
  };

  const command = new DeleteIdentityPoolCommand(input);

  try {
    return response = await cognitoClient.send(command);

  } catch (error) {
    console.error("Error en DeleteIdentityPoolCommand: ", error);
  }
}

// Trabajamos con el identity pool llamado "testing-Identity-pool-name-v10" y le pasamos al método
// su identity pool id correspondiente

// response = await deleteIdentityPool("us-east-1:8af25f9c-e8b4-4163-bb31-68df1218f630");
// console.log('Esta es la response = ' , response);




// Eliminamos identidades o identities de un Identity Pool
// Requiere permisos de IAM cómo mínimo de Developer Credentials, nosotros usaremos el AmazonCognitoPowerUser
import { DeleteIdentitiesCommand  } from "@aws-sdk/client-cognito-identity"; 
// import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity"; // ES Modules import


const deleteIdentities = async ( identityId ) => {

  const cognitoClient = new CognitoIdentityClient({
    region: "us-east-1", 
    credentials: credentials,
  });

  const input = {             // DeleteIdentitiesInput
    IdentityIdsToDelete: [    // IdentityIdList // required
      identityId,
    ],
  };

  const command = new DeleteIdentitiesCommand(input);

  try {
    return response = await cognitoClient.send(command);

  } catch (error) {
    console.error("Error en DeleteIdentitiesCommand: ", error);
  }
}

// response = await deleteIdentities("us-east-1:efd34778-367a-4188-8752-a2dddcb5f9c1");
// console.log('Esta es la response = ' , response);




// Descripción de un Identity Pool
// Requiere permisos de IAM cómo mínimo de Developer Credentials, nosotros usaremos el AmazonCognitoPowerUser
import { DescribeIdentityPoolCommand  } from "@aws-sdk/client-cognito-identity"; 
// import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity"; // ES Modules import


const describeIdentityPool = async ( identityPoolId ) => {

  const cognitoClient = new CognitoIdentityClient({
    region: "us-east-1", 
    credentials: credentials,
  });

  const input = {                     // DescribeIdentityPoolInput
    IdentityPoolId: identityPoolId,   // required
  };

  const command = new DescribeIdentityPoolCommand(input);

  try {
    return response = await cognitoClient.send(command);

  } catch (error) {
    console.error("Error en DescribeIdentityPoolCommand: ", error);
  }
}

// response = await describeIdentityPool("us-east-1:99d537fb-8191-46d4-bfaa-ba79f444ffe9");
// console.log('Esta es la response = ' , response);




// Creamos un identity Id, es decir, simulamos un usuario no registrado en el identity pool id especificado
// que tendrá acceso de invitado (guess access o usuario no autenticado),
// pero también podemos pasarle un usuario logeado en un user pool mediante su id token.
// No requiere permisos de IAM, es un método público de la API.
import { GetIdCommand   } from "@aws-sdk/client-cognito-identity"; 
// import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity"; // ES Modules import


const createIdentityId = async ( identityPoolId ) => {

  const cognitoClient = new CognitoIdentityClient({
    region: "us-east-1", 
    // credentials: credentials,
  });

  const userPoolId  = "us-east-1_7kDGLktKs";
  const idToken = "eyJraWQiOiJYa3YyaFwvbW9lSGZXeTdqRXBzUE9HZkE3dlwva05MOXQrU2ZPMWI3RE1OQk09IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoibHFQUjRaX0ZGbEVzSW10cDk3dF9MUSIsInN1YiI6IjMyZTQwZGY3LTY2ODYtNDU5MC04ZDQ3LTlhNzZkMzVlMTU3NCIsImNvZ25pdG86Z3JvdXBzIjpbInVzLWVhc3QtMV83a0RHTGt0S3NfR29vZ2xlIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfN2tER0xrdEtzIiwiY29nbml0bzp1c2VybmFtZSI6Imdvb2dsZV8xMDc4OTM5MjcyMTM0ODI5MzMxMDEiLCJub25jZSI6IndSVVVMYk5Md0F2SW0xUEJEQVB6VWVNaXFPYkcwc05jcFFJMFhUend3el9hSXBlMWRVbEpDVUc1cndDeUNtXzRCUEFJWUxyeEFfdXFsR1BpcXl1VVVtdFpWcjV3TXdRcEhfU1hFNTF1TDNxWXltZlFwRDIyYTJadThSc0JUUDRqaXIxVGZQa1RjRVBlaDdxVjFNU0ZwTUVDNWdVVWExNDJhOWh2bnpMLUVJYyIsImF1ZCI6IjNzdGNnbWt2dTUxYzIzNDdiM3Ywc2o0aTVtIiwiaWRlbnRpdGllcyI6W3sidXNlcklkIjoiMTA3ODkzOTI3MjEzNDgyOTMzMTAxIiwicHJvdmlkZXJOYW1lIjoiR29vZ2xlIiwicHJvdmlkZXJUeXBlIjoiR29vZ2xlIiwiaXNzdWVyIjpudWxsLCJwcmltYXJ5IjoidHJ1ZSIsImRhdGVDcmVhdGVkIjoiMTY5NTU3NDc1MjU2NiJ9XSwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2OTU2Njk5NjcsImV4cCI6MTY5NTY3MzU2NywiaWF0IjoxNjk1NjY5OTY3LCJqdGkiOiI3ZTg4MTNmNy1mMzhhLTRjNWEtODQyNS02MTM5YTRmN2M4NDgiLCJlbWFpbCI6ImphbnRvbmlvY29ycmFsZmllc3Rhc0BnbWFpbC5jb20ifQ.Mc3IOiqGAV057BzykpCx-FEfrrdWK4CEWCbywz8lk2QxUOAc0YL1I55if5PtsTAIfP6LjZ5qjBbL7ohy8W-Pe1fNYyXLFBKIjDOvTjrEq1zOnF4SxmcgAg5jh95OM86wO4EITb-_Q-RRrq1B-nG6jYiIe5yF10KnRTexEcVadt0yISEXu2aUUvUTCRuLxcIvE3yoMrBL8fYzI5Sr3cFsOWVTiKf32swc4xg3_NZUUgjVQ-L2y9wC5-K-t47AaCQHhl2XDvfQaVOylXRpShRRfm5tthke25x4LAZvTsy2UxmJNR_jrV21rKRt4jdwvSSEjIoWTOpGDMbOtcpBMDwCwQ";
  const region = "us-east-1";

  const input = {                     // DescribeIdentityPoolInput
    IdentityPoolId: identityPoolId,   // required


    // Configuramos logins si queremos usar un usuario autenticado
    Logins: {
      // Formato ProviderName = cognito-idp.<region>.amazonaws.com/<userPoolId>
      [`cognito-idp.${region}.amazonaws.com/${userPoolId}`]: idToken,
    }

  };

  const command = new GetIdCommand(input);

  try {
    return response = await cognitoClient.send(command);

  } catch (error) {
    console.error("Error en createIdentityId: ", error);
  }
}

// response = await createIdentityId("us-east-1:99d537fb-8191-46d4-bfaa-ba79f444ffe9");
// console.log('Esta es la response = ' , response);




// Obtenemos un Open Id token a partir de un identity Id (en el identity pool tiene que estar 
// activado el flujo básico)
// No requiere permisos de IAM, es un método público de la API
import { GetOpenIdTokenCommand    } from "@aws-sdk/client-cognito-identity"; 
// import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity"; // ES Modules import


const getOpenIdToken = async ( identityId ) => {

  const cognitoClient = new CognitoIdentityClient({
    region: "us-east-1", 
    // credentials: credentials,
  });

  // const userPoolId  = "us-east-1_7kDGLktKs";
  // const idToken = "eyJraWQiOiJYa3YyaFwvbW9lSGZXeTdqRXBzUE9HZkE3dlwva05MOXQrU2ZPMWI3RE1OQk09IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiU2VLUEZjaFVUakc3ZmJMWEs0UDVGdyIsInN1YiI6IjMyZTQwZGY3LTY2ODYtNDU5MC04ZDQ3LTlhNzZkMzVlMTU3NCIsImNvZ25pdG86Z3JvdXBzIjpbInVzLWVhc3QtMV83a0RHTGt0S3NfR29vZ2xlIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfN2tER0xrdEtzIiwiY29nbml0bzp1c2VybmFtZSI6Imdvb2dsZV8xMDc4OTM5MjcyMTM0ODI5MzMxMDEiLCJhdWQiOiIzc3RjZ21rdnU1MWMyMzQ3YjN2MHNqNGk1bSIsImlkZW50aXRpZXMiOlt7InVzZXJJZCI6IjEwNzg5MzkyNzIxMzQ4MjkzMzEwMSIsInByb3ZpZGVyTmFtZSI6Ikdvb2dsZSIsInByb3ZpZGVyVHlwZSI6Ikdvb2dsZSIsImlzc3VlciI6bnVsbCwicHJpbWFyeSI6InRydWUiLCJkYXRlQ3JlYXRlZCI6IjE2OTU1NzQ3NTI1NjYifV0sInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjk1NTc2MTU3LCJleHAiOjE2OTU1Nzk3NTcsImlhdCI6MTY5NTU3NjE1NywianRpIjoiODA5ODZmNGYtNWNjZC00MDQyLTljNmQtNDU1ODFmYjkzMmFhIiwiZW1haWwiOiJqYW50b25pb2NvcnJhbGZpZXN0YXNAZ21haWwuY29tIn0.MtOgqS0ThKjv_GUmB89Y-0-bSY0Cjf8t0TBDbvdqwTpKycqFh2G-hw9dT7_ErTjqbcVWiWcaLkDuAjkCU5V9IYFA50Wty5V2mY7SGPCRzkgeGEd6bFhU3V2--h_jN5A5-JweL7iw1Hpj0toyFwFv6L2K6YerIhxxoflOfNmXHHGmYVJ6dO70lALR9PzD0E2cntFB6s5RXJJS1RzIRbqWPTwrxOA4ItzPp0zOm-hRHerh3bSMyAx6nldZhci5Uh4iQp_xHZCncHnkgObJTlmBAZblcMrdZKhNY1QhuGT2nyNWYEevdbaNA57InwOCsYuQ4fG5TrdfxjM8C87lRB9BPw";
  // const region = "us-east-1";

  const input = {                     // DescribeIdentityPoolInput
    IdentityId: identityId,           // required

    // Configuramos logins si queremos usar un usuario autenticado
    // Logins: {
    //   // Formato ProviderName = cognito-idp.<region>.amazonaws.com/<userPoolId>
    //   // "cognito-idp.us-east-1.amazonaws.com/us-east-1_xxxxxxxxx": "ID token del usuario autenticado",
    //   [`cognito-idp.${region}.amazonaws.com/${userPoolId}`]: idToken,

    // }

  };

  const command = new GetOpenIdTokenCommand(input);

  try {
    return response = await cognitoClient.send(command);

  } catch (error) {
    console.error("Error en GetOpenIdTokenCommand: ", error);
  }
}

// response = await getOpenIdToken("us-east-1:9ced61d9-9ea6-4f27-a241-59914503bdfc");
// console.log('Esta es la response = ' , response);




// Obtenemos las credenciales a partir de un identity Id que hayamos creado por ejemplo con el método
// getId anterior. Además el identity pool asociado tiene que tener un rol de invitado (guest access) asignado 
// y también en la política de confianza del rol tiene que estar seleccionado el identity pool id.
// Por comodidad, hemos creado el rol "cognito-unauthenticated-for-testing-node-sdk-v3" para usuarios
// invitados (guest access). También podemos usar un usuario autenticado mediante su id token, y obtener
// las credenciales para que ese usuario acceda a un recurso de AWS, por ejemplo creando un rol para ese usuario
// autenticado en la configuración de nuestro identity pool.
// Podemos usar tanto el flujo clásico/básico (classic flow) como el mejorado (enhanced flow).
// No requiere permisos de IAM, es un método público de la API
import { GetCredentialsForIdentityCommand } from "@aws-sdk/client-cognito-identity"; 
// import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity"; // ES Modules import


const getCredentialsForIdentity = async ( identityId ) => {

  const cognitoClient = new CognitoIdentityClient({
    region: "us-east-1", 
    // credentials: credentials,
  });

  const userPoolId  = "us-east-1_7kDGLktKs";
  const idToken = "eyJraWQiOiJYa3YyaFwvbW9lSGZXeTdqRXBzUE9HZkE3dlwva05MOXQrU2ZPMWI3RE1OQk09IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoibHFQUjRaX0ZGbEVzSW10cDk3dF9MUSIsInN1YiI6IjMyZTQwZGY3LTY2ODYtNDU5MC04ZDQ3LTlhNzZkMzVlMTU3NCIsImNvZ25pdG86Z3JvdXBzIjpbInVzLWVhc3QtMV83a0RHTGt0S3NfR29vZ2xlIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfN2tER0xrdEtzIiwiY29nbml0bzp1c2VybmFtZSI6Imdvb2dsZV8xMDc4OTM5MjcyMTM0ODI5MzMxMDEiLCJub25jZSI6IndSVVVMYk5Md0F2SW0xUEJEQVB6VWVNaXFPYkcwc05jcFFJMFhUend3el9hSXBlMWRVbEpDVUc1cndDeUNtXzRCUEFJWUxyeEFfdXFsR1BpcXl1VVVtdFpWcjV3TXdRcEhfU1hFNTF1TDNxWXltZlFwRDIyYTJadThSc0JUUDRqaXIxVGZQa1RjRVBlaDdxVjFNU0ZwTUVDNWdVVWExNDJhOWh2bnpMLUVJYyIsImF1ZCI6IjNzdGNnbWt2dTUxYzIzNDdiM3Ywc2o0aTVtIiwiaWRlbnRpdGllcyI6W3sidXNlcklkIjoiMTA3ODkzOTI3MjEzNDgyOTMzMTAxIiwicHJvdmlkZXJOYW1lIjoiR29vZ2xlIiwicHJvdmlkZXJUeXBlIjoiR29vZ2xlIiwiaXNzdWVyIjpudWxsLCJwcmltYXJ5IjoidHJ1ZSIsImRhdGVDcmVhdGVkIjoiMTY5NTU3NDc1MjU2NiJ9XSwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2OTU2Njk5NjcsImV4cCI6MTY5NTY3MzU2NywiaWF0IjoxNjk1NjY5OTY3LCJqdGkiOiI3ZTg4MTNmNy1mMzhhLTRjNWEtODQyNS02MTM5YTRmN2M4NDgiLCJlbWFpbCI6ImphbnRvbmlvY29ycmFsZmllc3Rhc0BnbWFpbC5jb20ifQ.Mc3IOiqGAV057BzykpCx-FEfrrdWK4CEWCbywz8lk2QxUOAc0YL1I55if5PtsTAIfP6LjZ5qjBbL7ohy8W-Pe1fNYyXLFBKIjDOvTjrEq1zOnF4SxmcgAg5jh95OM86wO4EITb-_Q-RRrq1B-nG6jYiIe5yF10KnRTexEcVadt0yISEXu2aUUvUTCRuLxcIvE3yoMrBL8fYzI5Sr3cFsOWVTiKf32swc4xg3_NZUUgjVQ-L2y9wC5-K-t47AaCQHhl2XDvfQaVOylXRpShRRfm5tthke25x4LAZvTsy2UxmJNR_jrV21rKRt4jdwvSSEjIoWTOpGDMbOtcpBMDwCwQ";
  const region = "us-east-1";

  const input = {                     // DescribeIdentityPoolInput
    IdentityId: identityId,           // required

    // Configuramos logins si queremos recuperar las credenciales de un usuario autenticado
    Logins: {
      // Formato ProviderName = cognito-idp.<region>.amazonaws.com/<userPoolId>
      // "cognito-idp.us-east-1.amazonaws.com/us-east-1_xxxxxxxxx": "ID token del usuario autenticado",
      [`cognito-idp.${region}.amazonaws.com/${userPoolId}`]: idToken,

    }
  };

  const command = new GetCredentialsForIdentityCommand(input);

  try {
    return response = await cognitoClient.send(command);

  } catch (error) {
    console.error("Error en GetCredentialsForIdentityCommand : ", error);
  }
}

// Le pasamos un identity id de un teorico usuario (o identidad):
// response = await getCredentialsForIdentity("us-east-1:989195b7-f3b0-49f7-9614-8cdfb84bb7ea");
// console.log('Esta es la response = ' , response);



// Listamos las identidades de un identity pool
// Requiere permisos de IAM cómo mínimo de Developer Credentials, nosotros usaremos el AmazonCognitoPowerUser
import { ListIdentitiesCommand  } from "@aws-sdk/client-cognito-identity"; 
// import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity"; // ES Modules import


const listIdentitiesFromIdentityPool = async ( identityPoolId ) => {

  const cognitoClient = new CognitoIdentityClient({
    region: "us-east-1", 
    credentials: credentials,
  });

  const input = {                   // ListIdentitiesInput
    IdentityPoolId: identityPoolId, // required
    MaxResults: 10,                 // required (number)
  };

  const command = new ListIdentitiesCommand(input);

  try {
    return response = await cognitoClient.send(command);

  } catch (error) {
    console.error("Error en ListIdentitiesCommand  : ", error);
  }
}

// response = await listIdentitiesFromIdentityPool("us-east-1:99d537fb-8191-46d4-bfaa-ba79f444ffe9");
// console.log('Esta es la response = ' , response);



// Listamos todos los identity pools existentes en el sistema en la región especificada
// Requiere permisos de IAM cómo mínimo de Developer Credentials, nosotros usaremos el AmazonCognitoPowerUser
import { ListIdentityPoolsCommand } from "@aws-sdk/client-cognito-identity"; 
// import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity"; // ES Modules import


const listIdentiyPools = async () => {

  const cognitoClient = new CognitoIdentityClient({
    region: "us-east-1", 
    credentials: credentials,
  });

  const input = {         // ListIdentityPoolsInput
    MaxResults: 20        // required (number)
  };

  const command = new ListIdentityPoolsCommand(input);

  try {
    return response = await cognitoClient.send(command);

  } catch (error) {
    console.error("Error en ListIdentityPoolsCommand : ", error);
  }
}

// response = await listIdentiyPools();
// console.log('Esta es la response = ' , response);

