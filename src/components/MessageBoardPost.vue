<template>
  <div class="bg-gray-50 border border-gray-300 rounded p-3 mb-4">
    <div class="flex items-start">
      <div class="flex flex-col items-center mr-4">
        <button
          @click="upvote"
          class="text-gray-400 hover:text-orange-500 focus:outline-none"
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
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
        <span class="text-sm font-bold text-gray-700">{{
          localUpvoteCount
        }}</span>
      </div>
      <div class="flex-grow cursor-pointer" @click="toggleExpand">
        <h3 class="text-lg font-semibold mb-1">{{ post.Title }}</h3>
        <p class="text-xs text-gray-500 mb-2">
          Posted by {{ post.UserName }} {{ howLongAgo(post.Timestamp) }} ago
        </p>
        <p v-if="!expanded" class="text-sm text-gray-700 mb-2">
          {{ truncatedContent }}
        </p>
        <p v-else class="text-sm text-gray-700 mb-2">{{ post.Content }}</p>
        <div class="flex text-xs text-gray-500 mt-2">
          <span class="mr-4">
            {{
              post.comments.length === 0
                ? "Add a comment"
                : expanded
                ? "Collapse"
                : "Expand"
            }}
          </span>
          <span class="mr-4"> {{ post.comments.length }} Comments </span>
        </div>
      </div>
    </div>
    <div v-if="expanded" class="mt-4 border-t border-gray-200 pt-4">
      <div v-for="comment in post.comments" :key="comment.PK" class="mb-3">
        <div class="flex items-start">
          <div class="flex flex-col items-center mr-2">
            <button
              @click="upvoteComment(comment)"
              class="text-gray-400 hover:text-orange-500 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
            <span class="text-xs font-bold text-gray-700">
              {{ localCommentUpvoteCounts.get(comment.SK) }}
            </span>
          </div>
          <div class="flex-grow">
            <p class="text-xs text-gray-500 mb-1">
              {{ comment.UserName }} · {{ howLongAgo(comment.Timestamp) }} ago
            </p>
            <p class="text-sm text-gray-700">{{ comment.Comment }}</p>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <textarea
          v-model="comment"
          placeholder="Write a comment..."
          class="w-full p-2 border border-gray-300 rounded"
          :class="{ 'border-red-500': commentError }"
        ></textarea>
        <p v-if="commentError" class="text-red-500 text-xs mt-1">
          {{ commentError }}
        </p>
        <button
          @click="addComment"
          class="mt-2 px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          Add Comment
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, reactive } from "vue";
import { useBoardStore } from "@/stores/board";
import { useUserStore } from "@/stores/user";
const boardStore = useBoardStore();
const userStore = useUserStore();

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const userName = computed(() => {
  return userStore.userName;
});

const expanded = ref(false);
const comment = ref("");
const commentError = ref("");

const howLongAgo = (timestamp) => {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return `${seconds}s`;
};

const truncatedContent = computed(() => {
  return props.post.Content.length > 100
    ? props.post.Content.slice(0, 100) + "..."
    : props.post.Content;
});

const toggleExpand = () => {
  expanded.value = !expanded.value;
};

// Logic for updating the upvote count
// Note that we update the local state
// Then we update the store and the backend...
// without updating the state in the store to...
// avoid refiltering and moving the posts in the list
const localUpvoteCount = ref(props.post.UpvoteCount);
const localCommentUpvoteCounts = reactive(
  new Map(
    props.post.comments.map((comment) => [comment.SK, comment.UpvoteCount])
  )
);
const upvote = () => {
  localUpvoteCount.value++;
  boardStore.setUpdatePost({
    updateType: "upvote",
    PK: props.post.PK,
    SK: props.post.SK,
  });
};
const upvoteComment = (comment) => {
  const currentCount = localCommentUpvoteCounts.get(comment.SK) || 0;
  localCommentUpvoteCounts.set(comment.SK, currentCount + 1);
  boardStore.setUpdateComment({
    updateType: "upvote",
    PK: props.post.PK,
    SK: comment.SK,
  });
};

const validateComment = () => {
  commentError.value = "";
  if (!comment.value.trim()) {
    commentError.value = "Comment cannot be empty";
    return false;
  }
  if (comment.value.length > 500) {
    commentError.value = "Comment must be 500 characters or less";
    return false;
  }
  return true;
};

const addComment = () => {
  if (validateComment()) {
    boardStore.setAddComment({
      PK: props.post.PK,
      comment: comment.value,
      userName: userName.value,
    });
    // Clear the comment input
    comment.value = "";
  }
};
</script>
