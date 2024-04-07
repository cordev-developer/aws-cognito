//snippet-sourcedescription:[CreateUserPool.java demonstrates how to create a user pool for Amazon Cognito.]
//snippet-keyword:[AWS SDK for Java v2]
//snippet-keyword:[Code Sample]
//snippet-keyword:[Amazon Cognito]
//snippet-sourcetype:[full-example]
//snippet-sourcedate:[11/04/2020]
//snippet-sourceauthor:[scmacdon AWS]
/*
   Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
   SPDX-License-Identifier: Apache-2.0
*/

package com.example.cognito;

//snippet-start:[cognito.java2.create_user_pool.import]
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient;
import software.amazon.awssdk.services.cognitoidentityprovider.model.CognitoIdentityProviderException;
import software.amazon.awssdk.services.cognitoidentityprovider.model.CreateUserPoolRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.CreateUserPoolResponse;
//snippet-end:[cognito.java2.create_user_pool.import]

/**
 * To run this Java V2 code example, ensure that you have setup your development environment, including your credentials.
 *
 * For information, see this documentation topic:
 *
 * https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/get-started.html
 */
public class CreateUserPool {

    public static void main(String[] args) {
        final String USAGE = "\n" +
                "Usage:\n" +
                "    CreateUserPool <userPoolName> \n\n" +
                "Where:\n" +
                "    userPoolName - the name to give your user pool when it's created.\n\n" ;

        if (args.length != 1) {
            System.out.println(USAGE);
            System.exit(1);
        }

        String userPoolName = args[0];
        CognitoIdentityProviderClient cognitoClient = CognitoIdentityProviderClient.builder()
                .region(Region.US_EAST_1)
                .build();

        String id = createPool(cognitoClient,userPoolName);
        System.out.println("User pool ID: " + id);
        cognitoClient.close();
    }

    //snippet-start:[cognito.java2.create_user_pool.main]
    public static String createPool(CognitoIdentityProviderClient cognitoClient, String userPoolName ) {

        try {
            CreateUserPoolResponse response = cognitoClient.createUserPool(
                    CreateUserPoolRequest.builder()
                            .poolName(userPoolName)
                            .build()
            );
            return response.userPool().id();

        } catch (CognitoIdentityProviderException e){
            System.err.println(e.awsErrorDetails().errorMessage());
            System.exit(1);
        }
        return "";
    }
    //snippet-end:[cognito.java2.create_user_pool.main]
}