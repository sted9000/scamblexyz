<template>
  <div class="flex justify-between mx-4 mt-4 -mb-2 h-12">
    <h1 class="text-3xl font-bold p-2">{{ props.title }}</h1>
    <button
      v-if="props.showHint"
      @click="showHint()"
      class="btn btn-ghost btn-circle mt-1"
    >
      <InformationCircleIcon class="w-8 h-8" />
    </button>
  </div>
  <div class="divider" />
</template>

<script setup>
import { defineProps } from "vue";
import { InformationCircleIcon } from "@heroicons/vue/24/outline";
import { useModalStore } from "@/stores/modal";

const modalStore = useModalStore();

const props = defineProps({
  title: String,
  showHint: Boolean,
});

const showHint = () => {
  modalStore.setOpenModal(`${props.title.toLowerCase()}Hint`);
};

</script>
