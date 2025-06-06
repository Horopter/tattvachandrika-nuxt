<template>
  <div class="container mx-auto mt-8 px-4 relative">
    <!-- Loader Component -->
    <Loader v-if="isLoading" />

    <!-- Breadcrumb Navigation -->
    <nav aria-label="breadcrumb" class="mb-6">
      <ol class="flex space-x-2 text-gray-700">
        <li>
          <router-link
            to="/HomePage"
            class="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Home
          </router-link>
        </li>
        <li><span>/</span></li>
        <li class="text-gray-500 font-semibold" aria-current="page">
          Magazine Subscribers
        </li>
      </ol>
    </nav>

    <!-- Heading & Add Subscriber Button -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-3xl font-bold text-gray-800">Magazine Subscribers</h2>
      <button
        class="bg-gradient-to-r text-lg from-blue-500 to-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-gradient-to-l transition duration-200"
        @click="openAddSubscriberModal"
      >
        Add Subscriber
      </button>
    </div>

    <!-- Search & Filter Section -->
    <div class="mb-8 bg-white shadow-lg rounded-lg p-6">
      <div
        class="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0"
      >
        <div>
          <select
            v-model="searchFilter"
            class="w-full md:w-auto border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="registration_number">Registration No.</option>
          </select>
        </div>

        <div class="relative flex-grow">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search Subscribers..."
            class="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-500 text-gray-800"
          />
          <div
            class="absolute inset-y-0 right-4 flex items-center pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zm-5.9.68a6 6 0 100-12 6 6 0 000 12z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div>
          <button
            class="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition duration-200"
            @click="performSearch"
          >
            Search
          </button>
        </div>
        <div>
          <button
            class="w-full md:w-auto bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition duration-200"
            @click="resetSearch"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Primary Tabs: Active / Inactive -->
    <div
      class="flex gap-2 md:gap-4 items-center bg-gray-50 p-3 rounded-md mb-4 border border-gray-200"
    >
      <button
        class="px-6 py-2 font-semibold rounded transition-colors duration-200"
        :class="
          activeTab === 'active'
            ? 'bg-white text-blue-600 shadow border border-gray-200'
            : 'text-gray-600 hover:text-blue-600'
        "
        @click="switchTab('active')"
      >
        Active Subscribers
      </button>
      <button
        class="px-6 py-2 font-semibold rounded transition-colors duration-200"
        :class="
          activeTab === 'inactive'
            ? 'bg-white text-blue-600 shadow border border-gray-200'
            : 'text-gray-600 hover:text-blue-600'
        "
        @click="switchTab('inactive')"
      >
        Inactive Subscribers
      </button>
    </div>

    <!-- Active Subscribers Section -->
    <div v-show="activeTab === 'active'" class="relative">
      <!-- Loader overlay when loading -->
      <Loader
        v-if="isLoading"
        class="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-10"
      />

      <!-- Sub-Tabs -->
      <div class="flex gap-2 mb-4">
        <button
          class="px-4 py-2 text-sm font-medium rounded-full border border-gray-200 transition-colors duration-200"
          :class="
            activeSubTab === 'current'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-600 hover:bg-blue-50'
          "
          @click="switchSubTab('current')"
          :disabled="isLoading"
        >
          Current Subscribers
        </button>
        <button
          class="px-4 py-2 text-sm font-medium rounded-full border border-gray-200 transition-colors duration-200"
          :class="
            activeSubTab === 'renewal'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-600 hover:bg-blue-50'
          "
          @click="switchSubTab('renewal')"
          :disabled="isLoading"
        >
          Waiting for Renewal
        </button>
      </div>

      <!-- Current Subscribers Table -->
      <div v-show="activeSubTab === 'current'" class="relative">
        <subscriber-table
          :subscribers="currentSubscribers"
          :loading="isLoading"
          :show-delete="true"
          :show-activate="false"
          @view="viewSubscriber"
          @edit="openEditSubscriberModal"
          @delete="confirmDeleteSubscriber"
        />
        <pagination
          :current-page="currentPage"
          :total-pages="currentPageTotalPages"
          @page-changed="changePage"
          :disabled="isLoading"
        />
      </div>

      <!-- Waiting for Renewal Table -->
      <div v-show="activeSubTab === 'renewal'" class="relative">
        <subscriber-table
          :subscribers="waitingForRenewalSubscribers"
          :loading="isLoading"
          :show-delete="false"
          :show-activate="false"
          @view="viewSubscriber"
          @edit="openEditSubscriberModal"
        />
        <pagination
          :current-page="currentPage"
          :total-pages="renewalPageTotalPages"
          @page-changed="changePage"
          :disabled="isLoading"
        />
      </div>
    </div>

    <!-- Inactive Subscribers Section -->
    <div v-show="activeTab === 'inactive'" class="relative">
      <Loader
        v-if="isLoading"
        class="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-10"
      />

      <subscriber-table
        :subscribers="inactiveSubscribers"
        :loading="isLoading"
        :show-delete="false"
        :show-activate="true"
        @view="viewSubscriber"
        @edit="openEditSubscriberModal"
        @activate="activateSubscriber"
      />
      <pagination
        :current-page="currentPage"
        :total-pages="inactivePageTotalPages"
        @page-changed="changePage"
        :disabled="isLoading"
      />
    </div>

    <!-- Add/Edit Subscriber Modal -->
    <add-edit-subscriber-modal
      :show="showAddEditSubscriberModal"
      :subscriber="selectedSubscriber"
      :categories="categories"
      :types="types"
      @close="closeAddEditSubscriberModal"
      @save="saveSubscriber"
    />

    <!-- Confirmation Modal -->
    <confirmation-modal
      v-if="showConfirmationModal"
      :show="showConfirmationModal"
      title="Confirm Delete"
      message="Are you sure you want to delete this subscriber?"
      @close="hideDeleteModal"
      @confirm="deleteSubscriber"
    />

    <!-- Toast Notification -->
    <toast-notification ref="toast" />
  </div>
