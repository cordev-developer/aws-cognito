export const handler = function(event, context) {
    // Retrieve user attribute from event request
    const userAttributes = event.request.userAttributes;
    // Add scope to event response
    event.response = {
      "claimsAndScopeOverrideDetails": {
        "idTokenGeneration": {},
        "accessTokenGeneration": {
          "claimsToAddOrOverride": {
            "demo:membershipLevel": userAttributes['custom:membership']
          },
          "scopesToAdd": ["membership:" + userAttributes['custom:location'] + "." + userAttributes['custom:membership']],
          
          "scopesToSuppress": [
            "phone",
            "email"
        ]
        },
        "groupOverrideDetails": {
            "groupsToOverride": [
              "admin"
            ],
          }
      }
    };
    // Return to Amazon Cognito
    context.done(null, event);
  };
