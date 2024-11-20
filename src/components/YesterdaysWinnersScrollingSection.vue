<template>
    <div class="flex items-center px-4">
     <div class="text-gray-700 font-bold">{{ yesterdaysWinners.title }}</div>
          <div
            v-for="(item, index) in yesterdaysWinners.winners"
            :key="`ticker1-${index}`"
            :class="[
              'flex items-center',
              'text-gray-700',
              'font-bold',
              (index + 1) % 4 === 0 ? 'pr-12' : 'pr-4',
              'mx-2'
    
            ]"
          >
            <img :src="`/images/profile/${item[1].userIcon}.png`" class="w-6 h-6 rounded-full ml-4 mr-1" />
            <span class="">{{  item[1].username }}</span>
            <span class="ml-1">({{ item[1].score }})</span>
            <span class="ml-1"> - {{ item[0]}} </span>
          </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
    yesterdaysWinners: Object
})
</script>