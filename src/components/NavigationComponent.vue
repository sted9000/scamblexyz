<template>
  <nav class="flex items-center space-x-4 lg:space-x-8">
    <button @click="$router.push('/reviews')" class="text-gray-500 hover:text-gray-900 bg-transparent border-0">Reviews</button>
    <button @click="$router.push('/about')" class="text-gray-500 hover:text-gray-900 bg-transparent border-0">About</button>
    <button @click="handleAuth" class="text-gray-500 hover:text-gray-900 bg-transparent border-0">Login</button>
    <button @click="handleAuth" class="text-white px-6 py-2 font-medium rounded-lg animated-button focus:outline-none">Sign Up</button>
</nav>
</template>

<script setup>
import "@/assets/css/animatedText.css";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const handleAuth = () => {
  authStore.signIn();
};
</script>
