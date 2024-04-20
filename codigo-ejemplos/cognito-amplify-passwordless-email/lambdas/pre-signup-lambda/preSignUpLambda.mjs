export const handler = async (event) => {
    event.response.autoConfirmUser = true;
    event.response.autoVerifyEmail = true;

    // Return to Amazon Cognito
    return event;
};