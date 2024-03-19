# Amazon Cognito Java code examples

This README discusses how to run and test the Java code examples for Amazon Cognito.

## Running the Amazon Cognito Java files

**IMPORTANT**

The Java examples perform AWS operations for the account and AWS Region for which you've specified credentials, and you may incur AWS service charges by running them. See the [AWS Pricing page](https://aws.amazon.com/pricing/) for details about the charges you can expect for a given service and operation.

Some of these examples perform *destructive* operations on AWS resources, such as deleting a user pool. **Be very careful** when running an operation that deletes or modifies AWS resources in your account. It's best to create separate test-only resources when experimenting with these examples.

To run these examples, you can setup your development environment to use Apache Maven or Gradle to configure and build AWS SDK for Java projects. For more information, 
see [Get started with the AWS SDK for Java 2.x](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/get-started.html). 


 ## Create credentials with access keys and secret access keys

`CognitoIdentityProviderClient cognitoClient = CognitoIdentityProviderClient.builder()
.region(Region.US_EAST_1)
.credentialsProvider(() -> AwsBasicCredentials.create("accessKey", "secretKey"))
.build();`

