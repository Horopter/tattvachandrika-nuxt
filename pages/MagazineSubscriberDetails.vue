<template>
  <div class="container mx-auto mt-8 px-4 relative">
    <!-- Loader Component -->
    <Loader v-if="isLoading" />

    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb" class="mb-6">
      <ol class="flex items-center space-x-2 text-gray-700">
        <li>
          <router-link
            to="/HomePage"
            class="text-blue-600 hover:text-blue-800 font-semibold flex items-center"
          >
            Home
          </router-link>
        </li>
        <li><span class="text-gray-400">/</span></li>
        <li>
          <router-link
            to="/MagazineSubscribers"
            class="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Subscribers
          </router-link>
        </li>
        <li><span class="text-gray-400">/</span></li>
        <li class="text-gray-500 font-semibold" aria-current="page">
          {{ subscriber.name }}
        </li>
      </ol>
    </nav>

    <!-- Subscriber Details Card -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Main Info Card -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-3xl font-bold text-gray-800">
              {{ subscriber.name }}
            </h2>
            <span
              class="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold"
            >
              #{{ subscriber.registration_number }}
            </span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div class="flex items-start">
                <span class="text-gray-500 w-24 flex-shrink-0">Address:</span>
                <span class="text-gray-800 font-medium break-words">
                  {{ subscriber.address }}
                </span>
              </div>
              <div class="flex items-center">
                <span class="text-gray-500 w-24">City/Town:</span>
                <span class="text-gray-800 font-medium">
                  {{ subscriber.city_town }}
                </span>
              </div>
              <div class="flex items-center">
                <span class="text-gray-500 w-24">State:</span>
                <span class="text-gray-800 font-medium">
                  {{ subscriber.state }}
                </span>
              </div>
              <div class="flex items-center">
                <span class="text-gray-500 w-24">Pincode:</span>
                <span class="text-gray-800 font-medium">
                  {{ subscriber.pincode }}
                </span>
              </div>
            </div>
            <div class="space-y-4">
              <div class="flex items-center">
                <span class="text-gray-500 w-24">Phone:</span>
                <span class="text-gray-800 font-medium">
                  {{ subscriber.phone }}
                </span>
              </div>
              <div class="flex items-center">
                <span class="text-gray-500 w-24">Email:</span>
                <span class="text-gray-800 font-medium">
                  {{ subscriber.email }}
                </span>
              </div>
              <div class="flex items-center">
                <span class="text-gray-500 w-24">Category:</span>
                <span
                  class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                >
                  {{ getCategoryName(subscriber.category) }}
                </span>
              </div>
              <div class="flex items-center">
                <span class="text-gray-500 w-24">Type:</span>
                <span
                  class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                >
                  {{ getTypeName(subscriber.stype) }}
                </span>
              </div>
            </div>
          </div>
          <div class="mt-6 pt-6 border-t border-gray-200">
            <span class="text-gray-500">Notes:</span>
            <p class="mt-2 text-gray-800">
              {{ subscriber.notes || "No notes available" }}
            </p>
          </div>
        </div>
      </div>

      <!-- Quick Stats Card -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">
            Subscription Summary
          </h3>
          <div class="space-y-4">
            <div class="bg-blue-50 rounded-lg p-4">
              <div class="text-sm text-blue-600">Active Subscriptions</div>
              <div class="text-2xl font-bold text-blue-800">
                {{ activeSubscriptions.length }}
              </div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="text-sm text-gray-600">Inactive Subscriptions</div>
              <div class="text-2xl font-bold text-gray-800">
                {{ inactiveSubscriptions.length }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Subscription Button -->
    <button
      class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition duration-200 mb-6 flex items-center"
      @click="openAddSubscriptionModal"
    >
      <span class="mr-2">+</span> Add New Subscription
    </button>

    <!-- Enhanced Tabs -->
    <div class="bg-white rounded-xl shadow-lg mb-8">
      <div class="border-b border-gray-200">
        <ul class="flex -mb-px">
          <li class="mr-2">
            <button
              class="inline-block py-4 px-6 text-sm font-medium transition duration-200"
              :class="{
                'border-b-2 border-blue-600 text-blue-600': activeTab === 'active',
                'text-gray-500 hover:text-blue-600': activeTab !== 'active',
              }"
              @click="activeTab = 'active'"
            >
              Active Subscriptions
            </button>
          </li>
          <li>
            <button
              class="inline-block py-4 px-6 text-sm font-medium transition duration-200"
              :class="{
                'border-b-2 border-blue-600 text-blue-600': activeTab === 'inactive',
                'text-gray-500 hover:text-blue-600': activeTab !== 'inactive',
              }"
              @click="activeTab = 'inactive'"
            >
              Inactive Subscriptions
            </button>
          </li>
        </ul>
      </div>

      <!-- Subscription Table -->
      <div class="p-6">
        <!-- Active Subscriptions Table -->
        <div v-show="activeTab === 'active'">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="subscription in activeSubscriptions"
                :key="subscription._id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ formatDate(subscription.start_date) }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ formatDate(subscription.end_date) }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ getPlanName(subscription.subscription_plan) }}
                </td>
                <td class="px-6 py-4 text-sm">
                  <span
                    :class="`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      subscription.payment_status
                    )}`"
                  >
                    {{ subscription.payment_status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ getPaymentModeName(subscription.payment_mode) }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ formatDate(subscription.payment_date) }}
                </td>
                <td class="px-6 py-4 text-sm">
                  <button
                    class="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-xs font-medium hover:bg-gray-200 transition duration-200"
                    @click="openEditSubscriptionModal(subscription)"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Inactive Subscriptions Table -->
        <div v-show="activeTab === 'inactive'" class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="subscription in inactiveSubscriptions"
                :key="subscription._id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ formatDate(subscription.start_date) }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ formatDate(subscription.end_date) }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ getPlanName(subscription.subscription_plan) }}
                </td>
                <td class="px-6 py-4 text-sm">
                  <span
                    :class="`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      subscription.payment_status
                    )}`"
                  >
                    {{ subscription.payment_status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ getPaymentModeName(subscription.payment_mode) }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ formatDate(subscription.payment_date) }}
                </td>
                <td class="px-6 py-4 text-sm">
                  <button
                    class="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-xs font-medium hover:bg-gray-200 transition duration-200"
                    @click="openEditSubscriptionModal(subscription)"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Add/Edit Subscription Modal -->
    <add-edit-subscription-modal
      :show="showAddEditSubscriptionModal"
      :subscription="currentSubscription"
      :subscription-plans="subscriptionPlans"
      :payment-modes="paymentModes"
      @close="closeAddEditSubscriptionModal"
      @save="saveSubscription"
    />

    <!-- Toast Notification -->
    <toast-notification ref="toast" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import dayjs from "dayjs";
import addEditSubscriptionModal from "./AddEditSubscriptionModal.vue";
import magazineSubscriberService from "../services/magazineSubscriberService";
import subscriptionPlanService from "../services/subscriptionPlanService";
import paymentModeService from "../services/paymentModeService";
import subscriptionService from "../services/subscriptionService";
import ToastNotification from "./ToastNotification.vue";
import Loader from "~/components/Loader.vue";
import loadingMixin from "~/mixins/loadingMixin.js";

export default defineComponent({
  components: {
    addEditSubscriptionModal,
    ToastNotification,
    Loader,
  },
  mixins: [loadingMixin],
  data() {
    return {
      subscriber: {},
      activeSubscriptions: [],
      inactiveSubscriptions: [],
      subscriptionPlans: [],
      paymentModes: [],
      categories: [],
      types: [],
      showAddEditSubscriptionModal: false,
      currentSubscription: null,
      activeTab: "active",
    };
  },
  async created() {
    await this.runWithLoader(() =>
      Promise.all([
        this.loadSubscriber(),
        this.loadSubscriptionPlans(),
        this.loadPaymentModes(),
        this.loadCategories(),
        this.loadTypes(),
      ])
    );
  },
  methods: {
    loadSubscriber() {
      const subscriberId = this.$route.query.id;
      return this.runWithLoader(() =>
        magazineSubscriberService
          .getMagazineSubscriberById(subscriberId)
          .then((response) => {
            this.subscriber = response.data;
            return this.loadSubscriptions(subscriberId);
          })
          .catch((error) => {
            this.$refs.toast.showToast(
              "Error retrieving subscriber details",
              "Error",
              "danger"
            );
            console.error("Error retrieving subscriber details:", error);
          })
      );
    },
    loadSubscriptions(subscriberId) {
      return this.runWithLoader(() =>
        subscriptionService
          .getSubscriptionsBySubscriber(subscriberId)
          .then((response) => {
            this.activeSubscriptions = response.data.filter(
              (sub) => sub.active
            );
            this.inactiveSubscriptions = response.data.filter(
              (sub) => !sub.active
            );
          })
          .catch((error) => {
            this.$refs.toast.showToast(
              "Error retrieving subscriptions",
              "Error",
              "danger"
            );
            console.error("Error retrieving subscriptions:", error);
          })
      );
    },
    loadSubscriptionPlans() {
      return this.runWithLoader(() =>
        subscriptionPlanService
          .getPlans()
          .then((response) => {
            this.subscriptionPlans = response.data;
          })
          .catch((error) => {
            this.$refs.toast.showToast("Error loading subscription plans", "Error", "error");
            console.error("Error retrieving subscription plans:", error);
          })
      );
    },
    loadPaymentModes() {
      return this.runWithLoader(() =>
        paymentModeService
          .getPaymentModes()
          .then((response) => {
            this.paymentModes = response.data;
          })
          .catch((error) => {
            this.$refs.toast.showToast("Error loading payment modes", "Error", "error");
            console.error("Error retrieving payment modes:", error);
          })
      );
    },
    loadCategories() {
      return this.runWithLoader(() =>
        magazineSubscriberService
          .getCategories()
          .then((response) => {
            this.categories = response.data;
          })
          .catch((error) => {
            this.$refs.toast.showToast("Error loading categories", "Error", "error");
            console.error("Error retrieving categories:", error);
          })
      );
    },
    loadTypes() {
      return this.runWithLoader(() =>
        magazineSubscriberService
          .getTypes()
          .then((response) => {
            this.types = response.data;
          })
          .catch((error) => {
            this.$refs.toast.showToast("Error loading subscriber types", "Error", "error");
            console.error("Error retrieving types:", error);
          })
      );
    },
    openAddSubscriptionModal() {
      this.currentSubscription = {
        subscriber: this.subscriber._id,
        subscription_plan: "",
        payment_status: "Pending",
        payment_mode: this.paymentModes[0]?._id || "",
        start_date: dayjs().format("YYYY-MM-DD"),
        payment_date: dayjs().format("YYYY-MM-DD"),
      };
      this.showAddEditSubscriptionModal = true;
    },
    openEditSubscriptionModal(subscription) {
      this.currentSubscription = {
        ...subscription,
        start_date: subscription.start_date
          ? dayjs(subscription.start_date).format("YYYY-MM-DD")
          : dayjs().format("YYYY-MM-DD"),
        payment_date: subscription.payment_date
          ? dayjs(subscription.payment_date).format("YYYY-MM-DD")
          : dayjs().format("YYYY-MM-DD"),
      };
      this.showAddEditSubscriptionModal = true;
    },
    closeAddEditSubscriptionModal() {
      this.showAddEditSubscriptionModal = false;
    },
    saveSubscription(subscription) {
      if (subscription._id) {
        return this.runWithLoader(() =>
          subscriptionService
            .updateSubscription(subscription._id, subscription)
            .then(() => {
              this.loadSubscriptions(this.subscriber._id);
              this.showAddEditSubscriptionModal = false;
              this.$refs.toast.showToast("Subscription updated successfully", "Success", "success");
            })
            .catch((error) => {
              this.$refs.toast.showToast("Error updating subscription", "Error", "error");
              console.error("Error updating subscription:", error);
            })
        );
      } else {
        return this.runWithLoader(() =>
          subscriptionService
            .createSubscription(subscription)
            .then(() => {
              this.loadSubscriptions(this.subscriber._id);
              this.showAddEditSubscriptionModal = false;
              this.$refs.toast.showToast("Subscription created successfully", "Success", "success");
            })
            .catch((error) => {
              this.$refs.toast.showToast("Error creating subscription", "Error", "error");
              console.error("Error creating subscription:", error);
            })
        );
      }
    },
    formatDate(date) {
      if (!date) return "";
      const parsed = dayjs(date);
      return parsed.isValid() ? parsed.format("DD/MM/YYYY") : date;
    },
    getPlanName(planId) {
      const plan = this.subscriptionPlans.find((plan) => plan._id === planId);
      return plan ? plan.name : "";
    },
    getPaymentModeName(modeId) {
      const mode = this.paymentModes.find((mode) => mode._id === modeId);
      return mode ? mode.name : "";
    },
    getCategoryName(categoryId) {
      const category = this.categories.find((cat) => cat._id === categoryId);
      return category ? category.name : "";
    },
    getTypeName(typeId) {
      const type = this.types.find((type) => type._id === typeId);
      return type ? type.name : "";
    },
    getStatusColor(status) {
      const colors = {
        Paid: "bg-green-100 text-green-800",
        Pending: "bg-yellow-100 text-yellow-800",
        Overdue: "bg-red-100 text-red-800",
        Cancelled: "bg-gray-100 text-gray-800",
      };
      return colors[status] || "bg-gray-100 text-gray-800";
    },
  },
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
