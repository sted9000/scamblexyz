<template>
  <div class="flex flex-col justify-between h-full border-r-2 border-gray-200">
    <ul class="mt-8 space-y-2 p-4 w-56 flex flex-col items-center">
      <li
        v-for="item in navItems"
        :key="item.name"
        :class="[
          'flex items-center cursor-pointer p-4 rounded-full w-full max-w-[170px]',
          selectedItem === item.name ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50',
        ]"
        @click="selectItem(item)"
      >
        <div class="flex items-center font-bold">
          <component :is="item.icon" class="w-5 h-5 mr-3 font-bold" />
          {{ item.name }}
        </div>
      </li>
    </ul>
    <div class="flex justify-center space-x-4 p-4">
      <a href="#" class="text-gray-400 hover:text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
          />
        </svg>
      </a>
      <a href="#" class="text-gray-400 hover:text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUiStore } from "@/stores/ui";
import {
  HomeIcon,
  CheckBadgeIcon,
  GiftIcon,
  EnvelopeIcon,
  ChartBarIcon,
  PuzzlePieceIcon,
  QuestionMarkCircleIcon,
  AdjustmentsHorizontalIcon
  
} from "@heroicons/vue/24/outline";

const uiStore = useUiStore();
const navItems = ref([
  { name: "Home", icon: HomeIcon},
  { name: "Checkins", icon: CheckBadgeIcon},
  { name: "Bonuses", icon: GiftIcon},
  { name: "Postcards", icon: EnvelopeIcon},
  { name: "Games", icon: PuzzlePieceIcon},
  { name: "Leaderboards", icon: ChartBarIcon},
  { name: "Config", icon: AdjustmentsHorizontalIcon},
  { name: "About", icon: QuestionMarkCircleIcon},
]);

const selectedItem = computed(() => {
  return uiStore.getView;
});
const selectItem = (item) => {
  uiStore.setView(item.name);
};
</script>
