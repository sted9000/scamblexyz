<template>
  <main>
    <div class="max-w-6xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div class="text-center">
        <h2 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          {{ props.mainDescription }}
        </h2>
        <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          {{ props.secondaryDescription }}
        </p>
        <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div class="flex flex-col sm:flex-row w-full max-w-md rounded-md shadow-lg overflow-hidden">
            <input
                type="email"
                placeholder="Enter your email"
                class="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
                class="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-medium animated-button hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 whitespace-nowrap"
            >
              Get Started
            </button>
          </div>
        </div>
        <p class="mt-3 text-sm text-gray-400">It's Totally Free!</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  mainDescription: {
    type: String,
    required: true
  },
  secondaryDescription: {
    type: String,
    required: true
  }
})
</script>
