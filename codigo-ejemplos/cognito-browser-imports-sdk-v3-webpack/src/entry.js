/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import {
    CreateUserPoolCommand,
    CognitoIdentityProviderClient,
    VerifiedAttributeType,
  } from "@aws-sdk/client-cognito-identity-provider";



  // Configura las credenciales para el cliente de Cognito Identity Provider
const credentials = {
    accessKeyId: "AKIA37XTGD7BSERGZB5T",
    secretAccessKey: "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",
};


const client = new CognitoIdentityProviderClient({ region: "us-east-1" , credentials });
var response;




// Creamos un grupo de usuarios o user pool
const createUserPool = async (poolName, configOverrides = {}) => {   

    const command = new CreateUserPoolCommand({
        PoolName: poolName,
        AutoVerifiedAttributes: [VerifiedAttributeType.EMAIL],
        Schema: [{ Name: "email", Required: true }],
        UsernameConfiguration: { CaseSensitive: false },
        ...configOverrides,
    });

    return client.send(command);
};

// try {
//     response = await createUserPool("pool-testing-1-v3");
// } catch (err) {
//     console.log("No se ha ejecutado el await correctamente, este el error = ", err);
// }
// console.log("Esta es la response = ", response);




// Creamos un cliente de aplicación en el grupo de usuarios o user pool anterior
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
  
    return client.send(command);
};

// try {
//     response = await createUserPoolClient("application-client", "us-east-1_5PMZJYHL1");
// } catch (err) {
//     console.log("No se ha ejecutado el await correctamente, este el error = ", err);
// }
// console.log("Esta es la response = ", response);




// Configuramos MFA mediante token de software en un grupo de usuarios o user pool
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

    return client.send(command);
};

// try {
//     response = await setUserPoolMfaConfig("us-east-1_FwIRWIYbb");
// } catch (err) {
//     console.log("No se ha ejecutado el await correctamente, este el error = ", err);
// }
// console.log("Esta es la response = ", response);




// Eliminamos un grupo de usuarios o user pool
import {
    DeleteUserPoolCommand,
} from "@aws-sdk/client-cognito-identity-provider";


const deleteUserPool = async (poolId) => {

    const command = new DeleteUserPoolCommand({
        UserPoolId: poolId,
    });

    return client.send(command);
};

// try {
//     response = await deleteUserPool("us-east-1_5PMZJYHL1");
// } catch (err) {
//     console.log("No se ha ejecutado el await correctamente, este el error = ", err);
// }
// console.log("Esta es la response = ", response);




// Realizamos un login o signUp de un usuario en un grupo de usuarios o user pool
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

    return client.send(command);
};

// try {
//     response = await signUp({clientId:"tu_client_id", username: "jgarcia", password: "Jcorral_2023#",
//                             email: "jgarcia@gmail.com"});
// } catch (err) {
//     console.log("No se ha ejecutado el await correctamente, este el error = ", err);
// }
// console.log("Esta es la response = ", response);




// Confirmamos registro o sigup enviando el código de confirmación al email del usuario
import {
    ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const confirmSignUp = async ({ clientId, username, code }) => {

const command = new ConfirmSignUpCommand({
    ClientId: clientId,
    Username: username,
    ConfirmationCode: code,
});

    return client.send(command);
};

// try {
//     response = await confirmSignUp({ clientId: "tu_client_id", username: "jgarcia", code: "100561"});
// } catch (err) {
//     console.log("No se ha ejecutado el await correctamente, este el error = ", err);
// }
// console.log("Esta es la response = ", response);




// Eliminar usuario mediante un token de acceso
// OJO !! al comando de borrar, el token tiene que tener el scope "aws.cognito.signin.user.admin"
// es decir, tenemos que configurar ese permiso en Cognito para el usuario que queremos borrar.
import {
    DeleteUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const deleteUserCommand = async (access_token) => {

const command = new DeleteUserCommand({
        AccessToken: access_token,
    });

    return client.send(command);
};

// try {
//     response = await deleteUserCommand("eyJraWQiOiJJSWZpXC9GQnVDamxMc095RFVYXC9IS3BKT1JGSlpZRytKOXFTZXBIbEFKbEU9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJiZjIwMmFlYy05N2ZjLTQzNjQtYjZmNy1mN2FhZTAwNzRlZmIiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIG9wZW5pZCBlbWFpbCIsImF1dGhfdGltZSI6MTY4NTA0NTgzNCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfRndJUldJWWJiIiwiZXhwIjoxNjg1MDQ5NDM0LCJpYXQiOjE2ODUwNDU4MzQsInZlcnNpb24iOjIsImp0aSI6ImM3ZWI3YzRkLTAxYWQtNDQwZi1hNmRlLWFmNWZkZTdjZGNkZSIsImNsaWVudF9pZCI6IjVtb2NnY2VkbmYxaGJtNG5sdGZsajVpbGNmIiwidXNlcm5hbWUiOiJqY29ycmFsZiJ9.qM8_7hO9kuhGbiIVvVdF1BjZLb5n54_sVhZrOHyNWOz7diNqH10_kdaIp2o36_c77J-bL-Zy50HavnNm-9Z6i7HGbHTbaPd04Q21fP8i-aRJwtgNZdc3KOsCsfb0saG3YlfAaCfP7pHKnGiFzXzN7tce--Ru7HJfJPZEfrPFd8mGuwrei3IPiMtHaMudk9US1SF0ZwIs62-Vmd-Bg0sKT9THIb7jf1oS9mb3Nv5Uwvjq1aSsGoUTS9nfpqSywF6q33F1LuAlHd4xlN9rlzc-ZM1U6jvBw7TMQXidc26ikndoAyUi2RhwOFD1nZykildpBgRV-cnsYuvH2y5cyDux_A");
// } catch (err) {
//     console.log("No se ha ejecutado el await correctamente, este el error = ", err);
// }
// console.log("Esta es la response = ", response);

