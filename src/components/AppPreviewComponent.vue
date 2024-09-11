<template>
  <section id="app-preview" class="bg-gray-50 py-12 sm:py-16 lg:py-20">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row items-center gap-8">
        <div class="w-full md:w-1/2">
          <picture>
            <source
              media="(min-width: 1024px)"
              :srcset="largeImage(props.firstImage.path)"
            />
            <source
              media="(min-width: 640px)"
              :srcset="mediumImage(props.firstImage.path)"
            />
            <img
              :src="smallImage(props.firstImage.path)"
              alt="App Preview"
              class="w-full h-auto rounded-lg shadow-xl"
            />
          </picture>
        </div>
        <div class="w-full md:w-1/2">
          <h2 class="text-3xl font-bold mb-4">{{ props.firstImage.title }}</h2>
          <p class="text-lg text-gray-600">
            {{ props.firstImage.description }}
          </p>
        </div>
      </div>
      <div class="flex flex-col md:flex-row-reverse items-center gap-8 mt-12">
        <div class="w-full md:w-1/2">
          <picture>
            <source
              media="(min-width: 1024px)"
              :srcset="largeImage(props.secondImage.path)"
            />
            <source
              media="(min-width: 640px)"
              :srcset="mediumImage(props.secondImage.path)"
            />
            <img
              :src="smallImage(props.secondImage.path)"
              alt="App Preview"
              class="w-full h-auto rounded-lg shadow-xl"
            />
          </picture>
        </div>
        <div class="w-full md:w-1/2">
          <h2 class="text-3xl font-bold mb-4">{{ props.secondImage.title }}</h2>
          <p class="text-lg text-gray-600">
            {{ props.secondImage.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  firstImage: {
    type: Object,
    required: true,
  },
  secondImage: {
    type: Object,
    required: true,
  },
});

const largeImage = (path) => {
  return path + "-lg.png";
};

const mediumImage = (path) => {
  return path + "-md.png";
};

const smallImage = (path) => {
  return path + "-sm.png";
};
</script>
