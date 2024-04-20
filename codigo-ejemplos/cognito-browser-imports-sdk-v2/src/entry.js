import {
	CognitoUserPool,
	CognitoUserAttribute,
    AuthenticationDetails,
	CognitoUser,
    CookieStorage
} from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk/global';
import S3 from 'aws-sdk/clients/s3';
import Cookies from 'js-cookie';
import './styles/main.css';


// Para registrar un usuario los atributos tienen que existir,
// por ejemplo si el email y el phone number están requeridos, entonces
// hay que declaralos y pasarlos a la función de registro. En el caso
// del atributo custom es opcional. 

function registerUser() {

    // User Pool with required SMS MFA registration
    const poolData = {
        UserPoolId: 'eu-west-3_FqO00slL3', 
        ClientId: '40uee063gp28cs2jbbp27s22hf', 
    };

    // User Pool without required MFA
    // const poolData = {
    //     UserPoolId: 'eu-west-3_hPvL8BCCg', 
    //     ClientId: '154uh7opi5cokmmkl4v3cqjka0',
    // };

    const userPool = new CognitoUserPool(poolData);
    
    const attributeList = [];
    
    const dataEmail = {
        Name: 'email',
        Value: 'jcorral@gmail.com',
    };
    
    const dataPhoneNumber = {
        Name: 'phone_number',
        Value: '+34615010426',
    };

    const customAttribute = {
        Name: 'custom:level',
        Value: 'senior',
    }

    const attributeEmail = new CognitoUserAttribute(dataEmail);
    const attributePhoneNumber = new CognitoUserAttribute(
        dataPhoneNumber
    );
    
    // Estos atributos si están requeridos en el User Pool tenemos que incluirlos, sino 
    // no se registrará el usuario.
    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);

    // El custom attribute lo podemos incluir o no.
    attributeList.push(customAttribute);
    
    userPool.signUp('jcorral', 'Jcorral_2023#', attributeList, null, function(err,result) {
        if (err) {
            console.error(err.message || JSON.stringify(err));
            return;
        }
        let cognitoUser = result.user;
        console.log('User name is ' + cognitoUser.getUsername());
    });
}

// registerUser();




// Autenticar usuario que no tiene activado el MFA. La cuenta del usuario tiene que estar confirmada.
function authenticateUser() {

    // User Pool without required MFA
    // const poolData = {
    //     UserPoolId : 'eu-west-3_hPvL8BCCg', 
    //     ClientId : '154uh7opi5cokmmkl4v3cqjka0' 
    // };

    // User Pool with required SMS MFA registration
    const poolData = {
        UserPoolId: 'eu-west-3_FqO00slL3', 
        ClientId: '40uee063gp28cs2jbbp27s22hf', 
    };

    const userPool = new CognitoUserPool(poolData);
    
    const userData = {
        Username : 'jcorral', 
        Pool : userPool
    };
    
    const authenticationData = {
        Username : 'jcorral', 
        Password : 'Jcorral_2023#', 
    };
    
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('Access token = ' + result.getAccessToken().getJwtToken());
            console.log('Id token = ' + result.getIdToken().getJwtToken());
            console.log('Refresh token = ' + result.getRefreshToken().getToken());
            console.log('Authentication SUCCESS !!');
        },

        onFailure: function(err) {
            console.error(err);
        }
    });
}

// authenticateUser();




// Confirmamos la cuenta de usuario.
// Usamos el user pool llamado "cognito-browser-imports-sdk-v2-with-required-mfa".
function confirmRegistration() {
    const poolData = {
        UserPoolId: 'eu-west-3_FqO00slL3', 
        ClientId: '40uee063gp28cs2jbbp27s22hf', 
    };
    
    const userPool = new CognitoUserPool(poolData);

    const userData = {
        Username: 'jcorral',
        Pool: userPool,
    };
    
    const cognitoUser = new CognitoUser(userData);

    // Aquí le tenemos que pasar el código de confirmación que nos llega al teléfono.
    cognitoUser.confirmRegistration('593542', true, function(err, result) {
        if (err) {
            console.error(err.message || JSON.stringify(err));
            return;
        }
        console.log('Call result: ' + JSON.stringify(result));
    }); 
}

