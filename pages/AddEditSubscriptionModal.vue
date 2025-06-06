<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
    tabindex="-1"
    role="dialog"
  >
    <div
      class="bg-white rounded-lg shadow-lg w-full max-w-lg overflow-auto max-h-[90vh]"
    >
      <div class="flex justify-between items-center p-4 border-b">
        <h5 class="text-xl font-semibold">{{ modalTitle }}</h5>
        <button
          type="button"
          class="text-gray-600 hover:text-gray-900"
          @click="close"
          aria-label="Close"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <div class="p-6">
        <form @submit.prevent="handleSubmit">
          <!-- Start Date -->
          <div class="mb-4">
            <label
              for="start_date"
              class="block text-sm font-medium text-gray-700"
              >Start Date</label
            >
            <flat-pickr
              v-model="localSubscription.start_date"
              :config="dateConfig"
              id="start_date"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base p-2"
              required
            />
          </div>
          <!-- Subscription Plan -->
          <div class="mb-4">
            <label
              for="subscription_plan"
              class="block text-sm font-medium text-gray-700"
              >Subscription Plan</label
            >
            <select
              id="subscription_plan"
              v-model="localSubscription.subscription_plan"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base p-2"
              required
            >
              <option
                v-for="plan in subscriptionPlans"
                :value="plan._id"
                :key="plan._id"
              >
                {{ plan.name }}
              </option>
            </select>
          </div>
          <!-- Payment Status -->
          <div class="mb-4">
            <label
              for="payment_status"
              class="block text-sm font-medium text-gray-700"
              >Payment Status</label
            >
            <select
              id="payment_status"
              v-model="localSubscription.payment_status"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base p-2"
              required
              @change="confirmPaymentStatus"
            >
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
          <!-- Payment Mode -->
          <div class="mb-4">
            <label
              for="payment_mode"
              class="block text-sm font-medium text-gray-700"
              >Payment Mode</label
            >
            <select
              id="payment_mode"
              v-model="localSubscription.payment_mode"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base p-2"
              required
            >
              <option
                v-for="mode in paymentModes"
                :value="mode._id"
                :key="mode._id"
              >
                {{ mode.name }}
              </option>
            </select>
          </div>
          <!-- Payment ID -->
          <div class="mb-4">
            <label
              for="payment_id"
              class="block text-sm font-medium text-gray-700"
              >Payment ID</label
            >
            <input
              id="payment_id"
              v-model="localSubscription.payment_id"
              type="text"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base p-2"
              placeholder="Enter payment ID"
            />
          </div>
          <!-- Payment Date -->
          <div class="mb-4">
            <label
              for="payment_date"
              class="block text-sm font-medium text-gray-700"
              >Payment Date</label
            >
            <flat-pickr
              v-model="localSubscription.payment_date"
              :config="dateConfig"
              id="payment_date"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base p-2"
              required
            />
          </div>
          <div class="flex justify-end space-x-2">
            <button
              type="submit"
              class="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {{ modalButton }}
            </button>
            <button
              type="button"
              class="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              @click="close"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <!-- Payment Status Confirmation Modal -->
      <div
        v-if="showConfirmationModal"
        class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div class="bg-white p-4 rounded shadow">
          <p>Are you sure you want to set the payment status to 'Paid'?</p>
          <div class="mt-4 flex justify-end space-x-2">
            <button
              class="px-4 py-2 bg-green-500 text-white rounded"
              @click="handleConfirmation(true)"
            >
              Yes
            </button>
            <button
              class="px-4 py-2 bg-red-500 text-white rounded"
              @click="handleConfirmation(false)"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import dayjs from "dayjs";

export default {
  components: { flatPickr },
  props: {
    show: Boolean,
    subscription: {
      type: Object,
      default: () => ({}),
    },
    subscriptionPlans: {
      type: Array,
      default: () => [],
    },
    paymentModes: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    // Use a local copy of the subscription prop. If null, default to an empty object.
    const sub = this.subscription ?? {};
    return {
      localSubscription: {
        ...sub,
        start_date: sub.start_date
          ? dayjs(sub.start_date).format("YYYY-MM-DD")
          : dayjs().format("YYYY-MM-DD"),
        payment_date: sub.payment_date
          ? dayjs(sub.payment_date).format("YYYY-MM-DD")
          : dayjs().format("YYYY-MM-DD"),
      },
      showConfirmationModal: false,
      // Flatpickr configuration: underlying value in ISO ("Y-m-d"), display as dd-mm-yyyy.
      dateConfig: {
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "d-m-Y",
      },
    };
  },
  computed: {
    modalTitle() {
      return this.localSubscription && this.localSubscription._id
        ? "Edit Subscription"
        : "Add Subscription";
    },
    modalButton() {
      return this.localSubscription && this.localSubscription._id
        ? "Update"
        : "Add";
    },
  },
  watch: {
    subscription(newVal) {
      const sub = newVal ?? {};
      this.localSubscription = {
        ...sub,
        start_date: sub.start_date
          ? dayjs(sub.start_date).format("YYYY-MM-DD")
          : dayjs().format("YYYY-MM-DD"),
        payment_date: sub.payment_date
          ? dayjs(sub.payment_date).format("YYYY-MM-DD")
          : dayjs().format("YYYY-MM-DD"),
      };
    },
    'localSubscription.payment_mode': {
      handler(newVal) {
        const selectedMode = this.paymentModes.find(mode => mode._id === newVal);
        if (selectedMode && selectedMode.name.toLowerCase() === 'cash') {
          this.localSubscription.payment_id = 'NA';
        } else if (this.localSubscription.payment_id === 'NA') {
          this.localSubscription.payment_id = '';
        }
      },
      immediate: true
    }
  },
  created() {
    // Ensure the date fields are in ISO format for Flatpickr.
    if (this.localSubscription.start_date) {
      this.localSubscription.start_date = dayjs(
        this.localSubscription.start_date
      ).format("YYYY-MM-DD");
    }
    if (this.localSubscription.payment_date) {
      this.localSubscription.payment_date = dayjs(
        this.localSubscription.payment_date
      ).format("YYYY-MM-DD");
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    handleSubmit() {
      const payload = { ...this.localSubscription };
      if (payload.start_date) {
        payload.start_date = dayjs(payload.start_date).format("YYYY-MM-DD");
      }
      if (payload.payment_date) {
        payload.payment_date = dayjs(payload.payment_date).format("YYYY-MM-DD");
      }
      if (payload.end_date) {
        payload.end_date = dayjs(payload.end_date).format("YYYY-MM-DD");
      }
      this.$emit("save", payload);
      this.close();
    },
    confirmPaymentStatus() {
      if (this.localSubscription.payment_status === "Paid") {
        this.showConfirmationModal = true;
      }
    },
    handleConfirmation(confirm) {
      if (!confirm) {
        this.localSubscription.payment_status = "Pending";
      }
      this.showConfirmationModal = false;
    },
  },
};
</script>

<style scoped>
/* No additional styles needed when using Tailwind CSS */
</style>
