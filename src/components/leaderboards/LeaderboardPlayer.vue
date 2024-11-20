// LeaderboardPlayer.vue
<template>
  <div 
    class="flex justify-between p-3 rounded-lg transition-all duration-500"
    :class="{
      'bg-green-100 scale-105': isHighlighted,
      'translate-y-1': hasMoved,
    //   'bg-gray-50': !isHighlighted
    }"
  >
    <div class="flex items-center gap-2">
      <div class="font-bold text-sm text-gray-500 w-6">{{ props.player.rank }}</div>
      <img 
        :src="`/images/profile/${props.player.userIcon}.png`" 
        class="w-6 h-6 rounded-full"
        alt="Profile"
      />
      <div class="font-bold text-md text-gray-700">{{ props.player.username }}</div>
    </div>
    
    <div class="flex items-center gap-2">
      <div class="font-bold text-md text-gray-700">{{ props.player.score }}</div>
      <div 
        v-if="props.isHighlighted" 
        class="text-green-500 animate-bounce"
      >
        ↑
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  player: {
    type: Object,
    required: true
  },
  isHighlighted: {
    type: Boolean,
    default: false
  },
  hasMoved: {
    type: Boolean,
    default: false
  }
});
</script>

<style>
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>