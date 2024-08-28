const awsconfig = {
  aws_project_region: "us-east-1",
  aws_cognito_region: "us-east-1",
  aws_user_pools_id: process.env.VUE_APP_COGNITOUSERPOOLID,
  aws_user_pools_web_client_id: process.env.VUE_APP_COGNITOUSERPOOLCLIENTID,
  oauth: {
    domain: process.env.VUE_APP_COGNITODOMAINNAME.split("https://")[1],
    scope: ["email", "profile", "openid"],
    redirectSignIn: `https://${process.env.VUE_APP_CLOUDFRONTDOMAINNAME}/?auth=success`,
    redirectSignOut: `https://${process.env.VUE_APP_CLOUDFRONTDOMAINNAME}/?auth=logout`,
    responseType: "code",
  },
  federationTarget: "COGNITO_USER_POOLS",
};

export default awsconfig;
