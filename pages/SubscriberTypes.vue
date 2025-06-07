<template>
  <div class="container mx-auto mt-10 px-6 relative">
    <!-- Loader Component -->
    <Loader v-if="isLoading" />

    <h2 class="text-3xl font-semibold text-gray-900 mb-6">Subscriber Types</h2>

    <!-- Breadcrumb Navigation -->
    <nav aria-label="breadcrumb" class="mb-8">
      <ol class="flex space-x-2 text-gray-600">
        <li>
          <router-link to="/HomePage" class="text-indigo-600 hover:text-indigo-800 font-medium">
            Home
          </router-link>
        </li>
        <li>
          <span>/</span>
        </li>
        <li class="text-gray-500 font-medium" aria-current="page">Subscriber Types</li>
      </ol>
    </nav>

    <!-- Subscriber Types Table -->
    <div class="shadow-lg overflow-hidden border border-gray-300 sm:rounded-xl">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-200">
          <tr>
            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <!-- Add New Type Row -->
          <tr v-if="addingNew">
            <td class="px-6 py-4">
              <input
                type="text"
                v-model="newSubscriberType.name"
                class="border border-gray-300 px-4 py-2 rounded-full w-full focus:ring focus:ring-indigo-300 focus:border-indigo-500"
                placeholder="Enter type name"
              />
            </td>
            <td class="px-6 py-4">
              <button
                class="bg-indigo-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 mr-2"
                @click="saveNewSubscriberType"
              >
                Save
              </button>
              <button
                class="bg-gray-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                @click="cancelNewSubscriberType"
              >
                Cancel
              </button>
            </td>
          </tr>

          <!-- Existing Types Rows -->
          <tr v-for="type in subscriberTypes" :key="type._id" class="hover:bg-gray-50 transition duration-150">
            <template v-if="editMode === type._id">
              <td class="px-6 py-4">
                <input
                  type="text"
                  v-model="editSubscriberType.name"
                  class="border border-gray-300 px-4 py-2 rounded-full w-full focus:ring focus:ring-indigo-300 focus:border-indigo-500"
                />
              </td>
              <td class="px-6 py-4 flex space-x-2">
                <button
                  class="bg-indigo-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  @click="updateSubscriberType(type._id)"
                >
                  Save
                </button>
                <button
                  class="bg-gray-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  @click="cancelEdit"
                >
                  Cancel
                </button>
              </td>
            </template>
            <template v-else>
              <td class="px-6 py-4 text-md font-semibold text-gray-700 font-sans">{{ type.name }}</td>
              <td class="px-6 py-4 flex items-center space-x-3">
                <button
                  class="bg-yellow-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  @click="editSubscriberTypeFunc(type)"
                >
                  Edit
                </button>
                <button
                  class="bg-red-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  @click="showDeleteModal(type._id)"
                >
                  Delete
                </button>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add New Type Button -->
    <div class="mt-6">
      <button
        class="bg-teal-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
        @click="startAddingNew"
      >
        Add New Type
      </button>
    </div>

    <!-- Confirmation Modal -->
    <confirmation-modal
      v-if="showConfirmationModal"
      :show="showConfirmationModal"
      title="Confirm Delete"
      message="Are you sure you want to delete this subscriber type?"
      @close="hideDeleteModal"
      @confirm="deleteSubscriberType"
    />
  </div>
</template>

<script>
import subscriberTypeService from "../services/subscriberTypeService";
import ConfirmationModal from "./ConfirmationModal.vue";
import Loader from "~/components/Loader.vue";
import loadingMixin from "~/mixins/loadingMixin.js";

export default {
  components: {
    ConfirmationModal,
    Loader,
  },
  mixins: [loadingMixin],
  data() {
    return {
      subscriberTypes: [],
      addingNew: false,
      editMode: null,
      showConfirmationModal: false,
      typeToDelete: null,
      newSubscriberType: { name: "" },
      editSubscriberType: { name: "" },
    };
  },
  created() {
    this.runWithLoader(() => this.loadSubscriberTypes());
  },
  methods: {
    loadSubscriberTypes() {
      return subscriberTypeService
        .getSubscriberTypes()
        .then((response) => {
          this.subscriberTypes = response.data;
        })
        .catch((error) => {
          console.error("There was an error retrieving the subscriber types!", error);
        });
    },
    startAddingNew() {
      this.addingNew = true;
      this.resetNewSubscriberType();
    },
    cancelNewSubscriberType() {
      this.addingNew = false;
    },
    resetNewSubscriberType() {
      this.newSubscriberType = { name: "" };
    },
    saveNewSubscriberType() {
      return this.runWithLoader(() => {
        return subscriberTypeService
          .createSubscriberType(this.newSubscriberType)
          .then(() => {
            this.loadSubscriberTypes();
            this.addingNew = false;
          })
          .catch((error) => {
            console.error("There was an error saving the subscriber type!", error);
          });
      });
    },
    editSubscriberTypeFunc(type) {
      this.editMode = type._id;
      this.editSubscriberType = { ...type };
    },
    cancelEdit() {
      this.editMode = null;
    },
    updateSubscriberType(id) {
      return this.runWithLoader(() => {
        return subscriberTypeService
          .updateSubscriberType(id, this.editSubscriberType)
          .then(() => {
            this.loadSubscriberTypes();
            this.editMode = null;
          })
          .catch((error) => {
            console.error("There was an error updating the subscriber type!", error);
          });
      });
    },
    showDeleteModal(id) {
      this.typeToDelete = id;
      this.showConfirmationModal = true;
    },
    hideDeleteModal() {
      this.showConfirmationModal = false;
      this.typeToDelete = null;
    },
    deleteSubscriberType() {
      return this.runWithLoader(() => {
        return subscriberTypeService
          .deleteSubscriberType(this.typeToDelete)
          .then(() => {
            this.loadSubscriberTypes();
            this.hideDeleteModal();
          })
          .catch((error) => {
            console.error("There was an error deleting the subscriber type!", error);
          });
      });
    },
  },
};
</script>

<style scoped>
/* Add custom styles for smooth hover effects and modern design */
</style>
