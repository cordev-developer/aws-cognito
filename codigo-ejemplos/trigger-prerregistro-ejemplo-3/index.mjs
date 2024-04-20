
// Función lambda prerregistro ejemplo 3 (sintaxis módulos Node 18)
export const handler = async (event, context, callback) => {

    // Impose a condition that the minimum length of the username is 5 is imposed on all user pools.
    if (event.userName.length < 5) {
        var error = new Error("Cannot register users with username less than the minimum length of 5");
        // Return error to Amazon Cognito
        callback(error, event);
    }
    // Return to Amazon Cognito
    callback(null, event);
};

// Test event JSON
// {
//     "userName": "rroe",
//     "response": {}
// }