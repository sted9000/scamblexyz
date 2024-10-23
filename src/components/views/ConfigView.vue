<template>
  <ViewHeader title="Configuration" />
  <div class="flex gap-4 flex-wrap lg:mx-6 mx-4">
    <ConfigItem v-for="site in userStore.getSites" :key="site.id" :item="site" />
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import ViewHeader from "@/components/headers/ViewHeader.vue";
import { useUserStore } from "@/stores/user";
import ConfigItem from "@/components/config/ConfigItem.vue";

const props = defineProps({
  title: String,
});

const userStore = useUserStore();
</script>
