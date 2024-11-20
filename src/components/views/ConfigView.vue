<template>
  <ViewHeader title="Configuration" />
  <div class="flex gap-4 flex-wrap lg:mx-6 mx-4 mb-16">
    <ConfigItem v-for="site in userStore.getSites" :key="site.id" :item="site" />
  </div>
</template>

<script setup>
import ViewHeader from "@/components/headers/ViewHeader.vue";
import { useUserStore } from "@/stores/user";
import ConfigItem from "@/components/config/ConfigItem.vue";

const userStore = useUserStore();
</script>
