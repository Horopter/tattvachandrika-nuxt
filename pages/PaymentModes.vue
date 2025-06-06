<template>
  <div class="container mx-auto mt-8 px-6 relative">
    <!-- Loader Component -->
    <Loader v-if="isLoading" />

    <!-- Breadcrumb Navigation -->
    <nav aria-label="breadcrumb" class="mb-6">
      <ol class="flex space-x-2 text-sm text-gray-600">
        <li>
          <router-link to="/HomePage" class="text-blue-600 hover:text-blue-800 hover:underline">
            Home
          </router-link>
        </li>
        <li><span>/</span></li>
        <li class="text-gray-500" aria-current="page">Payment Modes</li>
      </ol>
    </nav>

    <!-- Header Section -->
    <h2 class="text-3xl font-semibold text-gray-800 mb-6">Payment Modes</h2>

    <!-- Payment Modes Table -->
    <div class="overflow-hidden rounded-lg shadow-lg bg-white">
      <table class="min-w-full bg-white divide-y divide-gray-200">
        <thead class="bg-gradient-to-r from-gray-100 to-gray-200">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
            <th class="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="addingNew" class="bg-gray-50">
            <td class="px-6 py-4">
              <input
                type="text"
                v-model="newPaymentMode.name"
                class="border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300 w-full"
                placeholder="New Payment Mode Name"
              />
            </td>
            <td class="px-6 py-4">
              <button
                class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 transition-all"
                @click="saveNewPaymentMode"
              >
                Save
              </button>
              <button
                class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                @click="cancelNewPaymentMode"
              >
                Cancel
              </button>
            </td>
          </tr>

          <!-- Existing Payment Modes Rows -->
          <tr v-for="mode in paymentModes" :key="mode._id || mode.tempId" class="hover:bg-gray-100 transition duration-200">
            <template v-if="editModeId === mode._id || editModeId === mode.tempId">
              <td class="px-6 py-4">
                <input
                  type="text"
                  v-model="mode.name"
                  class="border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300 w-full"
                />
              </td>
              <td class="px-6 py-4">
                <button
                  class="bg-green-500 text-white px-4 py-2 rounded-md text-xs shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                  @click="saveMode(mode)"
                >
                  Save
                </button>
                <button
                  class="bg-gray-500 text-white px-4 py-2 rounded-md text-xs shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  @click="cancelEdit"
                >
                  Cancel
                </button>
              </td>
            </template>
            <template v-else>
              <td class="px-6 py-4 text-md font-semibold text-gray-700 font-sans">
                {{ mode.name }}
              </td>
              <td class="px-6 py-4">
                <button
                  class="bg-yellow-500 text-white px-4 py-2 rounded-md text-xs shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  @click="editMode(mode._id || mode.tempId)"
                >
                  Edit
                </button>
                <button
                  class="bg-red-600 text-white px-4 py-2 rounded-md text-xs shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  @click="confirmDeleteMode(mode._id || mode.tempId)"
                >
                  Delete
                </button>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add New Payment Mode Button -->
    <button
      class="mt-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
      @click="startAddingNew"
    >
      Add New Payment Mode
    </button>

    <!-- Confirmation Modal -->
    <confirmation-modal
      v-if="showConfirmationModal"
      :show="showConfirmationModal"
      title="Confirm Delete"
      message="Are you sure you want to delete this payment mode?"
      @close="hideDeleteModal"
      @confirm="deleteMode"
    />
  </div>
</template>

<script>
import paymentModeService from "../services/paymentModeService";
import confirmationModal from "./ConfirmationModal.vue";
import Loader from "~/components/Loader.vue";
import loadingMixin from "~/mixins/loadingMixin.js";

export default {
  components: {
    confirmationModal,
    Loader,
  },
  mixins: [loadingMixin],
  data() {
    return {
      paymentModes: [],
      addingNew: false,
      editModeId: null,
      showConfirmationModal: false,
      modeToDelete: null,
      newPaymentMode: {
        name: "",
      },
    };
  },
  created() {
    this.loadPaymentModes();
  },
  methods: {
    loadPaymentModes() {
      return this.runWithLoader(() => {
        return paymentModeService
          .getPaymentModes()
          .then((response) => {
            this.paymentModes = response.data;
          })
          .catch((error) => {
            console.error("There was an error retrieving the payment modes!", error);
          });
      });
    },
    startAddingNew() {
      this.addingNew = true;
      this.resetNewPaymentMode();
    },
    cancelNewPaymentMode() {
      this.addingNew = false;
    },
    resetNewPaymentMode() {
      this.newPaymentMode = { name: "" };
    },
    saveNewPaymentMode() {
      return this.runWithLoader(() => {
        return paymentModeService
          .createPaymentMode(this.newPaymentMode)
          .then(() => {
            this.loadPaymentModes();
            this.addingNew = false;
          })
          .catch((error) => {
            console.error("There was an error saving the payment mode!", error);
          });
      });
    },
    editMode(modeId) {
      this.editModeId = modeId;
    },
    cancelEdit() {
      this.editModeId = null;
    },
    saveMode(mode) {
      return this.runWithLoader(() => {
        if (mode._id) {
          return paymentModeService
            .updatePaymentMode(mode._id, mode)
            .then(() => {
              this.loadPaymentModes();
              this.editModeId = null;
            })
            .catch((error) => {
              console.error("There was an error updating the payment mode!", error);
            });
        } else {
          return paymentModeService
            .createPaymentMode(mode)
            .then(() => {
              this.loadPaymentModes();
              this.editModeId = null;
            })
            .catch((error) => {
              console.error("There was an error creating the payment mode!", error);
            });
        }
      });
    },
    confirmDeleteMode(modeId) {
      this.modeToDelete = modeId;
      this.showConfirmationModal = true;
    },
    hideDeleteModal() {
      this.showConfirmationModal = false;
    },
    deleteMode() {
      if (this.modeToDelete) {
        return this.runWithLoader(() => {
          return paymentModeService
            .deletePaymentMode(this.modeToDelete)
            .then(() => {
              this.loadPaymentModes();
              this.hideDeleteModal();
            })
            .catch((error) => {
              console.error("There was an error deleting the payment mode!", error);
            });
        });
      }
    },
  },
};
</script>

<style scoped>
/* Add any necessary styles for the payment mode management */
</style>
