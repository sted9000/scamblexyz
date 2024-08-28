<template>
  <main>
    <div class="max-w-6xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div class="text-center">
        <h2
          class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
        >
          Choose Your Plan
        </h2>
        <p
          class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
        >
          Select the perfect plan for you and start enjoying our amazing
          features today!
        </p>
        <div
          class="mt-10 space-y-8 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0"
        >
          <div
            v-for="plan in plans"
            :key="plan.name"
            class="border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 divide-y divide-gray-200 flex flex-col"
          >
            <div class="p-6 flex-grow">
              <h3 class="text-2xl font-semibold text-gray-900">
                {{ plan.name }}
              </h3>
              <p class="mt-4 text-gray-500 min-h-12">{{ plan.description }}</p>
              <p class="mt-4">
                <template v-if="plan.price === 0">
                  <span class="text-4xl font-extrabold text-gray-900"
                    >Free</span
                  >
                </template>
                <template v-else>
                  <span class="text-4xl font-extrabold text-gray-900"
                    >${{ plan.price }}</span
                  >
                  <span class="text-base font-medium text-gray-500"
                    >/month</span
                  >
                </template>
              </p>
              <div class="mt-8">
                <h4
                  class="text-sm font-medium text-gray-900 tracking-wide uppercase"
                >
                  What's included
                </h4>
                <ul class="mt-4 space-y-3">
                  <li
                    v-for="feature in plan.features"
                    :key="feature"
                    class="flex items-start"
                  >
                    <svg
                      class="flex-shrink-0 h-5 w-5 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="ml-2 text-sm text-gray-500">{{
                      feature
                    }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="p-6">
              <button
                :class="[
                  'w-full px-6 py-3 font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2',
                  plan.name === 'Basic'
                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 focus:ring-gray-300 border border-gray-200'
                    : 'animated-button focus:ring-blue-500 border-blue-500',
                ]"
                @click="handleSubscribe(plan.name)"
              >
                {{ plan.name === "Basic" ? "Basic Plan" : "Premium Plan" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const plans = ref([
  {
    name: "Basic",
    price: 0,
    description: "Perfect for getting started with our basic features.",
    features: [
      "Access to basic features",
      "Limited storage",
      "Community support",
    ],
  },
  {
    name: "Premium",
    price: 10,
    description:
      "Unlock premium features and take your experience to the next level.",
    features: [
      "All Free plan features",
      "Unlimited storage",
      "Priority customer support",
      "Advanced analytics",
    ],
  },
]);

const handleSubscribe = async (plan) => {
  if (plan === "Free") {
    await userStore.subscribeFreeUser();
  } else if (plan === "Premium") {
    await userStore.subscribePremiumUser();
  }
};
</script>
