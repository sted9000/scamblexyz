<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-grow">
      <div
        class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col space-y-4"
      >
        <YourScoreComponent />
        <ScrollingTickerComponent />

        <div
          class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4"
        >
          <!-- Daily Checkin -->
          <div class="w-full lg:w-1/2 h-[50vh] md:h-[75vh] overflow-hidden">
            <DailyCheckinComponent />
          </div>

          <!-- Message Board -->
          <div class="w-full lg:w-1/2 h-[50vh] md:h-[75vh] overflow-hidden">
            <MessageBoardComponent />
          </div>
        </div>

        <!-- Streaks -->
        <div>
          <StreakComponent />
        </div>

        <div
          class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4"
        >
          <!-- Community Card -->
          <div class="w-full lg:w-1/2 h-[50vh] md:h-[75vh] overflow-hidden">
            <CommunityCardComponent />
          </div>

          <!-- Recent Drops -->
          <div class="w-full lg:w-1/2 h-[50vh] md:h-[75vh] overflow-hidden">
            <RecentDropsComponent />
          </div>
        </div>

        <!-- User Card -->
        <div class="h-[50vh] md:h-[75vh] overflow-hidden">
          <UserCardComponent />
        </div>
      </div>
    </div>

    <!-- Floating action buttons -->
    <div class="fixed bottom-4 right-4 flex space-x-2">
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
        @click="modalStore.setOpenModal('help')"
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
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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
    <LeaderboardModal v-if="leaderboardModal" @close="handleCloseModal" />
    <HelpModal v-if="helpModal" @close="handleCloseModal" />
    <CreatePostModal v-if="createPostModal" @close="handleCloseModal" />
    <EditProfileModal v-if="editProfileModal" @close="handleCloseModal" />
    <CardModal v-if="cardModal" @close="handleCloseModal" />
    <UpdateCardModal v-if="updateCardModal" @close="handleCloseModal" />
  </div>
</template>

<script setup>
import YourScoreComponent from "@/components/YourScoreComponent.vue";
import ScrollingTickerComponent from "@/components/ScrollingTickerComponent.vue";
import DailyCheckinComponent from "@/components/DailyCheckinComponent.vue";
import MessageBoardComponent from "@/components/MessageBoardComponent.vue";
import RecentDropsComponent from "@/components/RecentDropsComponent.vue";
import StreakComponent from "@/components/StreakComponent.vue";
import CommunityCardComponent from "@/components/CommunityCardComponent.vue";
import UserCardComponent from "@/components/UserCardComponent.vue";
import ConfigModal from "@/components/modals/ConfigModal.vue";
import CardModal from "@/components/modals/CardModal.vue";
import UpdateCardModal from "@/components/modals/UpdateCardModal.vue";
import HelpModal from "@/components/modals/HelpModal.vue";
import LeaderboardModal from "@/components/modals/LeaderboardModal.vue";
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
const helpModal = computed(() => modalStore.getHelpModal);
const leaderboardModal = computed(() => modalStore.getLeaderboardModal);
const cardModal = computed(() => modalStore.getCardModal);
const updateCardModal = computed(() => modalStore.getUpdateCardModal);
const createPostModal = computed(() => modalStore.getCreatePostModal);
const editProfileModal = computed(() => modalStore.getEditProfileModal);

const handleCloseModal = () => {
  modalStore.setCloseAllModals();
};
</script>
