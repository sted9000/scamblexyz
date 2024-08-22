<template>
  <header class="bg-gray-50">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <div class="flex-shrink-0">
          <div class="relative">
            <router-link to="/" class="text-2xl font-bold animated-text">{{ props.appName }}</router-link>
            <span class="absolute right-0 -bottom-3 text-[0.6rem] text-gray-500">by W3 Ventures</span>
          </div>
        </div>
        <div class="flex items-center space-x-6">
          <button
              @click="signInWithGoogle"
              class="text-sm font-medium text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-900"
          >
            Login
          </button>
          <button
              @click="signUpWithGoogle"
              class="px-4 py-2 text-sm font-medium rounded-md text-white animated-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { defineProps } from 'vue'
// import { Auth } from 'aws-amplify'
import '@/assets/css/animatedText.css'  // Import the external CSS file

const props = defineProps(['appName'])

// const signInWithGoogle = async () => {
//   try {
//     await Auth.federatedSignIn({ provider: 'Google' })
//   } catch (error) {
//     console.error('Error signing in with Google', error)
//   }
// }
//
// const signUpWithGoogle = async () => {
//   try {
//     await Auth.federatedSignIn({ provider: 'Google' })
//   } catch (error) {
//     console.error('Error signing up with Google', error)
//   }
// }
</script>
