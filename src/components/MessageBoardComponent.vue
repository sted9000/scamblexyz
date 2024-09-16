<template>
  <div class="h-auto md:h-full flex flex-col w-full">
    <div class="py-4">
      <div class="flex justify-between items-center">
        <div class="hidden md:flex space-x-2">
          <button
            @click="filterPosts('all')"
            :class="[
              'px-3 py-1 rounded border text-sm hover:bg-blue-600 hover:text-white transition-colors duration-200',
              currentFilter === 'all'
                ? 'bg-blue-500 text-white border-blue-600'
                : 'bg-white text-blue-500 border-blue-300',
            ]"
          >
            All
          </button>
          <button
            @click="filterPosts('newSites')"
            :class="[
              'px-3 py-1 rounded border text-sm hover:bg-orange-600 hover:text-white transition-colors duration-200',
              currentFilter === 'newSites'
                ? 'bg-orange-500 text-white border-orange-600'
                : 'bg-white text-orange-500 border-orange-300',
            ]"
          >
            New Sites
          </button>
          <button
            @click="filterPosts('promos')"
            :class="[
              'px-3 py-1 rounded border text-sm hover:bg-pink-600 hover:text-white transition-colors duration-200',
              currentFilter === 'promos'
                ? 'bg-pink-500 text-white border-pink-600'
                : 'bg-white text-pink-500 border-pink-300',
            ]"
          >
            Promos
          </button>
          <button
            @click="filterPosts('other')"
            :class="[
              'px-3 py-1 rounded border text-sm hover:bg-purple-600 hover:text-white transition-colors duration-200',
              currentFilter === 'other'
                ? 'bg-purple-500 text-white border-purple-600'
                : 'bg-white text-purple-500 border-purple-300',
            ]"
          >
            Other
          </button>
        </div>
        <h2 class="text-xl font-semibold md:hidden">Message Board</h2>
        <div class="flex-grow md:flex-grow-0"></div>
        <button
          @click="handleCreateNewPost"
          class="px-3 py-1 rounded border text-sm bg-green-500 text-white hover:bg-green-600 transition-colors duration-200 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create
        </button>
      </div>
    </div>
    <div v-if="posts" class="flex-grow md:overflow-y-auto">
      <div v-if="filteredPosts.length > 0" class="space-y-4">
        <MessageBoardPost
          v-for="post in filteredPosts"
          :key="post.id"
          :post="post"
          :categoryColor="getCategoryColor(post.Category)"
        />
      </div>
      <div v-else class="flex justify-center items-center h-full">
        <p class="text-gray-500 text-lg">No posts</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import MessageBoardPost from "@/components/MessageBoardPost.vue";
import { ref, computed, onMounted } from "vue";
import { useBoardStore } from "@/stores/board";
import { useModalStore } from "@/stores/modal";
const boardStore = useBoardStore();
const modalStore = useModalStore();

const posts = computed(() => boardStore.getPosts);

const fetchMessages = async () => {
  await boardStore.fetchPosts();
};

onMounted(fetchMessages);

const handleCreateNewPost = () => {
  modalStore.setOpenModal("createPost");
};

const currentFilter = ref("all");

const filterPosts = (filter) => {
  currentFilter.value = filter;
};

const filteredPosts = computed(() => {
  if (!posts.value) {
    return [];
  }
  if (currentFilter.value === "all") {
    return posts.value;
  } else {
    return posts.value.filter((post) => post.Category === currentFilter.value);
  }
});

const getCategoryColor = (category) => {
  switch (category) {
    case "newSites":
      return "text-orange-400";
    case "promos":
      return "text-pink-400";
    case "other":
      return "text-purple-400";
    default:
      return "text-blue-400";
  }
};
</script>
