<template>
  <nav
    class="flex items-center justify-center space-x-1 mt-4"
    aria-label="Pagination Navigation"
    v-if="totalPages > 1"
  >
    <button
      class="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="currentPage === 1 || disabled"
      @click="$emit('page-changed', currentPage - 1)"
      aria-label="Previous Page"
      :aria-disabled="currentPage === 1 || disabled"
      tabindex="0"
    >
      Prev
    </button>

    <button
      v-for="page in pageNumbers"
      :key="page"
      @click="$emit('page-changed', page)"
      :class="[
        'px-3 py-1 rounded-md border border-gray-300',
        page === currentPage
          ? 'bg-blue-600 text-white cursor-default'
          : 'bg-white text-gray-700 hover:bg-gray-100 cursor-pointer'
      ]"
      :aria-current="page === currentPage ? 'page' : null"
      :disabled="disabled"
      :aria-disabled="disabled"
      tabindex="0"
    >
      {{ page }}
    </button>

    <button
      class="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="currentPage === totalPages || disabled"
      @click="$emit('page-changed', currentPage + 1)"
      aria-label="Next Page"
      :aria-disabled="currentPage === totalPages || disabled"
      tabindex="0"
    >
      Next
    </button>
  </nav>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    pageNumbers() {
      const pages = [];
      // Show max 5 pages for compactness, adjust logic as needed
      let start = Math.max(this.currentPage - 2, 1);
      let end = Math.min(start + 4, this.totalPages);

      if (end - start < 4) {
        start = Math.max(end - 4, 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    }
  }
};
</script>
