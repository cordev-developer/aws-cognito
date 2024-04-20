
import { CognitoIdentityProviderClient, ListUsersCommand } from "@aws-sdk/client-cognito-identity-provider";

export const handler = async (event, context, callback) => {

    // Definimos el user pool id y filtramos por email
    const params = {
        UserPoolId: 'us-east-1_jPgO89Mt5',
        Filter: `email = "${event.request.userAttributes.email}"`
    };
    
    const client = new CognitoIdentityProviderClient();
    const listUsersCommand = new ListUsersCommand(params);
    

    try {
        
        const data = await client.send(listUsersCommand);
        
        if (data?.Users?.length > 0) {
                
            // Devolvemos error
            callback(new Error(" = Esta dirección de email está en uso !!"), event);
        
        } else {
            // Retornamos a Amazon Cognito
            callback(null, event);
            
        }  
        
    } catch (error) {
        // Gestionamos error
        console.error(error);
        
        return 400;
    }
};