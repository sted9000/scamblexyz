# Startup Template: Launch Your Webapp in Minutes
Note: This is a work in progress and is not production ready.
## The Problem
The final step of launching an experimental webapp business is often more challenging than necessary.

## The Solution
A reusable template that's easy to launch and provides an excellent user experience. You should be able to launch your webapp in minutes, not days.

## Background
I've created several cool products but never launched them! The recurring pattern is that towards the end of each project, I find a reason to abandon it and move on to the next one before launch. While there are various reasons for this (consult my therapist for details), one significant factor is that publishing a product is too difficult. You need to host your app, create a landing page, manage users, set up payments, and more.

## Features
1. User onboarding with Google
2. Payments and subscriptions via Stripe
3. A clean and functional landing page
4. Easy deployment and hosting with AWS CloudFormation

## Integrating Your App

### VueJS Single Page Application
The application is written in Vue3 with the Composition API. Vue's modular nature makes it straightforward to integrate your webapp with this existing framework.

Three basic steps to integrate your App with this template:

1. Build your views (components):

```vue
// /src/components/MyAppComponent.vue
<template>
    <div>{{ appStore.data }}</div>
</template>

<script setup>
import { useAppStore } from "@/stores/appStore.js";
const appStore = useAppStore();
</script>
```

2. Add state management (a store) for your application's data:

```javascript
// /src/stores/appStore.js
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
      data: null
  }),
  actions: {
      async fetchData() {
          // API request to get data from your database
          // ...
          this.data = dataFromDatabase;
      }
  }
});
```

3. Configure the routing logic:

```javascript
// /src/router.js
// Add routes to the routes array
const routes = [
    // existing routes...

    // add your new routes
    {
        path: "/app",
        name: "MyApp",
        component: () => import("@/components/MyAppComponent.vue"),
    },
    // rest of file...
];
```

### Infrastructure as Code (IaC)
To streamline launching, I created a CloudFormation Template. All you need to do is add your app's resources and then deploy.

For more information, see:
- [AWS SAM](https://aws.amazon.com/serverless/sam/)
- [AWS CloudFormation](https://aws.amazon.com/cloudformation/)

Example of adding a Lambda resource:

1. Create Lambda:
```bash
sam init --runtime nodejs20.x
```

2. Add your logic:
```javascript
// index.mjs
export const handler = async (event) => {
    // get user's zip code
    // fetch the weather
    // convert the weather to "What should I wear today" with ChatGPT API
    return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify(chatgptResponse.data)
    };
};
```

3. Package the Lambda:
```toml
# add configuration to samconfig.toml
...
[default.package.parameters]
resolve_s3 = false
s3_bucket = "YOUR_S3_BUCKET"
output_template_file = "packaged.yaml"
```

Then build and package (store in S3):
```bash
sam build
sam package
```

4. Reference the Lambda as a resource in the CloudFormation Template:
```yaml
# template.yaml
...
# 1. Add a mapping that points to your Lambda object in S3
# You can find the Code URI in the packaged.yaml file of your Lambda
# Copy only the final part of the path which is your S3 object name
  LambdaFunctions:
    <FunctionName>:
      S3Key: <S3ObjectName>

# 2. Add your Lambda's configurations as CloudFormation Resource
GetDynamoUserFunction:
  Type: AWS::Lambda::Function
  Properties:
    FunctionName: !Sub "${ProjectName}-<FunctionName>"
    Handler: src/handlers/index.handler
    Role: !GetAtt LambdaExecutionRole.Arn
    Code:
      S3Bucket: !Ref LambdaBucketName
      S3Key: !FindInMap [LambdaFunctions, <FunctionName>, S3Key]
    Runtime: nodejs20.x
    Timeout: 30
    MemorySize: 128
    Environment:
      Variables:
        WEATHER_API_KEY: <WEATHER_API_KEY>
        CHATGPT_API_KEY: <CHATGPT_API_KEY>
```

## Third-Party Setup

> **Note:** You will need to add a few domains that are generated from the deployment later.

### Google
Set up a Google [OAuth 2.0 Client](https://support.google.com/cloud/answer/6158849?hl=en). Note the Client ID and the Client Secret as we will need them later. Don't worry about the Authorized JavaScript origins and the Authorized redirect URIs for now; we'll fill those in after deployment.

### Stripe
(Instructions for Stripe setup seem to be missing. You may want to add them here.)

## Deployment

1. Deploy:
```bash
aws cloudformation create-stack --stack-name TestStack --template-body file://test_template.yaml --parameters ParameterKey=GoogleClientId,ParameterValue=YOUR_GOOGLE_CLIENT_ID ParameterKey=GoogleClientSecret,ParameterValue=YOUR_GOOGLE_CLIENT_SECRET ParameterKey=StripeApiKey,ParameterValue=YOUR_STRIPE_API_KEY ParameterKey=StripeCancelUrl,ParameterValue=place-holder ParameterKey=StripeSuccessUrl,ParameterValue=placeholder ParameterKey=StripePriceId,ParameterValue=YOUR_STRIPE_PRICE_ID ParameterKey=StripeSigningSecret,ParameterValue=YOUR_STRIPE_SIGNING_SECRET --capabilities CAPABILITY_IAM
```

2. Check the status of your deployment:
```bash
aws cloudformation describe-stacks --stack-name YOUR_STACK_NAME

# Note: If something went wrong, it's best to check the CloudFormation section of the AWS Console for easier diagnosis.
```

3. Get the outputs of your CFT deployment:
```bash
aws cloudformation describe-stacks --stack-name YOUR_STACK_NAME --query "Stacks[0].Outputs" --output text

# Note: You can also see them in the CloudFormation Console
```

> **Helper script to get outputs and format them for your SPA:**
```bash
aws cloudformation describe-stacks --stack-name TestStack --query 'Stacks[0].Outputs' --output json > cloudformation_outputs.json

./output-to-env.sh
```

4. Add deployment details to your SPA:
```env
# .env
VUE_APP_COGNITOUSERPOOLCLIENTID=15eftg4h325io6r6rgvgr1i08u
VUE_APP_COGNITOUSERPOOLID=us-east-1_SGz1zBRd8
VUE_APP_APIGATEWAYDEPLOYEDSTAGENAME=prod
VUE_APP_CLOUDFRONTAPIORIGINDOMAINNAME=ngjwv4wy3l.execute-api.us-east-1.amazonaws.com
VUE_APP_COGNITODOMAINNAME=https://startup-template-543770207285.auth.us-east-1.amazoncognito.com
VUE_APP_CLOUDFRONTDOMAINNAME=dfonca47ys0q6.cloudfront.net
VUE_APP_SPABUCKETNAME=startup-template-spa
```

5. Package your SPA:
```bash
# from the root of your SPA project
npm run build
aws s3 sync dist/ s3://<SPABucketName> --delete
```

6. At this point, you should be able to access your website from the CloudFront domain!

7. Finish up your authentication configuration by adding values from your deployment to Google OAuth:
   - Add your CloudFrontDomainName as an Authorized JavaScript origin
   - Add your CloudFrontDomainName as an Authorized redirect URI
     - Add `/?auth=success` to the end of the path
   - Add your CognitoDomainName + the suffix of "/oauth2/idpresponse" as an Authorized redirect URI

Remember to save your changes.

Authentication should now be configured and working!

## Features to Implement
- [ ] Monitoring
- [ ] CI/CD
- [ ] Custom 404 Errors
