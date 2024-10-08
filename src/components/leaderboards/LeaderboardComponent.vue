<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: String,
  items: Array,
});
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table table-no-dividers custom-table">
      <thead>
        <tr>
          <th colspan="3" class="text-center text-lg font-bold text-gray-600">
            {{ props.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in props.items" :key="item.rank">
          <td class="">{{ item.rank }}</td>
          <td class="flex items-center">
            <div class="avatar pr-2">
              <div class="w-5 rounded-full">
                <img
                  :src="`/images/profile/${item.userIcon}.png`"
                  :alt="item.username"
                />
              </div>
            </div>
            {{ item.username }}
          </td>

          <td>{{ item.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-no-dividers tbody tr,
.table-no-dividers thead tr {
  border: none;
}
.custom-table :where(th, td) {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
</style>
