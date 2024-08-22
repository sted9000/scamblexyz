const awsconfig = {
    "aws_project_region": "YOUR_AWS_REGION",
    "aws_cognito_region": "YOUR_AWS_REGION",
    "aws_user_pools_id": "YOUR_USER_POOL_ID",
    "aws_user_pools_web_client_id": "YOUR_APP_CLIENT_ID",
    "oauth": {
        "domain": "your-cognito-domain.auth.YOUR_REGION.amazoncognito.com",
        "scope": ["email", "profile", "openid"],
        "redirectSignIn": "http://localhost:8080/",
        "redirectSignOut": "http://localhost:8080/",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS"
};

export default awsconfig;
