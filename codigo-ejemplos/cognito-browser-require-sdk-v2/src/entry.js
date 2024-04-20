const AmazonCognitoIdentity  = require('amazon-cognito-identity-js');
const AWS = require('aws-sdk/global');



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
        Password : 'Jcorral_2022#', 
    };
    
    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token = ' + result.getAccessToken().getJwtToken());
        },

        onFailure: function(err) {
            alert(err);
        },
        mfaRequired: function(codeDeliveryDetails) {
            var verificationCode = prompt('Please input verification code', '');
            cognitoUser.sendMFACode(verificationCode, {
                onSuccess: function (result) {
                    console.log('Login with MFA SUCCESS !! ');
                },
                onFailure: function(err) {
                    alert(err);
                }
            });                
        }
    });
}

// authenticateUser();



function registerUser() {
    let poolData = {
        UserPoolId: 'eu-west-3_jgYEmgpdK',
        ClientId: '7947vdrsgrlf9994m68fiptk4k', 
    };
    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    let attributeList = [];
    
    let dataEmail = {
        Name: 'email',
        Value: 'jcorral@gmail.com',
    };
    
    let dataPhoneNumber = {
        Name: 'phone_number',
        Value: '+34123456789',
    };
    let attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    let attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(
        dataPhoneNumber
    );
    
    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);
    
    userPool.signUp('jcorral', 'Jcorral_2022#', attributeList, null, function(err,result) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        let cognitoUser = result.user;
        console.log('User name is ' + cognitoUser.getUsername());
    });
}

//registerUser();



function authenticateUserWithSession() {
    
    let authenticationData = {
        Username: 'jcorral',
        Password: 'Jcorral_2022#',
    };

    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        authenticationData
    );

    let poolData = {
        UserPoolId: 'eu-west-3_yA7KMAepn', 
        ClientId: '6s68nq6p3cqpimgnkg7df7tlar', 
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
    
            AWS.config.region = 'eu-west-3';
    
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'eu-west-3:ed980434-0934-472d-a590-2321445e5d7b',
                Logins: {
                    // Cambiar región y User Pool Id después del slash.
                    'cognito-idp.eu-west-3.amazonaws.com/eu-west-3_yA7KMAepn': result
                        .getIdToken()
                        .getJwtToken(),
                },
            });
   
            AWS.config.credentials.refresh( error => {
                if (error) {
                    console.error(error);

                } else {
                    // Aquí podemos llamar a algún servicio una vez las credenciales se han refrescado:
                    console.log('Successfully logged !');
                    //getS3BucketObjects();
                }
            });
        },
    
        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        },
    });
}

//authenticateUserWithSession();



function getUserAttributes() {
    let poolData = {
        UserPoolId: 'eu-west-3_yA7KMAepn', // Your user pool id here
        ClientId: '6s68nq6p3cqpimgnkg7df7tlar', // Your client id here
    };

    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    let userData = {
        Username: 'jcorral',
        Pool: userPool,
    };

    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.getUserAttributes(function(err, result) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            console.log("Estamos dentro del error !!");
            return;
        }
        for (i = 0; i < result.length; i++) {
            console.log(
                'attribute ' + result[i].getName() + ' has value ' + result[i].getValue()
            );
        }
    });
}

// getUserAttributes();


function authenticatingWithTOTP() {
    let authenticationData = {
        Username: 'jcorral',
        Password: 'Jcorral_2022#',
    };

    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        authenticationData
    );

    let poolData = {
        UserPoolId: 'eu-west-3_4pygGUNcV', 
        ClientId: '20g2ohm8t2k96g47lmtl6aaipg', 
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
        },
    
        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        },
    
        mfaSetup: function(challengeName, challengeParameters) {
            cognitoUser.associateSoftwareToken(this);
        },
    
        associateSecretCode: function(secretCode) {
            var challengeAnswer = prompt('Please input the TOTP code.', '');

            cognitoUser.verifySoftwareToken(challengeAnswer, 'My TOTP device', this);
        },
    
        selectMFAType: function(challengeName, challengeParameters) {
            var mfaType = prompt('Please select the MFA method.', ''); // valores válidos son "SMS_MFA", "SOFTWARE_TOKEN_MFA"
            cognitoUser.sendMFASelectionAnswer(mfaType, this);
        },
    
        totpRequired: function(secretCode) {
            var challengeAnswer = prompt('Please input the TOTP code.', '');

            cognitoUser.sendMFACode(challengeAnswer, {
                    onSuccess: function(result) {
                        console.log("Success !!");
                        console.log("Este es el id token = " + result.getIdToken().getJwtToken());
                    },
                    onFailure: function(err) {
                        alert("Error en código TOTP !!");
                    }
            }, 'SOFTWARE_TOKEN_MFA');
        },
    
        mfaRequired: function(codeDeliveryDetails) {
            var verificationCode = prompt('Please input verification code', '');
            cognitoUser.sendMFACode(verificationCode, this);
        },
    });
}

// authenticatingWithTOTP();



