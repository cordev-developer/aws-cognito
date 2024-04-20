const AmazonCognitoIdentity  = require('amazon-cognito-identity-js');
const AWS = require('aws-sdk/global');
const readlineSync = require('readline-sync');
const S3 = require('aws-sdk/clients/s3');
const fs = require('fs')




function registerUser() {
    let poolData = {
        UserPoolId: 'eu-west-3_jgYEmgpdK', 
        ClientId: '7947vdrsgrlf9994m68fiptk4k', 
    };

    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    let attributeList = [];
    
    let dataEmail = {
        Name: 'email',
        Value: 'davidcorralfiestas@gmail.com',
    };
    
    let dataPhoneNumber = {
        Name: 'phone_number',
        Value: '+34123456',
    };

    let customAttribute = {
        Name: 'custom:newCustomAttribute',
        Value: 'valueNewCustomAttribute',
    }

    let attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    let attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(
        dataPhoneNumber
    );
    
    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);
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



// Autenticar usuario que no tiene activado el MFA
function authenticateUser() {

    let poolData = {
        UserPoolId : 'eu-west-3_yA7KMAepn', 
        ClientId : '6s68nq6p3cqpimgnkg7df7tlar' 
    };
    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    let userData = {
        Username : 'jcorral', 
        Pool : userPool
    };
    
    let authenticationData = {
        Username : 'jcorral', 
        Password : 'Jcorral_2023#', 
    };
    
    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token = ' + result.getAccessToken().getJwtToken());
            console.log('id token = ' + result.getIdToken().getJwtToken());
            console.log('refresh token = ' + result.getRefreshToken().getToken());
            console.log('Authentication SUCCESS !!');
        },

        onFailure: function(err) {
            console.error(err);
        }
    });
}

// authenticateUser();



function confirmRegistration() {
    let poolData = {
        UserPoolId: 'eu-west-3_jgYEmgpdK', 
        ClientId: '7947vdrsgrlf9994m68fiptk4k', 
    };
    
    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    let userData = {
        Username: 'jcorral',
        Pool: userPool,
    };
    
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmRegistration('337557', true, function(err, result) {
        if (err) {
            console.error(err.message || JSON.stringify(err));
            return;
        }
        console.log('call result: ' + JSON.stringify(result));
    }); 
}

//confirmRegistration();



function resendConfirmationcode() {

    let poolData = {
        UserPoolId: 'eu-west-3_jgYEmgpdK', 
        ClientId: '7947vdrsgrlf9994m68fiptk4k', 
    };
    
    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    let userData = {
        Username: 'jcorral',
        Pool: userPool,
    };
    
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.resendConfirmationCode(function(err, result) {
        if (err) {
            console.error(err.message || JSON.stringify(err));
            return;
        }
        console.log('call result: ' + JSON.stringify(result));
    });
}

//resendConfirmationcode();



