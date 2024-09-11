<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    @click.self="closeModal"
  >
    <div
      class="bg-white rounded-lg p-8 max-w-sm w-full max-h-[75vh] overflow-y-auto"
    >
      <h2 class="text-2xl font-bold mb-4">Edit Profile</h2>
      <form @submit.prevent="updateProfile">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700"
            >Username</label
          >
          <input
            type="text"
            id="username"
            v-model="username"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700"
            >Profile Icon</label
          >
          <div class="grid grid-cols-4 gap-2 mt-2">
            <div
              v-for="icon in icons"
              :key="icon.id"
              @click="selectIcon(icon.id)"
              class="cursor-pointer p-1 rounded-md"
              :class="{ 'bg-blue-100': selectedIcon === icon.id }"
            >
              <img
                :src="`/images/profile/${icon.path}`"
                :alt="icon.path"
                class="w-full h-auto"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-end space-x-2">
          <button
            type="button"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            @click="closeModal"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const selectedIcon = ref(userStore.backendUserData?.icon || "");
const username = ref(userStore.backendUserData?.username || "");
const emit = defineEmits(["close", "update"]);
const icons = ref([]);

onMounted(async () => {
  // Fetch the list of icons from the server or use a predefined list
  icons.value = [
    { id: 0, path: "0.png" },
    { id: 1, path: "1.png" },
    { id: 2, path: "2.png" },
    { id: 3, path: "3.png" },
    { id: 4, path: "4.png" },
    { id: 5, path: "5.png" },
    { id: 6, path: "6.png" },
    { id: 7, path: "7.png" },
  ];
});

const selectIcon = (iconId) => {
  selectedIcon.value = iconId;
};

const closeModal = () => {
  emit("close");
};

const updateProfile = () => {
  if (username.value && selectedIcon.value !== "") {
    console.log(username.value, selectedIcon.value);
    userStore.setEditProfile({
      username: username.value,
      icon: selectedIcon.value,
    });
    closeModal();
  } else {
    alert("Please enter a username and select an icon.");
  }
};
</script>
