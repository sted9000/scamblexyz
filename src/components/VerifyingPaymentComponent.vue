<template>
  <main class="max-w-6xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
    <div class="text-center">
      <div v-if="!success">
        <h2
          class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
        >
          Verifying Payment
        </h2>
        <p
          class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
        >
          Please wait while we verify your payment...
        </p>
        <div class="mt-5 max-w-md mx-auto">
          <div class="spinner"></div>
        </div>
      </div>
      <div v-else>
        <h2
          class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
        >
          Payment Successful
        </h2>
        <p
          class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
        >
          Your payment has been successfully processed.
        </p>
        <div class="mt-5 max-w-md mx-auto">
          <button
            @click="handleClick()"
            class="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-md shadow-lg animated-button hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";
import router from "@/router";
const userStore = useUserStore();
const success = ref(false);
const handleClick = () => {
  router.push("/app");
};

onMounted(async () => {
  try {
    await userStore.veryifySubscription();
    // display the success message
    success.value = true;
    // redirect to the dashboard
  } catch (error) {
    // Handle verification error
    console.error("Error verifying subscription:", error);
  }
});
</script>

<style scoped>
.stripe-success {
  text-align: center;
  padding: 2rem;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
