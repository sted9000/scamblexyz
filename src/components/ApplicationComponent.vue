<template>
  <div class="flex flex-col bg-white h-screen overflow-hidden">
    <header
      class="w-full border-b-2 border-gray-200 px-8 p-4 flex justify-between items-center"
    >
      <div class="text-2xl font-bold animated-text">{{ APP_NAME }}</div>
      <ScrollingTickerComponent class="flex-grow mx-4" />
      <div class="flex items-center">
        <button @click="modalStore.setOpenModal('config')" class="mr-4">
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
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
        </button>
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

    <div class="flex flex-1 overflow-hidden">
      <nav class="w-56 text-gray-900 hidden md:block custom-scroll">
        <NavMenu @itemSelected="handlePageChange" />
      </nav>

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
            <NavMenu @itemSelected="handlePageChange" />
          </div>
        </div>
      </div>

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
        <AboutView v-else-if="currentPage === 'About'" :title="currentPage" />
      </div>

      <div class="w-96 hidden lg:block custom-scroll">
        <NewsArticlesComponent />
      </div>

      <div
        v-if="modalOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-40"
      ></div>

      <ConfigModal v-if="configModal" @close="handleCloseModal" />
      <CreatePostModal v-if="createPostModal" @close="handleCloseModal" />
      <EditProfileModal v-if="editProfileModal" @close="handleCloseModal" />
      <NewBatchModal v-if="newBatchModal" @close="handleCloseModal" />
      <AddDropModal v-if="addDropModal" @close="handleCloseModal" />
      <UpdateBatchModal v-if="updateBatchModal" @close="handleCloseModal" />
      <RejectionModal v-if="rejectionModal" @close="handleCloseModal" />
      <BatchModal v-if="batchModal" @close="handleCloseModal" />
      <NewBonusModal v-if="newBonusModal" @close="handleCloseModal" />
    </div>
  </div>
  <div class="fixed bottom-4 right-4 flex flex-col space-y-2">
    <button
      @click="modalStore.setOpenModal('newBonus')"
      class="btn btn-circle btn-secondary"
    >
      <PlusIcon class="w-6 h-6" />
    </button>
    <button
      @click="modalStore.setOpenModal('newBatch')"
      class="btn btn-circle btn-accent"
    >
      <EnvelopeIcon class="w-6 h-6" />
    </button>
    <button
      @click="modalStore.setOpenModal('addDrop')"
      class="btn btn-circle btn-accent"
    >
      <DownIcon class="w-6 h-6" />
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
import AboutView from "@/components/views/AboutView.vue";
import NewsArticlesComponent from "@/components/news/NewsArticlesComponent.vue";
import ConfigModal from "@/components/modals/ConfigModal.vue";
import NewBatchModal from "@/components/modals/NewBatchModal.vue";
import AddDropModal from "@/components/modals/AddDropModal.vue";
import UpdateBatchModal from "@/components/modals/UpdateBatchModal.vue";
import BatchModal from "@/components/modals/BatchModal.vue";
import CreatePostModal from "@/components/modals/CreatePostModal.vue";
import EditProfileModal from "@/components/modals/EditProfileModal.vue";
import NewBonusModal from "@/components/modals/NewBonusModal.vue";
import RejectionModal from "@/components/modals/RejectionModal.vue";
import { useModalStore } from "@/stores/modal";
import { APP_NAME } from "@/constants";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { useBonusStore } from "@/stores/bonus";
import { usePostcardStore } from "@/stores/postcard";
import { useLeaderboardStore } from "@/stores/leaderboard";
import {
  PlusIcon,
  EnvelopeIcon,
  ChevronDownIcon as DownIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/vue/24/outline";
// New Stores
import { useCheckinStore } from "@/stores/checkin";
const checkinStore = useCheckinStore();
const userStore = useUserStore();
const bonusStore = useBonusStore();
const postcardStore = usePostcardStore();
const leaderboardStore = useLeaderboardStore();
onMounted(() => {
  userStore.fetchUserSites();
  checkinStore.fetchCheckin();
  bonusStore.fetchCommunityBonus();
  postcardStore.fetchDrops();
  leaderboardStore.initializeSocket();
});

const authStore = useAuthStore();
const userIcon = computed(() => authStore.getUserIcon);
const modalStore = useModalStore();
const modalOpen = computed(() => modalStore.getModalOpen);
const configModal = computed(() => modalStore.getConfigModal);
const newBatchModal = computed(() => modalStore.getNewBatchModal);
const addDropModal = computed(() => modalStore.getAddDropModal);
const updateBatchModal = computed(() => modalStore.getUpdateBatchModal);
const batchModal = computed(() => modalStore.getBatchModal);
const createPostModal = computed(() => modalStore.getCreatePostModal);
const editProfileModal = computed(() => modalStore.getEditProfileModal);
const newBonusModal = computed(() => modalStore.getNewBonusModal);
const rejectionModal = computed(() => modalStore.getRejectionModal);

const isDrawerOpen = ref(false);
const currentPage = ref("Postcards");
const toggleDrawer = () => (isDrawerOpen.value = !isDrawerOpen.value);

const handleCloseModal = () => {
  modalStore.setCloseAllModals();
};
const handlePageChange = (page) => {
  console.log(page);
  currentPage.value = page;
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