</template>

<script>
import { useRouter } from "vue-router"; // Import here
import AddEditSubscriberModal from "./AddEditSubscriberModal.vue";
import ConfirmationModal from "./ConfirmationModal.vue";
import magazineSubscriberService from "../services/magazineSubscriberService";
import Loader from "~/components/Loader.vue";
import loadingMixin from "~/mixins/loadingMixin.js";
import ToastNotification from "./ToastNotification.vue";
import SubscriberTable from "./SubscriberTable.vue";
import Pagination from "./Pagination.vue";

export default {
  components: {
    AddEditSubscriberModal,
    ConfirmationModal,
    Loader,
    ToastNotification,
    SubscriberTable,
    Pagination,
  },
  mixins: [loadingMixin],
  data() {
    return {
      currentSubscribers: [],
      waitingForRenewalSubscribers: [],
      inactiveSubscribers: [],
      categories: [],
      types: [],
      showAddEditSubscriberModal: false,
      selectedSubscriber: null,
      showConfirmationModal: false,
      subscriberToDelete: null,
      activeTab: "active",
      activeSubTab: "current",
      searchQuery: "",
      searchFilter: "name",

      currentPage: 1,
      totalPages: 1, // Default for current tab/subtab, not used now
      // We'll maintain separate page counts:
      currentPageTotalPages: 1,
      renewalPageTotalPages: 1,
      inactivePageTotalPages: 1,

      pageSize: 10,
    };
  },
  created() {
    this.loadCategories();
    this.loadTypes();
    this.loadSubscribers();
  },
  watch: {
    activeTab() {
      this.resetPagination();
      this.loadSubscribers();
    },
    activeSubTab() {
      if (this.activeTab === "active") {
        this.resetPagination();
        this.loadSubscribers();
      }
    },
  },

  setup() {
    const router = useRouter();

    function viewSubscriber(subscriberId) {
      console.log("Viewing subscriber:", subscriberId); // debug log
      if (!subscriberId) {
        console.error("No subscriber ID provided!");
        return;
      }
      router.push({ path: "/magazineSubscriberDetails", query: { id: subscriberId } });
    }

    return { viewSubscriber };
  },

  methods: {
    resetPagination() {
      this.currentPage = 1;
      this.currentPageTotalPages = 1;
      this.renewalPageTotalPages = 1;
      this.inactivePageTotalPages = 1;
    },
    loadSubscribers(page = 1) {
      this.currentPage = page;

      let params = {
        page,
        page_size: this.pageSize,
      };

      if (this.searchQuery.trim()) {
        params.filter = this.searchFilter;
        params.query = this.searchQuery.trim();
      } else {
        params.subscriberStatus =
          this.activeTab === "active" ? "active" : "inactive";

        if (this.activeTab === "active") {
          params.activeSubTab = this.activeSubTab;
        }
      }

      return this.runWithLoader(() =>
        magazineSubscriberService
          .getMagazineSubscribers(params)
          .then((response) => {
            // The backend now sends an object with keys for current/renewal/inactive
            const data = response.data;

            // Reset all arrays to empty initially
            this.currentSubscribers = [];
            this.waitingForRenewalSubscribers = [];
            this.inactiveSubscribers = [];

            // Depending on activeTab and activeSubTab, set the arrays and page counts
            if (this.activeTab === "active") {
              if (this.activeSubTab === "current") {
                if (data.current) {
                  this.currentSubscribers = data.current.results || [];
                  this.currentPageTotalPages = Math.ceil(
                    (data.current.count || 0) / this.pageSize
                  );
                }
                this.waitingForRenewalSubscribers = [];
                this.renewalPageTotalPages = 1;
              } else if (this.activeSubTab === "renewal") {
                if (data.renewal) {
                  this.waitingForRenewalSubscribers = data.renewal.results || [];
                  this.renewalPageTotalPages = Math.ceil(
                    (data.renewal.count || 0) / this.pageSize
                  );
                }
                this.currentSubscribers = [];
                this.currentPageTotalPages = 1;
              }
              this.inactiveSubscribers = [];
              this.inactivePageTotalPages = 1;
            } else {
              if (data.inactive) {
                this.inactiveSubscribers = data.inactive.results || [];
                this.inactivePageTotalPages = Math.ceil(
                  (data.inactive.count || 0) / this.pageSize
                );
              }
              this.currentSubscribers = [];
              this.waitingForRenewalSubscribers = [];
              this.currentPageTotalPages = 1;
              this.renewalPageTotalPages = 1;
            }
          })
          .catch((error) => {
            this.$refs.toast.showToast(
              "Error loading subscribers",
              "Error",
              "error"
            );
            console.error(
              "There was an error retrieving the subscribers!",
              error
            );
          })
      );
    },
    changePage(newPage) {
      if (
        newPage < 1 ||
        (this.activeTab === "active" &&
          ((this.activeSubTab === "current" &&
            newPage > this.currentPageTotalPages) ||
            (this.activeSubTab === "renewal" &&
              newPage > this.renewalPageTotalPages))) ||
        (this.activeTab === "inactive" && newPage > this.inactivePageTotalPages)
      )
        return;
      this.loadSubscribers(newPage);
    },
    switchTab(tab) {
      this.activeTab = tab;
      this.activeSubTab = "current";
    },
    switchSubTab(subTab) {
      this.activeSubTab = subTab;
    },
    loadCategories() {
      return this.runWithLoader(() =>
        magazineSubscriberService
          .getCategories()
          .then((response) => (this.categories = response.data))
          .catch((error) => {
            this.$refs.toast.showToast(
              "Error loading categories",
              "Error",
              "error"
            );
            console.error(
              "There was an error retrieving the categories!",
              error
            );
          })
      );
    },
    loadTypes() {
      return this.runWithLoader(() =>
        magazineSubscriberService
          .getTypes()
          .then((response) => (this.types = response.data))
          .catch((error) => {
            this.$refs.toast.showToast("Error loading types", "Error", "error");
            console.error("There was an error retrieving the types!", error);
          })
      );
    },
    openAddSubscriberModal() {
      this.selectedSubscriber = {
        registration_number: "",
        name: "",
        address: "",
        city_town: "",
        state: "",
        pincode: "",
        phone: "",
        email: "",
        category: "",
        stype: "",
        notes: "",
      };
      this.showAddEditSubscriberModal = true;
    },
    openEditSubscriberModal(subscriber) {
      this.selectedSubscriber = { ...subscriber };
      this.showAddEditSubscriberModal = true;
    },
    closeAddEditSubscriberModal() {
      this.showAddEditSubscriberModal = false;
    },
    saveSubscriber(subscriber) {
      const isUpdate = Boolean(subscriber._id);
      const action = isUpdate
        ? magazineSubscriberService.updateMagazineSubscriber(
            subscriber._id,
            subscriber
          )
        : magazineSubscriberService.createMagazineSubscriber(subscriber);

      return this.runWithLoader(() =>
        action
          .then(() => {
            this.loadSubscribers();
            this.showAddEditSubscriberModal = false;
            this.$refs.toast.showToast(
              `Subscriber ${isUpdate ? "updated" : "added"} successfully!`,
              "Success",
              "success"
            );
            if (!isUpdate) {
              this.activeTab = "active";
              this.activeSubTab = "renewal";
            }
          })
          .catch((error) => {
            if (error.response && error.response.data) {
              const errorData = error.response.data;
              let errorMessages = [];
              Object.keys(errorData).forEach((field) => {
                if (Array.isArray(errorData[field])) {
                  errorMessages.push(
                    `${field.replace("_", " ")}: ${errorData[field][0]}`
                  );
                }
              });
              this.$refs.toast.showToast(
                errorMessages.join("\n"),
                "Error",
                "error"
              );
            } else {
              this.$refs.toast.showToast(
                "Something went wrong! Unable to save subscriber",
                "Error",
                "error"
              );
              console.error("Unknown API Error:", error);
            }
          })
      );
    },
    confirmDeleteSubscriber(subscriberId) {
      this.subscriberToDelete = subscriberId;
      this.showConfirmationModal = true;
    },
    hideDeleteModal() {
      this.showConfirmationModal = false;
    },
    deleteSubscriber() {
      if (!this.subscriberToDelete) return;
      return this.runWithLoader(() =>
        magazineSubscriberService
          .softDeleteMagazineSubscriber(this.subscriberToDelete)
          .then(() => {
            this.loadSubscribers();
            this.hideDeleteModal();
            this.$refs.toast.showToast(
              "Subscriber deleted successfully!",
              "Success",
              "success"
            );
          })
          .catch((error) => {
            this.$refs.toast.showToast(
              "Error deleting subscriber",
              "Error",
              "error"
            );
            console.error("There was an error deleting the subscriber!", error);
          })
      );
    },
    activateSubscriber(subscriberId) {
      return this.runWithLoader(() =>
        magazineSubscriberService
          .activateMagazineSubscriber(subscriberId)
          .then(() => {
            this.loadSubscribers();
            this.$refs.toast.showToast(
              "Subscriber activated successfully!",
              "Success",
              "success"
            );
          })
          .catch((error) => {
            this.$refs.toast.showToast(
              "Error activating subscriber",
              "Error",
              "error"
            );
            console.error(
              "There was an error activating the subscriber!",
              error
            );
          })
      );
    },
    performSearch() {
      this.resetPagination();
      return this.runWithLoader(() => {
        if (!this.searchQuery.trim()) {
          this.$refs.toast.showToast(
            "Please enter a search term",
            "Warning",
            "warning"
          );
          return Promise.resolve();
        }

        const params = {
          filter: this.searchFilter,
          query: this.searchQuery.trim(),
          page: this.currentPage,
          page_size: this.pageSize,
        };

        return magazineSubscriberService
          .searchMagazineSubscribers(params)
          .then((response) => {
            const subscribers = response.data.results || [];
            const totalCount = response.data.count || 0;

            this.totalPages = Math.ceil(totalCount / this.pageSize);

            if (this.activeTab === "active") {
              if (this.activeSubTab === "current") {
                this.currentSubscribers = subscribers.filter(
                  (s) => !s.isDeleted && s.hasActiveSubscriptions
                );
                this.waitingForRenewalSubscribers = [];
              } else {
                this.waitingForRenewalSubscribers = subscribers.filter(
                  (s) => !s.isDeleted && !s.hasActiveSubscriptions
                );
                this.currentSubscribers = [];
              }
              this.inactiveSubscribers = [];
            } else {
              this.inactiveSubscribers = subscribers.filter((s) => s.isDeleted);
              this.currentSubscribers = [];
              this.waitingForRenewalSubscribers = [];
            }

            if (subscribers.length === 0) {
              this.$refs.toast.showToast(
                "No subscribers found matching your search",
                "Info",
                "info"
              );
            }
          })
          .catch((error) => {
            this.$refs.toast.showToast(
              "Error performing search",
              "Error",
              "error"
            );
            console.error("There was an error performing search!", error);
          });
      });
    },
    resetSearch() {
      this.searchQuery = "";
      this.searchFilter = "name";
      this.activeTab = "active";
      this.activeSubTab = "current";
      this.resetPagination();
      this.loadSubscribers();
    },
  },
};
</script>

<style scoped>
/* Additional scoped styles if needed */
</style>
