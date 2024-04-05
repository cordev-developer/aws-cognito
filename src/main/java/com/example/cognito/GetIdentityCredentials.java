//snippet-sourcedescription:[GetIdentityCredentials.java demonstrates how to retrieve credentials for an identity in an Amazon Cognito identity pool.]
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

//snippet-start:[cognito.java2.GetIdentityCredentials.import]
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.cognitoidentity.CognitoIdentityClient;
import software.amazon.awssdk.services.cognitoidentity.model.GetCredentialsForIdentityRequest;
import software.amazon.awssdk.services.cognitoidentity.model.GetCredentialsForIdentityResponse;
import software.amazon.awssdk.services.cognitoidentityprovider.model.CognitoIdentityProviderException;
//snippet-end:[cognito.java2.GetIdentityCredentials.import]

/**
 * To run this AWS code example, ensure that you have setup your development environment, including your AWS credentials.
 *
 * For information, see this documentation topic:
 *
 * https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/get-started.html
 */

public class GetIdentityCredentials {

    public static void main(String[] args) {
        final String usage = "\n" +
                "Usage:\n" +
                "    <identityId> \n\n" +
                "Where:\n" +
                "    identityId - the Id of an existing identity.\n\n" +
                "Example:\n" +
                "    GetIdentityCredentials us-east-2:0000007890000-abcdefgc\n";

        if (args.length != 1) {
            System.out.println(usage);
            System.exit(1);
        }

        String identityId = args[0];
        CognitoIdentityClient cognitoClient = CognitoIdentityClient.builder()
                .region(Region.US_EAST_1)
                .build();

        getCredsForIdentity(cognitoClient, identityId);
        cognitoClient.close();
    }

    //snippet-start:[cognito.java2.GetIdentityCredentials.main]
    // Configuramos el identity id "us-east-1:9ced61d9-9ea6-4f27-a241-59914503bdfc" que pertenece al
    // Identity Pool llamado "pool-testing-1-application-Identity-Pool" y que en ese identity id tiene un rol
    // que tiene permisos para usuarios no autenticados (y además el permiso para el método "GetCredentialsForIdentity")

    public static void getCredsForIdentity(CognitoIdentityClient cognitoClient, String identityId) {

        try {
            GetCredentialsForIdentityRequest getCredentialsForIdentityRequest = GetCredentialsForIdentityRequest.builder()
                    .identityId(identityId)
                    .build();

            GetCredentialsForIdentityResponse response = cognitoClient.getCredentialsForIdentity(getCredentialsForIdentityRequest);
            System.out.println("Identity ID " + response.identityId() + ", Access key ID " + response.credentials().accessKeyId());

            // Recuperamos también las keys y el token de sesión
            System.out.println("Esta es la access key = " + response.credentials().accessKeyId());
            System.out.println("Esta es la secret key = " + response.credentials().secretKey());
            System.out.println("Este es el token de sesión = " + response.credentials().sessionToken());

        } catch (CognitoIdentityProviderException e) {
            System.err.println(e.awsErrorDetails().errorMessage());
            System.exit(1);
        }
    }
    //snippet-end:[cognito.java2.GetIdentityCredentials.main]
}