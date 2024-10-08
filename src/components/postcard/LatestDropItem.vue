<template>
  <div
    class="flex flex-col bg-gray-100 px-6 py-4 rounded-lg transition-transform hover:scale-105 hover:bg-gray-200"
  >
    <div class="flex flex-col">
      <img
        :src="props.item.imagePath"
        alt="Item image"
        class="w-10 h-10 rounded-full mr-4"
      />
      <div>
        <div class="text-lg font-bold text-gray-700 mr-2">
          {{ props.item.fullName }}
        </div>
        <div class="text-lg font-bold text-gray-700">
          {{
            new Date(props.item.dropDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }) + (new Date(props.item.dropDate).getDate() === 1 ? 'st' :
               new Date(props.item.dropDate).getDate() === 2 ? 'nd' :
               new Date(props.item.dropDate).getDate() === 3 ? 'rd' : 'th')
          }}
        </div>
      </div>
    </div>
    <div>
      <div :class="[
        'text-xs mt-4',
        props.item.source === 'user' ? 'text-blue-500' :
        props.item.source === 'reddit' ? 'text-orange-500' :
        props.item.source === 'discord' ? 'text-purple-500' :
        props.item.source === 'other' ? 'text-green-500' :
        'text-gray-500'
      ]">
        {{ props.item.source ? props.item.source : 'Unknown source' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps(["item"]);
</script>
```
