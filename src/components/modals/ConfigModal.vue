<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50"
    @click.self="handleCloseModal"
  >
    <div
      class="bg-white rounded-lg p-8 max-w-sm w-full max-h-[75vh] overflow-y-auto"
    >
      <h2 class="text-2xl font-bold mb-4">Checkin Configuration</h2>
      <p class="text-gray-600 mb-4">Enable the sites that you check in to</p>
      <div class="space-y-4">
        <div
          v-for="site in sites"
          :key="site.id"
          class="flex items-center justify-between"
        >
          <div class="flex items-center">
            <img :src="site.imagePath" alt="Site Icon" class="w-6 h-6 mr-2" />
            <span>{{ site.fullName }}</span>
          </div>
          <label class="switch">
            <input
              type="checkbox"
              :checked="site.enabled"
              @change="toggleSite(site.SK)"
            />
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <div class="mt-6 text-right">
        <button
          @click="saveConfig"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, computed } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const sites = computed(() => userStore.getSites);
const emit = defineEmits(["close"]);

const changedSites = ref({});

const toggleSite = (siteId) => {
  if (siteId in changedSites.value) {
    delete changedSites.value[siteId];
  } else {
    changedSites.value[siteId] = !sites.value.find((site) => site.SK === siteId)
      .enabled;
  }
};

const handleCloseModal = () => {
  emit("close");
};

const saveConfig = async () => {
  try {
    if (Object.keys(changedSites.value).length === 0) {
      emit("close");
      return;
    }
    await userStore.updateEnabledSites(changedSites.value);
    changedSites.value = {}; // Reset changed sites after successful update
    emit("close");
  } catch (error) {
    console.error("Error saving configuration:", error);
  }
};
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  transform: translateX(18px);
}

.slider.round {
  border-radius: 22px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
