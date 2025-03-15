export default {
  data() {
    return {
      // Global counter of pending HTTP requests
      pendingRequests: 0,
    };
  },
  computed: {
    // Global loader is visible if any HTTP request is still pending
    isLoading() {
      return this.pendingRequests > 0;
    },
  },
  methods: {
    /**
     * Wraps an async operation.
     * The loader remains visible until the Promise returned by promiseFunc() settles.
     *
     * @param {Function} promiseFunc - A function that returns a Promise.
     * @returns {Promise} - The same promise, with the loader automatically toggled.
     */
    runWithLoader(promiseFunc) {
      this.pendingRequests++;
      return promiseFunc()
        .catch((error) => {
          console.error("Error during async operation:", error);
          throw error;
        })
        .finally(() => {
          this.pendingRequests--;
        });
    },
  },
};