// confirmRegistration();




// Reenvio del código de confirmación de la cuenta de usuario.
// Usamos el user pool llamado "cognito-browser-imports-sdk-v2-with-required-mfa".
function resendConfirmationcode() {

    const poolData = {
        UserPoolId: 'eu-west-3_FqO00slL3', 
        ClientId: '40uee063gp28cs2jbbp27s22hf', 
    };
    
    const userPool = new CognitoUserPool(poolData);

    const userData = {
        Username: 'jcorral',
        Pool: userPool,
    };
    
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.resendConfirmationCode(function(err, result) {
        if (err) {
            console.error(err.message || JSON.stringify(err));
            return;
        }
        console.log('Call result: ' + JSON.stringify(result));
    });
}

// resendConfirmationcode();




// Autenticar usuario con o sin MFA activado.
// Aquí vamos a usar el user pool llamado "cognito-browser-imports-sdk-v2-with-required-mfa",
// que tiene el MFA activado por SMS. Deberemos también crear un usuario y tener su cuenta confirmada.
function authenticateUserWithOrWithoutMFA() {
    
    const authenticationData = {
        Username: 'jcorral',
        Password: 'Jcorral_2023#',
    };

    const authenticationDetails = new AuthenticationDetails(
        authenticationData
    );

    // Este es el user pool que tiene activado el MFA por SMS.
    // const poolData = {
    //     UserPoolId: "eu-west-3_FqO00slL3", 
    //     ClientId: "40uee063gp28cs2jbbp27s22hf", 
    // };


    // Este es otro user pool que no tiene activado el MFA.
    // En mi zona es el user pool = cognito-browser-imports-sdk-v2-without-required-mfa
    const poolData = {
        UserPoolId: "eu-west-3_hPvL8BCCg", 
        ClientId: "154uh7opi5cokmmkl4v3cqjka0", 
    };

    const userPool = new CognitoUserPool(poolData);

    const userData = {
        Username: 'jcorral',
        Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
            const accessToken = result.getAccessToken().getJwtToken();
            console.log('Access token = ' + accessToken);
            console.log('Successfully logged without MFA!');

    
            // Definimos región Cognito
            AWS.config.region = 'eu-west-3';
    
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'eu-west-3:21ca3194-e60b-4252-a7ef-fcb1c2574a9b', 
                Logins: {
                    // Cambiar región y User Pool Id (después del slash)
                    // cognito-idp.<REGION>.amazonaws.com/<YOUR_USER_POOL_ID>
                    'cognito-idp.eu-west-3.amazonaws.com/eu-west-3_hPvL8BCCg': result
                        .getIdToken()
                        .getJwtToken(),
                },
            });
   
            AWS.config.credentials.refresh( error => {
                if (error) {
                    console.error(error);

                } else {
                    // Aquí podemos llamar a algún servicio una vez refrescadas las credenciales
                    console.log('Refresh de credenciales !');

                    // Definimos región S3
                    const s3 = new S3({ region: "us-east-1" });

                    const params = {
                        Bucket: "jcorralbucketlegal",
                    };
                                       
                
                    s3.listObjects(params, function (err, data) {
                        if (err) console.log("Ha habido un error !! = " + err.message);
                        else {
                          console.log("");
                          console.log("Lista de objetos del bucket = ");
                          console.log("");
                          data.Contents.forEach((element) => {
                                console.log(element.Key);
                          });
                        }
                    });
                }
            });
        },
    
        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        },

        mfaRequired: function(codeDeliveryDetails) {

            let verificationCode = prompt('Please input verification code', '');

            cognitoUser.sendMFACode(verificationCode, {
                onSuccess: function (result) {
                    console.log('Login with MFA and Session SUCCESS !! ');
                    
                    // Definimos region Cognito
                    AWS.config.region = 'eu-west-3';
            
                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        // Especificamos el Identity Pool Id, tiene que tener un rol de IAM asociado que le permita
                        // acceder a los recursos que queramos. En nuestro caso un bucket de S3 con permisos
                        // para listar y obtener objetos.
                        IdentityPoolId: 'eu-west-3:21ca3194-e60b-4252-a7ef-fcb1c2574a9b', 
                        Logins: {
                            // Cambiar región y User Pool Id (después del slash)
                            // cognito-idp.<REGION>.amazonaws.com/<YOUR_USER_POOL_ID>
                            'cognito-idp.eu-west-3.amazonaws.com/eu-west-3_FqO00slL3': result
                                .getIdToken()
                                .getJwtToken(),
                        },
                    });

                    AWS.config.credentials.refresh( error => {
                        if (error) {
                            console.error(error);

                        } else {
                            // Aquí podemos llamar a algún servicio una vez refrescadas las credenciales
                            console.log('Refresh de credenciales !');

                            // Definimos región S3
                            const s3 = new S3({ region: "us-east-1" });

                            const params = {
                                Bucket: "jcorralbucketlegal",
                            };
                                            
                        
                            s3.listObjects(params, function (err, data) {
                                if (err) console.log("Ha habido un error !! = " + err.message);
                                else {
                                console.log("");
                                console.log("Lista de objetos del bucket = ");
                                console.log("");
                                data.Contents.forEach((element) => {
                                        console.log(element.Key);
                                });
                                }
                            });
                        }
                    });
                },

                onFailure: function(err) {
                    console.error(err);
                }
            });                
        }
    });
}

