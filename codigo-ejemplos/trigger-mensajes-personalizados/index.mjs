export const handler = async (event, context, callback) => {
    // Por si queremos especificar el user pool id
    if(event.userPoolId === "us-east-1_jPgO89Mt5") {
        
        // Identify why was this function invoked
        if(event.triggerSource === "CustomMessage_SignUp") {
            // Ensure that your message contains event.request.codeParameter. This is the placeholder for code that will be sent
            
            // event.response.smsMessage = "Welcome to the service. Your confirmation code is " + event.request.codeParameter;
            
            event.response.emailSubject = "Bienvenido al servicio";
            event.response.emailMessage = "Gracias por registrarse. " + event.request.codeParameter + " es tu código de verificación";
        }
    }
    // Customizar mensajes para otros grupos de usuarios ...

    // Return to Amazon Cognito
    callback(null, event);
};