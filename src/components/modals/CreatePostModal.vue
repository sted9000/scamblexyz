<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    @click.self="closeModal"
  >
    <div
      class="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
    >
      <h2 class="text-2xl font-bold mb-4">Create New Post</h2>
      <form @submit.prevent="submitPost" class="space-y-4">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700"
            >Title</label
          >
          <input
            type="text"
            id="title"
            v-model="postTitle"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
          />
        </div>
        <div>
          <label for="body" class="block text-sm font-medium text-gray-700"
            >Body</label
          >
          <textarea
            id="body"
            v-model="postBody"
            rows="4"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Category</label
          >
          <div class="flex space-x-2">
            <label
              v-for="category in categories"
              :key="category.value"
              :class="[
                'flex items-center px-3 py-1 rounded border text-sm cursor-pointer transition-colors duration-200',
                postCategory === category.value
                  ? `${category.activeClass}`
                  : `${category.inactiveClass}`,
              ]"
            >
              <input
                type="radio"
                :value="category.value"
                v-model="postCategory"
                class="hidden"
              />
              {{ category.label }}
            </label>
          </div>
        </div>
        <div class="flex justify-end space-x-2">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useModalStore } from "@/stores/modal";
import { useBoardStore } from "@/stores/board";
import { useUserStore } from "@/stores/user";
const modalStore = useModalStore();
const boardStore = useBoardStore();
const userStore = useUserStore();

const postTitle = ref("");
const postBody = ref("");
const postCategory = ref("newSites");
const userName = computed(() => userStore.userName);

const categories = [
  {
    value: "news",
    label: "News",
    activeClass: "bg-orange-500 border-orange-600 text-white",
    inactiveClass:
      "bg-white text-orange-500 border-orange-300 hover:bg-orange-100",
  },
  {
    value: "promos",
    label: "Promos",
    activeClass: "bg-pink-500 border-pink-600 text-white",
    inactiveClass: "bg-white text-pink-500 border-pink-300 hover:bg-pink-100",
  },
  {
    value: "other",
    label: "Other",
    activeClass: "bg-purple-500 border-purple-600 text-white",
    inactiveClass:
      "bg-white text-purple-500 border-purple-300 hover:bg-purple-100",
  },
];

const closeModal = () => {
  modalStore.setCloseAllModals();
};

const submitPost = () => {
  const newPost = {
    title: postTitle.value,
    content: postBody.value,
    category: postCategory.value,
    userName: userName.value,
  };

  boardStore.addPost(newPost);
  closeModal();
};
</script>
