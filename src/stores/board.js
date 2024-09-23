import { defineStore } from "pinia";
import { authenticatedApiCall, handleError } from "../apiService";

export const useBoardStore = defineStore("board", {
  state: () => ({
    posts: [],
    loading: false,
  }),
  getters: {
    getPosts: (state) => {
      return state.posts ?? [];
    },
    getLoading: (state) => {
      return state.loading;
    },
  },
  actions: {
    async fetchPosts() {
      try {
        this.loading = true;
        const response = await authenticatedApiCall("GET", "/post");
        console.log("Message board response:", response);
        this.posts = response.data;

        this.loading = false;
      } catch (error) {
        handleError(error);
      }
    },
    async addPost(post) {
      try {
        this.loading = true;
        const response = await authenticatedApiCall("POST", "/post", post);
        console.log("Message board response:", response);
        // add the new post to the posts array to front of the array
        this.posts.unshift(response.data);

        this.loading = false;
      } catch (error) {
        handleError(error);
      }
    },
    async setAddComment(comment) {
      try {
        this.loading = true;
        const response = await authenticatedApiCall(
          "POST",
          "/comment",
          comment
        );
        console.log("Message board response:", response);
        // find the post in the array and update it
        const index = this.posts.findIndex((p) => p.PK === comment.PK);
        // add the comment to the post's comments array
        this.posts[index].comments.push(response.data);
        this.loading = false;
      } catch (error) {
        handleError(error);
      }
    },
    async setUpdatePost(post) {
      try {
        // Note we are not updating the comments here
        // We did that in the component and we are trying
        // to avoid reactivity and posts moving in the list
        this.loading = true;
        await authenticatedApiCall("PATCH", "/post", post);
        this.loading = false;
      } catch (error) {
        handleError(error);
      }
    },
    async setUpdateComment(comment) {
      try {
        // Note we are not updating the comments here
        // We did that in the component and we are trying
        // to avoid reactivity and posts moving in the list
        this.loading = true;
        await authenticatedApiCall("PATCH", "/comment", comment);
        this.loading = false;
      } catch (error) {
        handleError(error);
      }
    },
  },
});