// authenticateUserWithOrWithoutMFA();




// Activa el MFA para un User Pool que tiene activado el MFA opcional.
// Después de ejecutar este método, el usuario deberá autenticarse con el MFA
// a través del método authenticateUserWithOrWithoutMFA().
// De esta manera podriamos configurar un MFA diferente para cada usuario (SMS o Authenticator App)
function enableMFA() {

    const poolData = {
        UserPoolId: 'eu-west-3_xDJKXwoPa',      // Nuestro user pool id
        ClientId: '3momcip75qn2hfdia4jdeerp6b', // Nuestro client id
    };

    const userPool = new CognitoUserPool(poolData);
    
    const userData = {
        Username : 'jcorral', 
        Pool : userPool
    };
    
    const authenticationData = {
        Username : 'jcorral', 
        Password : 'Jcorral_2023#', 
    };
    
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const cognitoUser = new CognitoUser(userData);

    const smsMfaSettings = {
        PreferredMfa: true,
        Enabled: true,
    };
    

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('Authentication SUCCESS !!');

            cognitoUser.setUserMfaPreference(smsMfaSettings, null, function(err, result) {
                if (err) {
                    console.log(err.message || JSON.stringify(err));
                    return;
                }
                console.log('Call result: ' + result);

            });
        },
        onFailure: function(err) {
            console.error(err);
        }
    });
}

// enableMFA();



// Obtener atributos de un usuario
function getUserAttributes() {

    const poolData = {
        UserPoolId : 'eu-west-3_hPvL8BCCg', 
        ClientId : '154uh7opi5cokmmkl4v3cqjka0' 
    };

    const userPool = new CognitoUserPool(poolData);
    
    const userData = {
        Username : 'jcorral', 
        Pool : userPool
    };
    
    const authenticationData = {
        Username : 'jcorral', 
        Password : 'Jcorral_2023#', 
    };
    
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('Authentication SUCCESS !!');

            cognitoUser.getUserAttributes(function(err, result) {
                if (err) {
                    console.error(err.message || JSON.stringify(err));
                    return;
                }
                for (let i = 0; i < result.length; i++) {
                    console.log(
                        'attribute ' + result[i].getName() + ' has value ' + result[i].getValue()
                    );
                }
            });
        },

        onFailure: function(err) {
            console.error(err);
        }
    });
}