// Autenticar usuario con o sin MFA activado
function authenticateUserWithOrWithoutMFA() {
    
    let authenticationData = {
        Username: 'jcorral',
        Password: 'Jcorral_2023#',
    };

    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        authenticationData
    );

    let poolData = {
        UserPoolId: 'eu-west-3_hPvL8BCCg',      // Nuestro user pool id
        ClientId: '154uh7opi5cokmmkl4v3cqjka0', // Nuestro client id
    };

    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    let userData = {
        Username: 'jcorral',
        Pool: userPool,
    };

    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
            var accessToken = result.getAccessToken().getJwtToken();
            console.log('access token = ' + accessToken);
    
            AWS.config.region = 'eu-west-3';
    
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'eu-west-3:21ca3194-e60b-4252-a7ef-fcb1c2574a9b',       // Nuestro Identity Pool Id
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
                    // LLamar a algún servicio
                    console.log('Successfully logged without MFA!');
                    // getS3ListBuckets();
                    // getS3ListObjects();
                }
            });
        },
    
        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        },
        mfaRequired: function(codeDeliveryDetails) {

            // Leemos la entrada de teclado de forma síncrona
            const verificationCode = readlineSync.question('Introduce el codigo MFA: ');
            console.log(`Hola, este es tu codigo: ${verificationCode}!`);
            

            cognitoUser.sendMFACode(verificationCode, {
                onSuccess: function (result) {
                    console.log('Login with MFA and Session SUCCESS !! ');

                    AWS.config.region = 'eu-west-3';
            
                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId: 'eu-west-3:ed980434-0934-472d-a590-2321445e5d7b', 
                        Logins: {
                            // Cambiar la región y el User Pool Id (después del slash)
                            'cognito-idp.eu-west-3.amazonaws.com/eu-west-3_BWliNhp7k': result
                                .getIdToken()
                                .getJwtToken(),
                        },
                    });

                    AWS.config.credentials.refresh( error => {
                        if (error) {
                            console.error(error);

                        } else {
                            // Aquí podemos llamar a algún servicio
                            console.log('Successfully logged with MFA and session !');
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

// Este método hay que llamarlo en modo ejecución ("node ./entry.js") ya que en modo
// desarrollo ("nodemon ./entry.js") con nodemon no leerá bien la entrada de teclado.

// authenticateUserWithOrWithoutMFA();



function getUserAttributes() {

    let poolData = {
        UserPoolId : 'eu-west-3_yA7KMAepn', 
        ClientId : '6s68nq6p3cqpimgnkg7df7tlar' 
    };
    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    let userData = {
        Username : 'jcorral', 
        Pool : userPool
    };
    
    let authenticationData = {
        Username : 'jcorral', 
        Password : 'Jcorralf_2023#', 
    };
    
    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

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



function updateUserAttributes() {

    let poolData = {
        UserPoolId : 'eu-west-3_yA7KMAepn', 
        ClientId : '6s68nq6p3cqpimgnkg7df7tlar' 
    };
    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    let userData = {
        Username : 'jcorral', 
        Pool : userPool
    };
    
    let authenticationData = {
        Username : 'jcorral', 
        Password : 'Jcorralf_2023#', 
    };
    
    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    let attributeList = [];
    let attribute = {
        Name: 'nickname',
        Value: 'joe',
    };
    let attr = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
    
    attributeList.push(attr);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('Authentication SUCCESS !!');

            cognitoUser.updateAttributes(attributeList, function(err, result) {
                if (err) {
                    alert(err.message || JSON.stringify(err));
                    return;
                }
                console.log('call result: ' + result);
            });
        },

        onFailure: function(err) {
            console.error(err);
        }
    });
}

// updateUserAttributes();



function deleteUserAttributes() {

    let poolData = {
        UserPoolId : 'eu-west-3_yA7KMAepn', 
        ClientId : '6s68nq6p3cqpimgnkg7df7tlar'
    };
    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    let userData = {
        Username : 'jcorral', // your username here
        Pool : userPool
    };
    
    let authenticationData = {
        Username : 'jcorral', // your username here
        Password : 'Jcorralf_2023#', // your password here
    };
    
    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    let attributeList = [];  
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
                console.log('call result: ' + result);
            });
        },

        onFailure: function(err) {
            console.error(err);
        }
    });
}

//deleteUserAttributes();



function deleteUser() {
    let poolData = {
        UserPoolId : 'eu-west-3_yA7KMAepn', 
        ClientId : '6s68nq6p3cqpimgnkg7df7tlar' 
    };
    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    let userData = {
        Username : 'jcorral', 
        Pool : userPool
    };
    
    let authenticationData = {
        Username : 'jcorral', 
        Password : 'Jcorralf_2023#', 
    };
    
    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('Authentication SUCCESS !!');

            cognitoUser.deleteUser(function(err, result) {
                if (err) {
                    console.error(err.message || JSON.stringify(err));
                    return;
                }
                console.log('Usuario eliminado: ' + authenticationData.Username);
                console.log('call result: ' + result);
            });
        },

        onFailure: function(err) {
            console.error(err);
        }
    });
}

// deleteUser();



// Activa el MFA para un User Pool que tiene activado el MFA opcional.
// Primero se autentica al usuario, luego se selecciona el MFA y a partir de aquí
// luego para autenticarse el usuario debe hacerlo con el método authenticateUserWithMFA()
function enableMFA() {

    let poolData = {
        UserPoolId: 'eu-west-3_jgYEmgpdK', 
        ClientId: '7947vdrsgrlf9994m68fiptk4k', 
    };

    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    let userData = {
        Username : 'jcorral', 
        Pool : userPool
    };
    
    let authenticationData = {
        Username : 'jcorral', 
        Password : 'Jcorralf_2023#', 
    };
    
    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    let smsMfaSettings = {
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
                console.log('call result: ' + result);

            });
        },
        onFailure: function(err) {
            console.error(err);
        }
    });
}

// enableMFA();


