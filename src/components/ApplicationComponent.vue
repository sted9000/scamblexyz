<template>
  <div class="flex flex-col bg-white h-screen overflow-hidden">
    <header
      class="w-full border-b-2 border-gray-200 px-8 p-4 flex justify-between items-center"
    >
      <div class="text-2xl font-bold animated-text">{{ APP_NAME }}</div>
      <ScrollingTickerComponent class="flex-grow mx-4" />
      <div class="flex items-center">
        <button @click="modalStore.setOpenModal('editProfile')" class="w-6 h-6">
          <img
            :src="`/images/profile/${userIcon}.png`"
            alt="User Avatar"
            class="w-full h-full rounded-full object-contain"
          />
        </button>
        <button @click="authStore.handleSignOut" class="ml-4 text-gray-600 hover:text-gray-800 flex items-center">
          <ArrowLeftEndOnRectangleIcon class="w-6 h-6 mr-1" />
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Left Sidebar -->
      <nav class="w-56 text-gray-900 hidden md:block custom-scroll">
        <NavMenu />
      </nav>

      <!-- Mobile Drawer -->
      <div class="md:hidden">
        <button @click="toggleDrawer" class="p-4">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        <div
          v-if="isDrawerOpen"
          class="fixed inset-0 bg-gray-800 bg-opacity-75 z-50"
        >
          <div class="w-64 bg-gray-800 text-white h-full">
            <button @click="toggleDrawer" class="p-4">Close</button>
            <NavMenu />
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-grow md:w-1/2 lg:w-7/12 custom-scroll">
        <HomeView v-if="currentPage === 'Home'" :title="currentPage" />
        <CheckinView
          v-else-if="currentPage === 'Checkins'"
          :title="currentPage"
        />
        <BonusesView
          v-else-if="currentPage === 'Bonuses'"
          :title="currentPage"
        />
        <PostcardView
          v-else-if="currentPage === 'Postcards'"
          :title="currentPage"
        />
        <GamesView
          v-else-if="currentPage === 'Games'"
          :title="currentPage"
        />
        <LeaderboardView
          v-else-if="currentPage === 'Leaderboards'"
          :title="currentPage"
        />
        <ReviewView
          v-else-if="currentPage === 'Reviews'"
          :title="currentPage"
        />
        <ConfigView v-else-if="currentPage === 'Config'" :title="currentPage" />
        <AboutView v-else-if="currentPage === 'About'" :title="currentPage" />
      </div>

      <!-- Right Sidebar -->
      <div v-if="currentPage !== 'Leaderboards' && currentPage !== 'About'" class="w-96 hidden lg:block custom-scroll">
        <SideLeaderboard :currentPage="currentPage" />
      </div>

      <!-- Modals -->
      <div
        v-if="modalOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-40"
      ></div>
      <ConfigModal v-if="configModal" @close="handleCloseModal" />
      <EditProfileModal v-if="editProfileModal" @close="handleCloseModal" />
      <NewBatchModal v-if="newBatchModal" @close="handleCloseModal" />
      <AddDropModal v-if="addDropModal" @close="handleCloseModal" />
      <UpdateBatchModal v-if="updateBatchModal" @close="handleCloseModal" />
      <RejectionModal v-if="rejectionModal" @close="handleCloseModal" />
      <BatchModal v-if="batchModal" @close="handleCloseModal" />
      <NewBonusModal v-if="newBonusModal" @close="handleCloseModal" />
      <PostcardSiteModal v-if="postcardSiteModal" @close="handleCloseModal" />
      <CheckinsHintModal v-if="checkinsHintModal" @close="handleCloseModal" />
      <BonusesHintModal v-if="bonusesHintModal" @close="handleCloseModal" />
      <PostcardsHintModal v-if="postcardsHintModal" @close="handleCloseModal" />
    </div>
  </div>

  <!-- Floating Action Buttons -->
  <div class="fixed bottom-4 right-4 flex flex-row space-x-2">
    <button
      @click="modalStore.setOpenModal('newBonus')"
      class="btn btn-secondary flex items-center gap-2 px-4"
    >
      <span>New Bonus</span>
      <PlusIcon class="w-5 h-5" />
    </button>
    <button
      @click="modalStore.setOpenModal('newBatch')"
      class="btn btn-accent flex items-center gap-2 px-4"
    >
      <span class="text-white">Cards Sent</span>
      <EnvelopeIcon class="w-5 h-5 text-white" />
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import "@/assets/css/animatedText.css";
import NavMenu from "@/components/NavMenu.vue";
import ScrollingTickerComponent from "@/components/ScrollingTickerComponent.vue";
import HomeView from "@/components/views/HomeView.vue";
import CheckinView from "@/components/views/CheckinView.vue";
import BonusesView from "@/components/views/BonusesView.vue";
import PostcardView from "@/components/views/PostcardView.vue";
import GamesView from "@/components/views/GamesView.vue";
import LeaderboardView from "@/components/views/LeaderboardView.vue";
import ReviewView from "@/components/views/ReviewView.vue";
import ConfigView from "@/components/views/ConfigView.vue";
import AboutView from "@/components/views/AboutView.vue";
import SideLeaderboard from "@/components/leaderboards/SideLeaderboard.vue";
import ConfigModal from "@/components/modals/ConfigModal.vue";
import NewBatchModal from "@/components/modals/NewBatchModal.vue";
import AddDropModal from "@/components/modals/AddDropModal.vue";
import UpdateBatchModal from "@/components/modals/UpdateBatchModal.vue";
import BatchModal from "@/components/modals/BatchModal.vue";
import EditProfileModal from "@/components/modals/EditProfileModal.vue";
import NewBonusModal from "@/components/modals/NewBonusModal.vue";
import RejectionModal from "@/components/modals/RejectionModal.vue";
import PostcardSiteModal from "@/components/modals/PostcardSiteModal.vue";
import CheckinsHintModal from "@/components/modals/CheckinsHintModal.vue";
import BonusesHintModal from "@/components/modals/BonusesHintModal.vue";
import PostcardsHintModal from "@/components/modals/PostcardsHintModal.vue";
import { useUiStore } from "@/stores/ui";
import { useModalStore } from "@/stores/modal";
import { APP_NAME } from "@/constants";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { useRealtimeStore } from "@/stores/realtime";
import {
  PlusIcon,
  EnvelopeIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/vue/24/outline";
// New Stores
import { useCheckinStore } from "@/stores/checkin";
const checkinStore = useCheckinStore();
const userStore = useUserStore();
const realtimeStore = useRealtimeStore();
onMounted(() => {
  userStore.fetchUserSites();
  checkinStore.fetchCheckin();
  realtimeStore.initializeSocket();
});

const authStore = useAuthStore();
const uiStore = useUiStore();
const userIcon = computed(() => authStore.getUserIcon);
const modalStore = useModalStore();
const modalOpen = computed(() => modalStore.getModalOpen);
const configModal = computed(() => modalStore.getConfigModal);
const newBatchModal = computed(() => modalStore.getNewBatchModal);
const addDropModal = computed(() => modalStore.getAddDropModal);
const updateBatchModal = computed(() => modalStore.getUpdateBatchModal);
const batchModal = computed(() => modalStore.getBatchModal);
const editProfileModal = computed(() => modalStore.getEditProfileModal);
const newBonusModal = computed(() => modalStore.getNewBonusModal);
const rejectionModal = computed(() => modalStore.getRejectionModal);
const postcardSiteModal = computed(() => modalStore.getPostcardSiteModal);
const checkinsHintModal = computed(() => modalStore.getCheckinsHintModal);
const bonusesHintModal = computed(() => modalStore.getBonusesHintModal);
const postcardsHintModal = computed(() => modalStore.getPostcardsHintModal);
const isDrawerOpen = ref(false);
const currentPage = computed(() => uiStore.getView);
const toggleDrawer = () => (isDrawerOpen.value = !isDrawerOpen.value);

const handleCloseModal = () => {
  modalStore.setCloseAllModals();
};
</script>

<style scoped>
.custom-scroll {
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.custom-scroll::-webkit-scrollbar {
  display: none;
}
</style>
