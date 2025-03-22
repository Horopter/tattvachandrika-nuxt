<template>
  <div v-if="show" class="fixed bottom-4 right-4 p-4 z-50">
    <div 
      :class="toastClasses" 
      class="rounded-lg shadow-xl p-4 flex items-start space-x-4 min-w-[320px] max-w-md transform transition-all duration-300 ease-out"
      :style="{ animation: 'slideIn 0.5s ease-out' }"
    >
      <!-- Icon based on type -->
      <div class="flex-shrink-0">
        <svg v-if="type === 'success'" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg v-else-if="type === 'error'" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <svg v-else-if="type === 'info'" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg v-else class="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>

      <div class="flex-1">
        <div class="flex items-center justify-between">
          <p :class="titleClasses" class="text-lg font-medium">{{ title }}</p>
          <button 
            type="button" 
            :class="closeButtonClasses"
            class="hover:opacity-75 transition-opacity duration-200"
            @click="hideToast" 
            aria-label="Close"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p :class="messageClasses" class="mt-1">{{ message }}</p>

        <!-- Progress bar -->
        <div class="mt-3 w-full bg-gray-200 rounded-full h-1">
          <div 
            :class="progressBarClasses"
            class="h-1 rounded-full transition-all duration-300 ease-linear"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    duration: {
      type: Number,
      default: 5000,
    },
    defaultTitle: {
      type: String,
      default: 'Notification'
    },
    defaultType: {
      type: String,
      default: 'success'
    },
  },
  data() {
    return {
      show: false,
      message: '',
      title: '',
      type: '',
      timer: null,
      progress: 100,
      progressInterval: null,
    };
  },
  computed: {
    toastClasses() {
      return {
        'bg-green-100 border border-green-200': this.type === 'success',
        'bg-red-100 border border-red-200': this.type === 'error',
        'bg-blue-100 border border-blue-200': this.type === 'info',
        'bg-yellow-100 border border-yellow-200': this.type === 'warning',
      };
    },
    titleClasses() {
      return {
        'text-green-800': this.type === 'success',
        'text-red-800': this.type === 'error',
        'text-blue-800': this.type === 'info',
        'text-yellow-800': this.type === 'warning',
      };
    },
    messageClasses() {
      return {
        'text-green-700': this.type === 'success',
        'text-red-700': this.type === 'error',
        'text-blue-700': this.type === 'info',
        'text-yellow-700': this.type === 'warning',
      };
    },
    closeButtonClasses() {
      return {
        'text-green-500': this.type === 'success',
        'text-red-500': this.type === 'error',
        'text-blue-500': this.type === 'info',
        'text-yellow-500': this.type === 'warning',
      };
    },
    progressBarClasses() {
      return {
        'bg-green-500': this.type === 'success',
        'bg-red-500': this.type === 'error',
        'bg-blue-500': this.type === 'info',
        'bg-yellow-500': this.type === 'warning',
      };
    },
  },
  methods: {
    showToast(message, title = this.defaultTitle, type = this.defaultType) {
      // Map variant to type for backward compatibility
      const typeMap = {
        'success': 'success',
        'error': 'error',
        'info': 'info',
        'warning': 'warning',
        'green': 'success',
        'red': 'error',
        'blue': 'info',
        'yellow': 'warning'
      };

      this.message = message;
      this.title = title;
      this.type = typeMap[type] || this.defaultType;
      this.show = true;
      this.progress = 100;

      // Clear existing timers
      if (this.timer) clearTimeout(this.timer);
      if (this.progressInterval) clearInterval(this.progressInterval);

      // Set up progress bar
      const updateFrequency = 10;
      const totalSteps = this.duration / updateFrequency;
      const progressStep = 100 / totalSteps;

      this.progressInterval = setInterval(() => {
        this.progress = Math.max(0, this.progress - progressStep);
      }, updateFrequency);

      // Set up auto-dismiss
      this.timer = setTimeout(() => {
        this.hideToast();
      }, this.duration);
    },
    hideToast() {
      this.show = false;
      if (this.progressInterval) clearInterval(this.progressInterval);
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
