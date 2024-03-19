/*
   Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
   SPDX-License-Identifier: Apache-2.0
*/

package com.example.cognito;

import software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AdminInitiateAuthRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AdminInitiateAuthResponse;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AuthFlowType;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AuthenticationResultType;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;


/**
 * Before running this Java V2 code example, set up your development environment, including your credentials.
 *
 * For more information, see the following documentation topic:
 *
 * https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/get-started.html
 */

public class AdminInitiateAuth {

    public static void main(String[] args) {

        final String usage = "\n" +
                "Usage:\n" +
                "    <AuthFlow> <ClientId> <UserPoolId>\n\n" +
                "Where:\n" +
                "    AuthFlow - The authentication flow for this call to run. Example \n\n" +
                "    ClientId - The app client ID.\n\n" +
                "    UserPoolId - The user pool ID.\n\n" +
                "    UserName - The user name.\n\n" +
                "    Password - The user password.\n\n";

        // Los flujos pueden ser "ADMIN_NO_SRP_AUTH" o "ADMIN_USER_PASSWORD_AUTH" por ejemplo.


        if (args.length != 5) {
            System.out.println(usage);
            System.exit(1);
        }

        String authFlow = args[0];
        String clientId = args[1];
        String userPoolId = args[2];
        String userName = args[3];
        String password = args[4];


        CognitoIdentityProviderClient identityProviderClient = CognitoIdentityProviderClient.builder()
                .region(Region.US_EAST_1)
                .credentialsProvider(ProfileCredentialsProvider.create())
                .build();

        adminInitiateAuth(identityProviderClient, authFlow, clientId, userPoolId, userName, password);
    }


    public static void adminInitiateAuth(CognitoIdentityProviderClient identityProviderClient, String authFlow,
                                                   String clientId, String userPoolId, String userName, String password){

        Map<String, String> authParams = new LinkedHashMap<String, String>() {{
            put("USERNAME", userName);
            put("PASSWORD", password);
        }};

        AdminInitiateAuthRequest req = AdminInitiateAuthRequest.builder()
                .authFlow(authFlow)
                .clientId(clientId)
                .userPoolId(userPoolId)
                .authParameters(authParams)
                .build();
        identityProviderClient.adminInitiateAuth(req);

        AdminInitiateAuthResponse response = identityProviderClient.adminInitiateAuth(req);
        AuthenticationResultType result = response.authenticationResult();

        System.out.println("Admin initiate auth with auth params");
        System.out.println("This is the result = " + result.toString());
    }
}