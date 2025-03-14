// ~/mixins/loadingMixin.js
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    /**
     * Wraps an async operation. The loader remains visible until the promise resolves,
     * and until all passed conditions are false.
     *
     * @param {Function} promiseFunc - A function that returns a Promise.
     * @param {Array|string|Function} [condition] - (Optional) Either:
     *    - An array of property names (strings) that should be false before hiding the loader,
     *    - A single property name (string), or
     *    - A function that returns a boolean indicating whether to keep the loader visible.
     *    If not provided, the loader will be hidden after the promise completes.
     */
    runWithLoader(promiseFunc, condition) {
      this.isLoading = true;
      return promiseFunc().finally(() => {
        const clearLoader = () => {
          let shouldWait = false;
          if (typeof condition === 'function') {
            shouldWait = condition();
          } else if (Array.isArray(condition)) {
            shouldWait = condition.some(key => !!this[key]);
          } else if (typeof condition === 'string') {
            shouldWait = !!this[condition];
          }
          if (shouldWait) {
            setTimeout(clearLoader, 50);
          } else {
            this.$nextTick(() => {
                this.isLoading = false;
            });
          }
        };
        clearLoader();
      });
    },
  },
};
