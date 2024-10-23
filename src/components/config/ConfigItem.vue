<template>
  <div class="card w-80 bg-base-100 shadow-xl">
    <div class="card-body p-4">
      <div class="flex items-center justify-between mb-2">
        <h2 class="card-title text-sm flex items-center">
          <img :src="item.imagePath" :alt="item.fullName" class="w-6 h-6 mr-2">
          {{ item.fullName }}
        </h2>
        <input type="checkbox" class="toggle toggle-primary toggle-sm" 
               :checked="item.isEnabled"
               @change="updateSite('isEnabled', $event.target.checked)" />
      </div>
      <div class="flex justify-between items-center">
        <label class="label cursor-pointer justify-start" :class="{ 'opacity-50': !item.isEnabled }">
          <span class="label-text text-xs mr-2">Check-in</span>
          <input type="checkbox" class="toggle toggle-secondary toggle-xs" 
                 :checked="item.checkinEnabled"
                 :disabled="!item.isEnabled"
                 @change="updateSite('checkinEnabled', $event.target.checked)" />
        </label>
        <label class="label cursor-pointer justify-start" :class="{ 'opacity-50': !item.isEnabled }">
          <span class="label-text text-xs mr-2">Bonus</span>
          <input type="checkbox" class="toggle toggle-accent toggle-xs" 
                 :checked="item.bonusEnabled"
                 :disabled="!item.isEnabled"
                 @change="updateSite('bonusEnabled', $event.target.checked)" />
        </label>
        <label class="label cursor-pointer justify-start" :class="{ 'opacity-50': !item.isEnabled }">
          <span class="label-text text-xs mr-2">Postcard</span>
          <input type="checkbox" class="toggle toggle-info toggle-xs" 
                 :checked="item.postcardEnabled"
                 :disabled="!item.isEnabled"
                 @change="updateSite('postcardEnabled', $event.target.checked)" />
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useUserStore } from '@/stores/user';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const userStore = useUserStore();

const updateSite = async (property, value) => {
  try {
    await userStore.updateEnabledSite(props.item.siteId, { [property]: value } );
  } catch (error) {
    console.error(`Error updating ${property} for ${props.item.fullname}:`, error);
  }
};
</script>
