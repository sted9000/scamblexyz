// src/views/GoogleAuthHandler.vue
<template>
  <div class="h-screen flex items-center justify-center">
    <p>Processing your sign-in</p>
    <span class="loading loading-dots loading-lg ml-1"></span>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import router from '@/router'   
import { useAuthStore } from '@/stores/auth' // Assuming you're using Pinia for state management

const authStore = useAuthStore()

onMounted(async () => {
  try {
    // Get the authorization code from URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    console.log("code", code);
    
    if (!code) {
      throw new Error('No authorization code found')
    }


    // Send the code to your backend to exchange for tokens
    await authStore.handleAuthCode(code);

  } catch (error) {
    console.error('Authentication error:', error)
    // Handle error (show error message, redirect to login, etc.)
    router.push({
      path: '/',
      query: { error: 'auth_failed' }
    })
  }
})
</script>