// Renovar token para un user pool que no tenga el MFA activado.
function renewTokens() {

    let poolData = {
        UserPoolId : 'eu-west-3_yA7KMAepn', 
        ClientId : '6s68nq6p3cqpimgnkg7df7tlar'
    };

    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    let userData = {
        Username : 'jcorral', 
        Pool : userPool
    };
    
    let authenticationData = {
        Username : 'jcorral', 
        Password : 'Jcorralf_2023#', 
    };
    
    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);


    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('Authentication SUCCESS !!');
            console.log('Este es el id token  antiguo: ' + result.getIdToken().getJwtToken());
            
            cognitoUser.refreshSession(result.getRefreshToken(), (err, session) => {
                if (err) {
                    console.log(err);
                } else {

                    AWS.config.region = 'eu-west-3';
            
                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId: 'eu-west-3:ed980434-0934-472d-a590-2321445e5d7b', // Identity Pool Id
                        Logins: {
                            // Cambiar región y User Pool Id (después del slash)
                            // cognito-idp.<REGION>.amazonaws.com/<YOUR_USER_POOL_ID>
                            'cognito-idp.eu-west-3.amazonaws.com/eu-west-3_yA7KMAepn': session
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
    let poolData = {
        UserPoolId : 'eu-west-3_yA7KMAepn', 
        ClientId : '6s68nq6p3cqpimgnkg7df7tlar' 
    };
    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    let userData = {
        Username : 'jcorral', 
        Pool : userPool
    };
    
    let authenticationData = {
        Username : 'jcorral', 
        Password : 'Jcorralf_2023#', 
    };
    
    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('Authentication SUCCESS !!');

            cognitoUser.changePassword('Jcorral_2023#', 'Jcorralf_2023@', function(err, result) {
                if (err) {
                    console.error(err.message || JSON.stringify(err));
                    return;
                }
                console.log('call result: ' + result);
            });
        },

        onFailure: function(err) {
            console.error(err);
        }
    });
}

// changePassword();



function signOut() {

    let poolData = {
        UserPoolId : 'eu-west-3_yA7KMAepn', 
        ClientId : '6s68nq6p3cqpimgnkg7df7tlar' 
    };
    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    let userData = {
        Username : 'jcorral', 
        Pool : userPool
    };

    let authenticationData = {
        Username : 'jcorral', 
        Password : 'Jcorral_2023#', 
    };
    
    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('Authentication SUCCESS !!');

            setTimeout(() => {
                // Hacemos un signout de la aplicación

                // cognitoUser.signOut(error => {
                //     if (error) {
                //         console.error(error);

                //     } else {
                //         console.log("Application logout success !! ");
                //     }
                // });


                // Hacemos un signout global (invalida todos los tokens emitidos)
                cognitoUser.getSession((e,s)=> console.log(e || 'Session acquired' ));

                cognitoUser.globalSignOut(  {   
                    onFailure: e =>   console.error(e.message),
                    onSuccess: r =>   console.log('Global logout ' + r)  
                }); 
            }, 2000);
        },

        onFailure: function(err) {
            console.error(err);
        }
    });              
}

// signOut();



// Esta operación no puede ser ejecutada desde el navegador
// This operation can not be done from browser
function getS3ListBuckets() {
    const s3 = new AWS.S3();
    // const s3 = new AWS.S3({apiVersion: '2006-03-01'});
    
    s3.listBuckets(function(error, data) {
        if (error) {
            console.log("Error", error);
        } else {
            console.log("Success");
            data.Buckets.forEach(bucket => console.log("Nombre del bucket: " + bucket.Name));
        }
    });
}

// getS3ListBuckets();



function getS3ListObjects() {
    const s3 = new AWS.S3({ params: { Bucket: "jcorralbucketlegal" } });
    // const s3 = new AWS.S3({apiVersion: '2006-03-01'});
      
    s3.listObjects(function (error, data) {
        if (error) console.log("Ha habido un error !! = " + err.message);
        else {
          console.log("");
          console.log("Lista de objetos del bucket: ");
          console.log("");
          data.Contents.forEach((element) => {
            console.log(element.Key);
          });
        }
      });
}

// getS3ListObjects();



function getS3ObjectsFromBucket(fileName) {
    const s3 = new AWS.S3();
    // const s3 = new AWS.S3({apiVersion: '2006-03-01'});

    s3.getObject({ Bucket: "jcorralbucketlegal", Key: fileName },

      function (error, data) {
        if (error) {
          console.log("Fallo al recuperar el objeto: " + error);
        } else {
          console.log("Se han descargado " + data.ContentLength + " bytes" + " del objeto");
          fs.writeFileSync('./Mi_foto_local.jpg', data.Body);
        }
      }
    );
}

// getS3ObjectsFromBucket("Mi_foto.jpg");