// getUserAttributes();



// Actualizar atributos de un usuario.
function updateUserAttributes() {

    const poolData = {
        UserPoolId : 'eu-west-3_hPvL8BCCg', 
        ClientId : '154uh7opi5cokmmkl4v3cqjka0' 
    };

    const userPool = new CognitoUserPool(poolData);
    
    const userData = {
        Username : 'jcorral', 
        Pool : userPool
    };
    
    const authenticationData = {
        Username : 'jcorral', 
        Password : 'Jcorral_2023#', 
    };
    
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const cognitoUser = new CognitoUser(userData);

    const attributeList = [];
    const attribute = {
        Name: 'nickname',
        Value: 'joe',
    };
    const attr = new CognitoUserAttribute(attribute);
    
    attributeList.push(attr);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('Authentication SUCCESS !!');

            cognitoUser.updateAttributes(attributeList, function(err, result) {
                if (err) {
                    alert(err.message || JSON.stringify(err));
                    return;
                }
                console.log('Call result: ' + result);
            });
        },

        onFailure: function(err) {
            console.error(err);
        }
    });
}

// updateUserAttributes();



// Eliminar atributos de un usuario.
function deleteUserAttributes() {

    const poolData = {
        UserPoolId : 'eu-west-3_hPvL8BCCg', 
        ClientId : '154uh7opi5cokmmkl4v3cqjka0' 
    };

    const userPool = new CognitoUserPool(poolData);
    
    const userData = {
        Username : 'jcorral', 
        Pool : userPool
    };
    
    const authenticationData = {
        Username : 'jcorral', 
        Password : 'Jcorral_2023#', 
    };
    
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const cognitoUser = new CognitoUser(userData);

    const attributeList = [];  
    attributeList.push('nickname');
    // attributeList.push('custom:customAttributeName');

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('Authentication SUCCESS !!');

            cognitoUser.deleteAttributes(attributeList, function(err, result) {
                if (err) {
                    alert(err.message || JSON.stringify(err));
                    return;
                }
                console.log('Call result: ' + result);
            });
        },

        onFailure: function(err) {
            console.error(err);
        }
    });
}

// deleteUserAttributes();




function deleteUser() {

    const poolData = {
        UserPoolId : 'eu-west-3_hPvL8BCCg',
        ClientId : '154uh7opi5cokmmkl4v3cqjka0' 
    };

    const userPool = new CognitoUserPool(poolData);
    
    const userData = {
        Username : 'jcorral', 
        Pool : userPool
    };
    
    const authenticationData = {
        Username : 'jcorral', 
        Password : 'Jcorral_2023#', 
    };
    
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('Authentication SUCCESS !!');

            cognitoUser.deleteUser(function(err, result) {
                if (err) {
                    console.error(err.message || JSON.stringify(err));
                    return;
                }
                console.log('Usuario eliminado: ' + authenticationData.Username);
                console.log('Call result: ' + result);
            });
        },

        onFailure: function(err) {
            console.error(err);
        }
    });
}

// deleteUser();




