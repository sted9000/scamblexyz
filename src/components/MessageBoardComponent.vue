<template>
  <div class="h-full flex flex-col w-full mt-4">
    <div
      class="flex-1 flex flex-col bg-gray-100 rounded-lg shadow-md overflow-hidden"
    >
      <div class="p-4">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-800 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            Message Board
          </h2>
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
            New Post
          </button>
        </div>
      </div>

      <div v-if="posts" class="flex-1 overflow-y-auto px-4 pb-4">
        <div v-if="posts.length > 0" class="space-y-4">
          <MessageBoardPost v-for="post in posts" :key="post.id" :post="post" />
        </div>
        <div v-else class="flex justify-center items-center h-full">
          <p class="text-gray-500 text-lg">No posts</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MessageBoardPost from "@/components/MessageBoardPost.vue";
import { computed, onMounted } from "vue";
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
</script>
