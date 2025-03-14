<template>
  <div v-if="show" class="fixed bottom-4 right-4 p-4 z-50">
    <div :class="toastClasses" class="text-white rounded-lg shadow-lg p-4 flex flex-col">
      <div class="flex items-center justify-between">
        <strong class="text-lg font-semibold">{{ title }}</strong>
        <button type="button" class="text-white hover:text-gray-200" @click="hideToast" aria-label="Close">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="mt-2">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    duration: {
      type: Number,
      default: 15000, // Auto-dismiss after 15 seconds
    },
    // You can optionally pass in default title, message, or variant
    defaultTitle: {
      type: String,
      default: 'Notification'
    },
    defaultVariant: {
      type: String,
      default: 'green'
    },
  },
  data() {
    return {
      show: false,
      message: '',
      title: '',
      variant: '',
      timer: null,
    };
  },
  computed: {
    toastClasses() {
      // This will produce a class such as "bg-green-600"
      return `bg-${this.variant}-600`;
    },
  },
  methods: {
    showToast(message, title = this.defaultTitle, variant = this.defaultVariant) {
      this.message = message;
      this.title = title;
      this.variant = variant;
      this.show = true;

      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.hideToast();
      }, this.duration);
    },
    hideToast() {
      this.show = false;
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
