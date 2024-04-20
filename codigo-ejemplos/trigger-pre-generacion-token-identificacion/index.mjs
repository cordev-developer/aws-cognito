export const handler = async (event, context, callback) => {
    
    event.response = {
        "claimsOverrideDetails": {
            "claimsToAddOrOverride": {
                "attribute_key_1": "attribute_value_1",
                "attribute_key_2": "attribute_value_2",
                "custom:hola": "hola soy el mensaje de hola"
            },
            "claimsToSuppress": ["email"],
            //"claimsToSuppress": ["custom:hola"],


        }
    };

    // Return to Amazon Cognito
    callback(null, event);
};



