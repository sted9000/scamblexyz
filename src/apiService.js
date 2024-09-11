import { fetchAuthSession } from "aws-amplify/auth";
import axios from "axios";

export const authenticatedApiCall = async (method, path, data = null) => {
  const baseUrl = `https://${process.env.VUE_APP_CLOUDFRONTAPIORIGINDOMAINNAME}/${process.env.VUE_APP_APIGATEWAYDEPLOYEDSTAGENAME}`;
  const { tokens } = await fetchAuthSession();
  const idToken = tokens.idToken.toString();
  console.log(`Making ${method} request to ${baseUrl}${path}`);
  return axios({
    method,
    url: `${baseUrl}${path}`,
    data,
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
};

export const handleError = (error, customMessage) => {
  console.error(customMessage, error);
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return `Server error: ${error.response.status} - ${error.response.data}`;
    } else if (error.request) {
      return "No response received from server";
    } else {
      return "Error setting up the request";
    }
  } else {
    return "An unexpected error occurred";
  }
};
