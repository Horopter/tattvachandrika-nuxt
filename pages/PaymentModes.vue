<template>
  <div class="container mx-auto mt-10 px-6 relative">
    <!-- Loader Component -->
    <Loader v-if="isLoading" />

    <h2 class="text-3xl font-semibold text-gray-900 mb-6">Payment Modes</h2>

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
        <li class="text-gray-500 font-medium" aria-current="page">Payment Modes</li>
      </ol>
    </nav>

    <!-- Payment Modes Table -->
    <div class="shadow-lg overflow-hidden border border-gray-300 sm:rounded-xl">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-200">
          <tr>
            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <!-- Add New Payment Mode Row -->
          <tr v-if="addingNew">
            <td class="px-6 py-4">
              <input
                type="text"
                v-model="newPaymentMode.name"
                class="border border-gray-300 px-4 py-2 rounded-full w-full focus:ring focus:ring-indigo-300 focus:border-indigo-500"
                placeholder="Enter payment mode name"
              />
            </td>
            <td class="px-6 py-4">
              <button
                class="bg-indigo-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 mr-2"
                @click="saveNewPaymentMode"
              >
                Save
              </button>
              <button
                class="bg-gray-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                @click="cancelNewPaymentMode"
              >
                Cancel
              </button>
            </td>
          </tr>

          <!-- Existing Payment Modes Rows -->
          <tr
            v-for="mode in paymentModes"
            :key="mode._id"
            class="hover:bg-gray-50 transition duration-150"
          >
            <td v-if="editModeId === mode._id" class="px-6 py-4">
              <input
                type="text"
                v-model="editPaymentMode.name"
                class="border border-gray-300 px-4 py-2 rounded-full w-full focus:ring focus:ring-indigo-300 focus:border-indigo-500"
              />
            </td>
            <td v-else class="px-6 py-4 text-md font-semibold text-gray-700 font-sans">
              {{ mode.name }}
            </td>
            <td v-if="editModeId === mode._id" class="px-6 py-4 flex space-x-2">
              <button
                class="bg-indigo-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                @click="updatePaymentMode(mode._id)"
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
            <td v-else class="px-6 py-4 flex items-center space-x-3">
              <button
                class="bg-yellow-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                @click="editPaymentModeFunc(mode)"
                :disabled="editModeId !== null"
              >
                Edit
              </button>
              <button
                class="bg-red-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                @click="showDeleteModal(mode._id)"
                :disabled="editModeId !== null"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add New Payment Mode Button -->
    <div class="mt-6">
      <button
        class="bg-teal-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
        @click="startAddingNew"
        :disabled="addingNew || editModeId !== null"
      >
        Add New Payment Mode
      </button>
    </div>

    <!-- Confirmation Modal -->
    <confirmation-modal
      v-if="showConfirmationModal"
      :show="showConfirmationModal"
      title="Confirm Delete"
      message="Are you sure you want to delete this payment mode?"
      @close="hideDeleteModal"
      @confirm="deletePaymentMode"
    />
  </div>
</template>

<script>
import paymentModeService from "../services/paymentModeService";
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
      paymentModes: [],
      addingNew: false,
      editModeId: null,
      showConfirmationModal: false,
      modeToDelete: null,
      newPaymentMode: { name: "" },
      editPaymentMode: { name: "" },
    };
  },
  created() {
    this.runWithLoader(() => this.loadPaymentModes());
  },
  methods: {
    async loadPaymentModes() {
      try {
        const response = await paymentModeService.getPaymentModes();
        this.paymentModes = response.data;
      } catch (error) {
        console.error("There was an error retrieving the payment modes!", error);
      }
    },
    startAddingNew() {
      if (this.editModeId !== null) return;
      this.addingNew = true;
      this.resetNewPaymentMode();
    },
    cancelNewPaymentMode() {
      this.addingNew = false;
    },
    resetNewPaymentMode() {
      this.newPaymentMode = { name: "" };
    },
    async saveNewPaymentMode() {
      if (!this.newPaymentMode.name.trim()) return;
      try {
        await this.runWithLoader(() =>
          paymentModeService.createPaymentMode(this.newPaymentMode)
        );
        await this.loadPaymentModes();
        this.addingNew = false;
      } catch (error) {
        console.error("There was an error saving the payment mode!", error);
      }
    },
    editPaymentModeFunc(mode) {
      if (this.editModeId !== null) return;
      this.editModeId = mode._id;
      this.editPaymentMode = { ...mode };
    },
    cancelEdit() {
      this.editModeId = null;
      this.editPaymentMode = { name: "" };
    },
    async updatePaymentMode(id) {
      if (!this.editPaymentMode.name.trim()) return;
      try {
        await this.runWithLoader(() =>
          paymentModeService.updatePaymentMode(id, this.editPaymentMode)
        );
        await this.loadPaymentModes();
        this.editModeId = null;
        this.editPaymentMode = { name: "" };
      } catch (error) {
        console.error("There was an error updating the payment mode!", error);
      }
    },
    showDeleteModal(id) {
      if (this.editModeId !== null) return;
      this.modeToDelete = id;
      this.showConfirmationModal = true;
    },
    hideDeleteModal() {
      this.showConfirmationModal = false;
      this.modeToDelete = null;
    },
    async deletePaymentMode() {
      if (!this.modeToDelete) return;
      try {
        await this.runWithLoader(() =>
          paymentModeService.deletePaymentMode(this.modeToDelete)
        );
        await this.loadPaymentModes();
        this.hideDeleteModal();
      } catch (error) {
        console.error("There was an error deleting the payment mode!", error);
      }
    },
  },
};
</script>

<style scoped>
/* Add custom styles for smooth hover effects and modern design */
</style>
