<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

console.log("AuthStore", authStore);
let codeClient = null;

const initializeGoogleSignIn = () => {
  window.google.accounts.id.initialize({
    client_id:
      "8603217298-qfgbrgiicgsv09qmknnfe9eir0sk2sqo.apps.googleusercontent.com", // Replace with your actual client ID
    callback: handleCredentialResponse,
    scope:
      "email profile openid https://www.googleapis.com/auth/userinfo.profile",
    redirect_uri: "http://localhost:3000/auth/google",
  });

  codeClient = window.google.accounts.oauth2.initCodeClient({
    client_id:
      "8603217298-qfgbrgiicgsv09qmknnfe9eir0sk2sqo.apps.googleusercontent.com",
    scope:
      "email profile openid https://www.googleapis.com/auth/userinfo.profile",
    ux_mode: "popup",
    redirect_uri: "http://localhost:3000/auth/google",
    callback: (response) => {
      if (response.code) {
        handleAuthCode(response.code);
      }
    },
  });
};

const handleCredentialResponse = (response) => {
  if (response.credential) {
    handleAuthToken(response.credential);
  }
};

const handleAuthCode = async (code) => {
  // authStore.setLoading(true);
  // authStore.setError(null);
  authStore.handleAuthCode(code);
};

const handleAuthToken = async (token) => {
  console.log("Token:", token);
  try {
    // const backendResponse = await axios.post(
    //   "http://localhost:3000/auth/google",
    //   { token }
    // );
    // handleAuthSuccess(backendResponse);
  } catch (error) {
    console.error("Error during authentication:", error);
  }
};

// const handleAuthSuccess = (backendResponse) => {
//   console.log("Backend response:", backendResponse.data);
//   if (backendResponse.data.success) {
//     user.value = backendResponse.data.user;
//     isSignedIn.value = true;
//   } else {
//     console.error("Backend authentication failed");
//   }
// };

const signIn = () => {
  codeClient.requestCode();
};

// const signOut = () => {
//   window.google.accounts.id.disableAutoSelect();
//   isSignedIn.value = false;
//   user.value = null;
//   // You might want to call your backend to invalidate the session
// };

onMounted(() => {
  initializeGoogleSignIn();
});
</script>

<template>
  <button @click="signIn">Login with Google</button>
</template>
