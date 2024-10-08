<template>
  <ViewHeader :title="props.title" />
</template>

<script setup>
import { defineProps } from "vue";
import ViewHeader from "@/components/headers/ViewHeader.vue";

const props = defineProps({
  title: String,
});
</script>