// Renovar token para un user pool que no tenga el MFA activado.
function renewTokens() {

    const poolData = {
        UserPoolId : 'eu-west-3_hPvL8BCCg',
        ClientId : '154uh7opi5cokmmkl4v3cqjka0' 
    };

    const userPool = new CognitoUserPool(poolData);
    
    const userData = {
        Username : 'jcorral',
        Pool : userPool
    };
    
    const authenticationData = {
        Username : 'jcorral', 
        Password : 'Jcorral_2023#', 
    };
    
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const cognitoUser = new CognitoUser(userData);


    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('Authentication SUCCESS !!');
            console.log('Este es el id token  antiguo: ' + result.getIdToken().getJwtToken());

            
            cognitoUser.refreshSession(result.getRefreshToken(), (err, session) => {
                if (err) {
                    console.log(err);
                } else {

                    // Definimos región Cognito
                    AWS.config.region = 'eu-west-3';
            

                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId: 'eu-west-3:21ca3194-e60b-4252-a7ef-fcb1c2574a9b', // Identity Pool Id
                        Logins: {
                            // Cambiar región y User Pool Id (después del slash)
                            // cognito-idp.<REGION>.amazonaws.com/<YOUR_USER_POOL_ID>
                            'cognito-idp.eu-west-3.amazonaws.com/eu-west-3_hPvL8BCCg': session
                                .getIdToken()
                                .getJwtToken(),
                        },
                    });

                    AWS.config.credentials.refresh(err => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('TOKEN SUCCESSFULLY UPDATED');
                            console.log('Este es el nuevo Id token: ' + session.getIdToken().getJwtToken());
                            console.log('Este es el nuevo Access token: ' + session.getAccessToken().getJwtToken());
                            console.log('Este es el nuevo Refresh token: ' + session.getRefreshToken().getToken());

                        }
                    });
                }
            });

        },
        onFailure: function(err) {
            console.error(err);
        }
    });
}

// renewTokens()




function changePassword() {

    const poolData = {
        UserPoolId : 'eu-west-3_hPvL8BCCg', 
        ClientId : '154uh7opi5cokmmkl4v3cqjka0' 
    };

    const userPool = new CognitoUserPool(poolData);
    
    const userData = {
        Username : 'jcorral', 
        Pool : userPool
    };
    
    const authenticationData = {
        Username : 'jcorral', 
        Password : 'Jcorral_2023#', 
    };
    
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('Authentication SUCCESS !!');

            cognitoUser.changePassword('Jcorral_2023#', 'Jcorral_2023@', function(err, result) {
                if (err) {
                    console.error(err.message || JSON.stringify(err));
                    return;
                }
                console.log('Call result: ' + result);
            });
        },

        onFailure: function(err) {
            console.error(err);
        }
    });
}

// changePassword();




function signOut() {

    const poolData = {
        UserPoolId : 'eu-west-3_hPvL8BCCg', 
        ClientId : '154uh7opi5cokmmkl4v3cqjka0' 
    };

    const userPool = new CognitoUserPool(poolData);
    
    const userData = {
        Username : 'jcorral', 
        Pool : userPool
    };

    const authenticationData = {
        Username : 'jcorral', 
        Password : 'Jcorral_2023#', 
    };
    
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('Authentication SUCCESS !!');

            setTimeout(() => {
                // Hacemos un signout de la aplicación

                cognitoUser.signOut(error => {
                    if (error) {
                        console.error(error);

                    } else {
                        console.log("Application logout success !! ");
                    }
                });


                // Hacemos un signout global (invalida todos los tokens emitidos)
                // cognitoUser.getSession((e,s)=> console.log(e || 'Session acquired' ));

                // cognitoUser.globalSignOut(  {   
                //     onFailure: e =>   console.error(e.message),
                //     onSuccess: r =>   console.log('Global logout ' + r)  
                // }); 
                
            }, 2000);
        },

        onFailure: function(err) {
            console.error(err);
        }
    });              
}

// signOut();




