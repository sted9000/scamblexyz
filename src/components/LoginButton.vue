<template>
  <button @click="signIn">Login</button>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

console.log("AuthStore", authStore);
let codeClient = null;



const signIn = () => {
  codeClient.requestCode();
};

onMounted(() => {
  initializeGoogleSignIn();
});

</script>


