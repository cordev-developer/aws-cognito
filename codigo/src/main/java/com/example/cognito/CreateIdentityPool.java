//snippet-sourcedescription:[CreateIdentityPool.java demonstrates how to create a new Amazon Cognito identity pool. The identity pool is a store of user identity information that is specific to your AWS account.]
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

//snippet-start:[cognito.java2.create_identity_pool.import]
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.cognitoidentity.CognitoIdentityClient;
import software.amazon.awssdk.services.cognitoidentity.model.CreateIdentityPoolRequest;
import software.amazon.awssdk.services.cognitoidentity.model.CreateIdentityPoolResponse;
import software.amazon.awssdk.services.cognitoidentityprovider.model.CognitoIdentityProviderException;
//snippet-end:[cognito.java2.create_identity_pool.import]

/**
 * To run this Java V2 code example, ensure that you have setup your development environment, including your credentials.
 *
 * For information, see this documentation topic:
 *
 * https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/get-started.html
 */
public class CreateIdentityPool {

    public static void main(String[] args) {
        final String USAGE = "\n" +
                "Usage:\n" +
                "    <identityPoolName> \n\n" +
                "Where:\n" +
                "    identityPoolName - the name to give your identity pool.\n\n" ;

        if (args.length != 1) {
            System.out.println(USAGE);
            System.exit(1);
        }

        String identityPoolName = args[0];
        CognitoIdentityClient cognitoClient = CognitoIdentityClient.builder()
                .region(Region.US_EAST_1)
                .build();

        String identityPoolId = createIdPool(cognitoClient, identityPoolName) ;
        System.out.println("Unity pool ID " + identityPoolId);
        cognitoClient.close();
    }

    //snippet-start:[cognito.java2.create_identity_pool.main]
    public static String createIdPool(CognitoIdentityClient cognitoClient, String identityPoolName ) {

        try {
            CreateIdentityPoolRequest poolRequest = CreateIdentityPoolRequest.builder()
                    .allowUnauthenticatedIdentities(false)
                    .identityPoolName(identityPoolName)
                    .build() ;

            CreateIdentityPoolResponse response = cognitoClient.createIdentityPool(poolRequest);
            return response.identityPoolId();

        } catch (CognitoIdentityProviderException e){
            System.err.println(e.awsErrorDetails().errorMessage());
            System.exit(1);
        }
        return "";
    }
    //snippet-end:[cognito.java2.create_identity_pool.main]
}