function cookiesStorage() {

    const poolData = {
        UserPoolId : 'eu-west-3_hPvL8BCCg', 
        ClientId : '154uh7opi5cokmmkl4v3cqjka0', 
        Storage: new CookieStorage({domain: "localhost", secure: true, sameSite: 'lax' })
    };
   
    const userPool = new CognitoUserPool(poolData);
   
    const user = new CognitoUser({
        Username: 'jcorral',
        Pool: userPool,
        Storage: new CookieStorage({domain: "localhost", secure: true, sameSite: 'lax' })
    });

    const authenticationData = {
        Username : 'jcorral',
        Password : 'Jcorral_2023#', 
    };
    
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    user.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('Access token = ' + result.getAccessToken().getJwtToken());

            // La parte central del identificador de las cookies es el Client Id
            // 'CognitoIdentityServiceProvider.<clientId>.LastAuthUser'
            console.log("Esta es la cookie del usuario = " +
                Cookies.get('CognitoIdentityServiceProvider.154uh7opi5cokmmkl4v3cqjka0.LastAuthUser')   
            );

            // 'CognitoIdentityServiceProvider.<clientId>.<username>.idToken'
            console.log("Esta es la cookie del id token = " +
                Cookies.get('CognitoIdentityServiceProvider.154uh7opi5cokmmkl4v3cqjka0.jcorral.idToken')
            );

            // 'CognitoIdentityServiceProvider.<clientId>.<username>.accessToken'
            console.log("Esta es la cookie del access token = " +
                Cookies.get('CognitoIdentityServiceProvider.154uh7opi5cokmmkl4v3cqjka0.jcorral.accessToken')
            );
        },

        onFailure: function(err) {
            console.error(err);
        }
    });
}

// cookiesStorage();



// Para probar este ejemplo necesitamos por ejemplo un user pool con MFA habilitado mediante App de authenticación,
// y configuramos el flujo implicit grant. Cuando creemos el usuario en el user pool, la primera vez
// que se autentique nos pedirá que cambiemos el password y también que escaneemos el QR code con la app de authenticación
// y así obtener el código TOTP que nos pedirá para autenticarnos. 
function authenticatingWithTOTP() {
    const authenticationData = {
        Username: 'jcorral',
        Password: 'Jcorral_2023#',
    };

    const authenticationDetails = new AuthenticationDetails(
        authenticationData
    );

    const poolData = {
        UserPoolId: 'eu-west-3_JbYKK4ZQg', 
        ClientId: 'fnp514krunnbcolfclpba6r3g', 
    };

    const userPool = new CognitoUserPool(poolData);
    const userData = {
        Username: 'jcorral',
        Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
            let accessToken = result.getAccessToken().getJwtToken();
            console.log('Authenticacion success. Access token = ' + accessToken);
        },
    
        onFailure: function(err) {
            console.error(err.message || JSON.stringify(err));
        },
    
        mfaSetup: function(challengeName, challengeParameters) {
            cognitoUser.associateSoftwareToken(this);
            console.log("Estamos en mfaSetup");
        },
    
        associateSecretCode: function(secretCode) {
            let challengeAnswer = prompt('Please input the TOTP code.', '');
            console.log("Estamos en associateSecretCode");

            cognitoUser.verifySoftwareToken(challengeAnswer, 'My TOTP device', this);
        },
    
        selectMFAType: function(challengeName, challengeParameters) {
            let mfaType = prompt('Please select the MFA method.', ''); // Valores válidos son "SMS_MFA", "SOFTWARE_TOKEN_MFA"
            cognitoUser.sendMFASelectionAnswer(mfaType, this);
        },
    
        totpRequired: function(secretCode) {
            let challengeAnswer = prompt('Please input the TOTP code.', '');
            console.log("Estamos en totpRequired");

            cognitoUser.sendMFACode(challengeAnswer, {
                    onSuccess: function(result) {
                        console.log("Authentication Success !!");
                        console.log("Este es el ID token = " + result.getIdToken().getJwtToken());
                        console.log("Este es el ACCESS token = " + result.getAccessToken().getJwtToken());
                        console.log("Este es el REFRESH token = " + result.getRefreshToken().getToken());
                    },
                    onFailure: function(err) {
                        alert("Error en código TOTP !!");
                    }
            }, 'SOFTWARE_TOKEN_MFA');
        },
    
        mfaRequired: function(codeDeliveryDetails) {
            let verificationCode = prompt('Please input verification code', '');
            cognitoUser.sendMFACode(verificationCode, this);
        },
    });
}

// authenticatingWithTOTP();





