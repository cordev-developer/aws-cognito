// Función lambda prerregistro (sintaxis módulos Node 18)
export const handler = async (event, context, callback) => {

    // Confirm the user
    event.response.autoConfirmUser = true;

    // Split the email address so we can compare domains
    var address = event.request.userAttributes.email.split("@");

    // Set the email as verified if it's in the request
    if (event.request.userAttributes.hasOwnProperty("email")) {
        event.response.autoVerifyEmail = true;
    }

    // Set the phone number as verified if it's in the request
    if (event.request.userAttributes.hasOwnProperty("phone_number")) {
        event.response.autoVerifyPhone = true;
    }  

    // Return to Amazon Cognito
    callback(null, event);
};

// Test event JSON
// {
//   "request": {
//     "userAttributes": {
//       "email": "testuser@example.com",
//       "phone_number": "123456789"
//     }
//   },
//   "response": {}
// }