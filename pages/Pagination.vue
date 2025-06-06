<template>
  <nav
    class="flex items-center justify-center space-x-1 mt-4"
    aria-label="Pagination Navigation"
    v-if="totalPages > 1"
  >
    <button
      class="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
      :disabled="currentPage === 1"
      @click="$emit('page-changed', currentPage - 1)"
      aria-label="Previous Page"
    >
      Prev
    </button>

    <button
      v-for="page in pageNumbers"
      :key="page"
      @click="$emit('page-changed', page)"
      :class="[
        'px-3 py-1 rounded-md border border-gray-300',
        page === currentPage ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
      ]"
      :aria-current="page === currentPage ? 'page' : null"
    >
      {{ page }}
    </button>

    <button
      class="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
      :disabled="currentPage === totalPages"
      @click="$emit('page-changed', currentPage + 1)"
      aria-label="Next Page"
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
