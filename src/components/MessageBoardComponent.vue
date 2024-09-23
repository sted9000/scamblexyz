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
            <span class="sm:inline hidden">Message Board</span>
            <span class="sm:hidden inline">Board</span>
          </h2>
          <div class="flex items-center">
            <select
              v-model="currentFilter"
              class="px-3 py-1 rounded text-base bg-gray-100 text-gray-500 hover:bg-gray-200 focus:outline-none transition-colors duration-200 cursor-pointer appearance-none pr-8 relative text-right mr-2"
            >
              <option value="recommended">Recommended</option>
              <option value="latest">Latest</option>
              <option value="news">News</option>
              <option value="promos">Promos</option>
              <option value="other">Other</option>
            </select>
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
              <span class="sm:inline hidden">New Post</span>
              <span class="sm:hidden inline">New</span>
            </button>
          </div>
        </div>
      </div>

      <div v-if="posts" class="flex-1 overflow-y-auto px-4 pb-4">
        <div v-if="filteredPosts.length > 0" class="space-y-4">
          <MessageBoardPost
            v-for="post in filteredPosts"
            :key="`${post.SK}-${currentFilter}`"
            :post="post"
          />
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
import { computed, onMounted, ref } from "vue";
import { useBoardStore } from "@/stores/board";
import { useModalStore } from "@/stores/modal";

const boardStore = useBoardStore();
const modalStore = useModalStore();
const currentFilter = ref("recommended");
const posts = computed(() => boardStore.getPosts);

const filteredPosts = computed(() => {
  if (currentFilter.value === "recommended") {
    return [...posts.value].sort((a, b) => {
      const aUpvotes =
        a.UpvoteCount +
        a.comments.reduce((acc, curr) => acc + curr.UpvoteCount, 0);
      const bUpvotes =
        b.UpvoteCount +
        b.comments.reduce((acc, curr) => acc + curr.UpvoteCount, 0);
      return bUpvotes - aUpvotes;
    });
  } else if (currentFilter.value === "latest") {
    return [...posts.value].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  } else {
    return posts.value.filter((post) => post.Category === currentFilter.value);
  }
});

const fetchMessages = async () => {
  await boardStore.fetchPosts();
};

onMounted(fetchMessages);

const handleCreateNewPost = () => {
  modalStore.setOpenModal("createPost");
};
</script>

<style scoped>
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1em 1em;
}
</style>
