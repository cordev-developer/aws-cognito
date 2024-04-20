
// Función lambda preregistro (sintaxis módulos Node 18)
export const handler = async (event, context, callback) => {

    // Set the user pool autoConfirmUser flag after validating the email domain
    event.response.autoConfirmUser = false;

    // Split the email address so we can compare domains
    var address = event.request.userAttributes.email.split("@");
    
    // This example uses a custom attribute "custom:domain"
    if (event.request.userAttributes.hasOwnProperty("custom:domain")) {
        if ( event.request.userAttributes['custom:domain'] === address[1]) {

            event.response.autoConfirmUser = true;
            event.response.autoVerifyEmail = true;
        }
    }
    
    // Set the phone number as verified if it's in the request
    if (event.request.userAttributes.hasOwnProperty("phone_number")) {
        event.response.autoVerifyPhone = true;
    }  

    // Return to Amazon Cognito
    callback(null, event);
};

// Event JSON
// {
//   "request": {
//     "userAttributes": {
//       "email": "testuser@example.com",
//       "custom:domain": "example.com",
//       "phone_number": "123456789"
//     }
//   },
//   "response": {}
// }