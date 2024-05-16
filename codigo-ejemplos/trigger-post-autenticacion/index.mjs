// Función lambda post-autenticación (sintaxis módulos Node 18)
export const handler = async (event, context, callback) => {
    if (event.callerContext.clientId === "15ninpkcokkg15t163fb0gsbbd") {
        var error = new Error("Cannot authenticate users from this user pool app client");

        // Return error to Amazon Cognito
        callback(error, event);
    }

    // Return to Amazon Cognito
    callback(null, event);
};


// Test event JSON
// {
//     "callerContext": {
//       "clientId": "15ninpkcokkg15t163fb0gsbbd"
//     },
//     "response": {}
// }