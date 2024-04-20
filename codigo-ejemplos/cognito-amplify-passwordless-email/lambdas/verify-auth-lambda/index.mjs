// Función lambda sintaxis módulos Node 20
export const handler = async (event) => {
    const expectedAnswer = event.request.privateChallengeParameters.secretLoginCode; 
    if (event.request.challengeAnswer === expectedAnswer) {
        event.response.answerCorrect = true;
    } else {
        event.response.answerCorrect = false;
    }

    // Return to Amazon Cognito
    return event;
};