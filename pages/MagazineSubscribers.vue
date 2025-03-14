<template>
  <div class="container mx-auto mt-8 px-4 relative">
    <!-- Loader Component -->
    <Loader v-if="isLoading" />

    <!-- Breadcrumb Navigation -->
    <nav aria-label="breadcrumb" class="mb-6">
      <ol class="flex space-x-2 text-gray-700">
        <li>
          <router-link to="/HomePage" class="text-blue-600 hover:text-blue-800 font-semibold">
            Home
          </router-link>
        </li>
        <li>
          <span>/</span>
        </li>
        <li class="text-gray-500 font-semibold" aria-current="page">
          Magazine Subscribers
        </li>
      </ol>
    </nav>

    <!-- Heading & Add Subscriber Button -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-3xl font-bold text-gray-800">
        Magazine Subscribers
      </h2>
      <button
        class="bg-gradient-to-r text-lg from-blue-500 to-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-gradient-to-l transition duration-200"
        @click="openAddSubscriberModal"
      >
        Add Subscriber
      </button>
    </div>

    <!-- Search & Filter Section -->
    <div class="mb-8 bg-white shadow-lg rounded-lg p-6">
      <div class="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
        <!-- Filter Dropdown -->
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

        <!-- Search Input Field -->
        <div class="relative flex-grow">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search Subscribers..."
            class="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-500 text-gray-800"
          />
          <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zm-5.9.68a6 6 0 100-12 6 6 0 000 12z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>

        <!-- Search & Reset Buttons -->
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
    <div class="flex gap-2 md:gap-4 items-center bg-gray-50 p-3 rounded-md mb-4 border border-gray-200">
      <button
        class="px-6 py-2 font-semibold rounded transition-colors duration-200"
        :class="activeTab === 'active'
          ? 'bg-white text-blue-600 shadow border border-gray-200'
          : 'text-gray-600 hover:text-blue-600'"
        @click="activeTab = 'active'"
      >
        Active Subscribers
      </button>
      <button
        class="px-6 py-2 font-semibold rounded transition-colors duration-200"
        :class="activeTab === 'inactive'
          ? 'bg-white text-blue-600 shadow border border-gray-200'
          : 'text-gray-600 hover:text-blue-600'"
        @click="activeTab = 'inactive'"
      >
        Inactive Subscribers
      </button>
    </div>

    <!-- Active Subscribers Section -->
    <div v-show="activeTab === 'active'">
      <!-- Sub-Tabs for 'Current' vs 'Waiting for Renewal' -->
      <div class="flex gap-2 mb-4">
        <button
          class="px-4 py-2 text-sm font-medium rounded-full border border-gray-200 transition-colors duration-200"
          :class="activeSubTab === 'current'
            ? 'bg-blue-500 text-white'
            : 'bg-white text-gray-600 hover:bg-blue-50'"
          @click="activeSubTab = 'current'"
        >
          Current Subscribers
        </button>
        <button
          class="px-4 py-2 text-sm font-medium rounded-full border border-gray-200 transition-colors duration-200"
          :class="activeSubTab === 'renewal'
            ? 'bg-blue-500 text-white'
            : 'bg-white text-gray-600 hover:bg-blue-50'"
          @click="activeSubTab = 'renewal'"
        >
          Waiting for Renewal
        </button>
      </div>

      <!-- Current Subscribers Table -->
      <div v-show="activeSubTab === 'current'">
        <table class="min-w-full bg-white divide-y divide-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Registration Number
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                City/Town
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                State
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Phone
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="subscriber in currentSubscribers"
              :key="subscriber._id"
              class="hover:bg-gray-50 transition duration-200"
            >
              <td class="px-6 py-4 text-sm text-gray-800">{{ subscriber.registration_number }}</td>
              <td class="px-6 py-4 text-sm text-gray-800">{{ subscriber.name }}</td>
              <td class="px-6 py-4 text-sm text-gray-800">{{ subscriber.city_town }}</td>
              <td class="px-6 py-4 text-sm text-gray-800">{{ subscriber.state }}</td>
              <td class="px-6 py-4 text-sm text-gray-800">{{ subscriber.phone }}</td>
              <td class="px-6 py-4 text-sm text-gray-800">{{ subscriber.email }}</td>
              <td class="px-6 py-4 text-sm text-gray-800 flex space-x-2">
                <nuxt-link :to="`/magazineSubscriberDetails?id=${subscriber._id}`">
                  <button
                    class="bg-blue-600 text-white px-4 py-1 rounded-md text-xs shadow-sm hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    View
                  </button>
                </nuxt-link>
                <button
                  class="bg-gray-600 text-white px-4 py-1 rounded-md text-xs shadow-sm hover:bg-gray-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  @click="openEditSubscriberModal(subscriber)"
                >
                  Edit
                </button>
                <button
                  class="bg-red-600 text-white px-4 py-1 rounded-md text-xs shadow-sm hover:bg-yellow-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                  @click="confirmDeleteSubscriber(subscriber._id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Waiting for Renewal Table -->
      <div v-show="activeSubTab === 'renewal'">
        <table class="min-w-full bg-white divide-y divide-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Registration Number
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                City/Town
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                State
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Phone
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="subscriber in waitingForRenewalSubscribers"
              :key="subscriber._id"
              class="hover:bg-gray-50 transition duration-200"
            >
              <td class="px-6 py-4 text-sm text-gray-800">{{ subscriber.registration_number }}</td>
              <td class="px-6 py-4 text-sm text-gray-800">{{ subscriber.name }}</td>
              <td class="px-6 py-4 text-sm text-gray-800">{{ subscriber.city_town }}</td>
              <td class="px-6 py-4 text-sm text-gray-800">{{ subscriber.state }}</td>
              <td class="px-6 py-4 text-sm text-gray-800">{{ subscriber.phone }}</td>
              <td class="px-6 py-4 text-sm text-gray-800">{{ subscriber.email }}</td>
              <td class="px-6 py-4 text-sm text-gray-800 flex space-x-2">
                <nuxt-link :to="`/magazineSubscriberDetails?id=${subscriber._id}`">
                  <button
                    class="bg-blue-600 text-white px-4 py-1 rounded-md text-xs shadow-sm hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    View
                  </button>
                </nuxt-link>
                <button
                  class="bg-gray-600 text-white px-4 py-1 rounded-md text-xs shadow-sm hover:bg-gray-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  @click="openEditSubscriberModal(subscriber)"
                >
                  Edit
                </button>
                <button
                  class="bg-red-600 text-white px-4 py-1 rounded-md text-xs shadow-sm hover:bg-orange-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  @click="confirmDeleteSubscriber(subscriber._id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Inactive Subscribers Section -->
    <div v-show="activeTab === 'inactive'">
      <table class="min-w-full bg-white divide-y divide-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Registration Number
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              City/Town
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              State
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Phone
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="subscriber in inactiveSubscribers"
            :key="subscriber._id"
            class="hover:bg-gray-50 transition duration-200"
          >
            <td class="px-6 py-4 text-sm text-gray-800">{{ subscriber.registration_number }}</td>
            <td class="px-6 py-4 text-sm text-gray-800">{{ subscriber.name }}</td>
            <td class="px-6 py-4 text-sm text-gray-800">{{ subscriber.city_town }}</td>
            <td class="px-6 py-4 text-sm text-gray-800">{{ subscriber.state }}</td>
            <td class="px-6 py-4 text-sm text-gray-800">{{ subscriber.phone }}</td>
            <td class="px-6 py-4 text-sm text-gray-800">{{ subscriber.email }}</td>
            <td class="px-6 py-4 text-sm text-gray-800 flex space-x-2">
              <nuxt-link :to="`/magazineSubscriberDetails?id=${subscriber._id}`">
                <button
                  class="bg-blue-600 text-white px-4 py-1 rounded-md text-xs shadow-sm hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  View
                </button>
              </nuxt-link>
              <button
                class="bg-gray-600 text-white px-4 py-1 rounded-md text-xs shadow-sm hover:bg-gray-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                @click="openEditSubscriberModal(subscriber)"
              >
                Edit
              </button>
              <button
                class="bg-green-600 text-white px-4 py-1 rounded-md text-xs shadow-sm hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                @click="activateSubscriber(subscriber._id)"
              >
                Activate
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
import AddEditSubscriberModal from "./AddEditSubscriberModal.vue";
import ConfirmationModal from "./ConfirmationModal.vue";
import magazineSubscriberService from "../services/magazineSubscriberService";
import Loader from "~/components/Loader.vue";
import loadingMixin from "~/mixins/loadingMixin.js";

export default {
  components: {
    AddEditSubscriberModal,
    ConfirmationModal,
    Loader
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
      searchFilter: "name"
    };
  },
  created() {
    this.loadSubscribers();
    this.loadCategories();
    this.loadTypes();
  },
  methods: {
    loadSubscribers() {
      return this.runWithLoader(() => {
        return magazineSubscriberService.getMagazineSubscribers()
          .then((response) => {
            this.currentSubscribers = response.data.filter(
              (subscriber) => !subscriber.isDeleted && subscriber.hasActiveSubscriptions
            );
            this.waitingForRenewalSubscribers = response.data.filter(
              (subscriber) => !subscriber.isDeleted && !subscriber.hasActiveSubscriptions
            );
            this.inactiveSubscribers = response.data.filter(
              (subscriber) => subscriber.isDeleted
            );
          })
          .catch((error) => {
            console.error("There was an error retrieving the subscribers!", error);
          });
      });
    },
    loadCategories() {
      magazineSubscriberService.getCategories()
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.error("There was an error retrieving the categories!", error);
        });
    },
    loadTypes() {
      magazineSubscriberService.getTypes()
        .then((response) => {
          this.types = response.data;
        })
        .catch((error) => {
          console.error("There was an error retrieving the types!", error);
        });
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
        notes: ""
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
      if (subscriber._id) {
        magazineSubscriberService.updateMagazineSubscriber(subscriber._id, subscriber)
          .then(() => {
            this.loadSubscribers();
            this.showAddEditSubscriberModal = false;
          })
          .catch((error) => {
            alert("There was an error updating the subscriber!");
            console.error("There was an error updating the subscriber!", error);
          });
      } else {
        magazineSubscriberService.createMagazineSubscriber(subscriber)
          .then(() => {
            this.loadSubscribers();
            this.showAddEditSubscriberModal = false;
            alert("User added successfully!");
          })
          .catch((error) => {
            if (error.response && error.response.data) {
              const errorData = error.response.data;
              console.error("API Error Response:", errorData);
              let errorMessages = [];
              Object.keys(errorData).forEach((field) => {
                if (Array.isArray(errorData[field])) {
                  errorMessages.push(`${field.replace("_", " ")}: ${errorData[field][0]}`);
                }
              });
              if (errorMessages.length > 0) {
                alert(errorMessages.join("\n"));
              } else {
                alert("There was an error adding the subscriber!");
              }
            } else {
              alert("Something went wrong! Unable to add the subscriber.");
              console.error("Unknown API Error:", error);
            }
          });
      }
    },
    confirmDeleteSubscriber(subscriberId) {
      this.subscriberToDelete = subscriberId;
      this.showConfirmationModal = true;
    },
    hideDeleteModal() {
      this.showConfirmationModal = false;
    },
    deleteSubscriber() {
      if (this.subscriberToDelete) {
        magazineSubscriberService.softDeleteMagazineSubscriber(this.subscriberToDelete)
          .then(() => {
            this.loadSubscribers();
            this.hideDeleteModal();
          })
          .catch((error) => {
            console.error("There was an error deleting the subscriber!", error);
          });
      }
    },
    activateSubscriber(subscriberId) {
      magazineSubscriberService.activateMagazineSubscriber(subscriberId)
        .then(() => {
          this.loadSubscribers();
        })
        .catch((error) => {
          console.error("There was an error activating the subscriber!", error);
        });
    },
    performSearch() {
      this.runWithLoader(() => {
        const params = {
          filter: this.searchFilter,
          query: this.searchQuery
        };
        return magazineSubscriberService.searchMagazineSubscribers(params)
          .then((response) => {
            this.currentSubscribers = response.data.filter(
              (subscriber) => !subscriber.isDeleted && subscriber.hasActiveSubscriptions
            );
            this.waitingForRenewalSubscribers = response.data.filter(
              (subscriber) => !subscriber.isDeleted && !subscriber.hasActiveSubscriptions
            );
            this.inactiveSubscribers = response.data.filter(
              (subscriber) => subscriber.isDeleted
            );
          })
          .catch((error) => {
            console.error("There was an error performing search!", error);
          });
      });
    },
    resetSearch() {
      this.searchQuery = "";
      this.searchFilter = "name";
      this.activeTab = "active";
      this.activeSubTab = "current";
      this.loadSubscribers();
    },
    viewSubscriber(subscriberId) {
      this.$router.push({ path: `/magazineSubscriberDetails?id=${subscriberId}` });
    }
  }
};
</script>

<style scoped>
/* Additional scoped styles if needed */
</style>
