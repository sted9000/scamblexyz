<template>
  <div
    class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-screen flex flex-col"
  >
    <div class="relative max-w-5xl mx-auto flex-grow flex flex-col w-full">
      <YourScoreComponent />
      <ScrollingTickerComponent />
      <div class="flex flex-col lg:flex-row flex-grow">
        <div
          class="w-full lg:w-1/2 mb-4 lg:mb-0 lg:pr-3 h-[75vh] overflow-hidden"
        >
          <DailyCheckinComponent />
        </div>
        <div class="w-full lg:w-1/2 lg:pl-3 h-[75vh] overflow-hidden">
          <MessageBoardComponent />
        </div>
      </div>
    </div>

    <!-- Floating action buttons -->
    <div class="fixed bottom-4 right-4 flex space-x-2">
      <button
        @click="modalStore.setOpenModal('streak')"
        class="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </button>
      <button
        @click="modalStore.setOpenModal('graph')"
        class="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 3v18h18M3 15l6-6 4 4 8-8"
          />
        </svg>
      </button>
      <button
        @click="modalStore.setOpenModal('leaderboard')"
        class="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>
      <button
        @click="modalStore.setOpenModal('share')"
        class="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      </button>
    </div>

    <!-- Make background opacity 50% when modal is open -->
    <div
      v-if="modalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
    ></div>

    <!-- Modal -->
    <ConfigModal v-if="configModal" @close="handleCloseModal" />
    <StreakModal v-if="streakModal" @close="handleCloseModal" />
    <GraphModal v-if="graphModal" @close="handleCloseModal" />
    <LeaderboardModal v-if="leaderboardModal" @close="handleCloseModal" />
    <ShareModal v-if="shareModal" @close="handleCloseModal" />
    <CreatePostModal v-if="createPostModal" @close="handleCloseModal" />
    <EditProfileModal v-if="editProfileModal" @close="handleCloseModal" />
  </div>
</template>

<script setup>
import YourScoreComponent from "@/components/YourScoreComponent.vue";
import ScrollingTickerComponent from "@/components/ScrollingTickerComponent.vue";
import DailyCheckinComponent from "@/components/DailyCheckinComponent.vue";
import MessageBoardComponent from "@/components/MessageBoardComponent.vue";
import ConfigModal from "@/components/modals/ConfigModal.vue";
import StreakModal from "@/components/modals/StreakModal.vue";
import GraphModal from "@/components/modals/GraphModal.vue";
import LeaderboardModal from "@/components/modals/LeaderboardModal.vue";
import ShareModal from "@/components/modals/ShareModal.vue";
import CreatePostModal from "@/components/modals/CreatePostModal.vue";
import EditProfileModal from "@/components/modals/EditProfileModal.vue";
import { computed } from "vue";
// import { useUserStore } from "@/stores/user";
import { useModalStore } from "@/stores/modal";

// const userStore = useUserStore();
const modalStore = useModalStore();
// const isLoading = computed(() => userStore.getIsLoading);
const modalOpen = computed(() => modalStore.getModalOpen);
const configModal = computed(() => modalStore.getConfigModal);
const streakModal = computed(() => modalStore.getStreakModal);
const graphModal = computed(() => modalStore.getGraphModal);
const leaderboardModal = computed(() => modalStore.getLeaderboardModal);
const shareModal = computed(() => modalStore.getShareModal);
const createPostModal = computed(() => modalStore.getCreatePostModal);
const editProfileModal = computed(() => modalStore.getEditProfileModal);

const handleCloseModal = () => {
  modalStore.setCloseAllModals();
};
</script>
