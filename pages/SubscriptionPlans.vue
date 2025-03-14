<template>
  <div class="container mx-auto mt-8 px-4 relative">
    <!-- Loader Component -->
    <Loader v-if="isLoading" />

    <!-- Breadcrumb Navigation -->
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="flex space-x-2 text-gray-700">
        <li>
          <router-link to="/HomePage" class="text-blue-600 hover:text-blue-800">Home</router-link>
        </li>
        <li>
          <span>/</span>
        </li>
        <li class="text-gray-500 font-medium" aria-current="page">Subscription Plans</li>
      </ol>
    </nav>

    <!-- Page Title -->
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Subscription Plans</h2>

    <!-- Button to add a new subscription plan -->
    <div class="flex justify-end mb-4">
      <button
        class="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        @click="addPlan"
      >
        Add Subscription Plan
      </button>
    </div>

    <!-- Table displaying the subscription plans -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mode</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration (Months)</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <!-- Show a placeholder row if loading -->
          <template v-if="isLoading">
            <tr>
              <td colspan="8" class="text-center p-4">Loading subscription plans...</td>
            </tr>
          </template>
          <!-- Otherwise, render table rows -->
          <template v-else>
            <tr v-for="plan in plans" :key="plan._id" class="hover:bg-gray-50">
              <td class="px-4 py-4 text-lg text-gray-900">{{ plan.name }}</td>
              <td class="px-4 py-4 text-sm text-gray-900">{{ plan.version }}</td>
              <td class="px-4 py-4 text-sm text-gray-900">
                <template v-if="editPlanId === plan._id">
                  <input type="date" v-model="editPlanData.start_date" class="border border-gray-300 px-2 py-1 rounded-md w-full" />
                </template>
                <template v-else>
                  {{ plan.start_date }}
                </template>
              </td>
              <td class="px-4 py-4 text-sm text-gray-900">
                <template v-if="editPlanId === plan._id">
                  <input type="number" v-model="editPlanData.subscription_price" class="border border-gray-300 px-2 py-1 rounded-md w-full" />
                </template>
                <template v-else>
                  {{ plan.subscription_price }}
                </template>
              </td>
              <td class="px-4 py-4 text-sm text-gray-900">
                <template v-if="editPlanId === plan._id">
                  <select v-model="editPlanData.subscription_language" class="border border-gray-300 px-2 py-1 rounded-md w-full">
                    <option v-for="language in languages" :value="language._id" :key="language._id">
                      {{ language.name }}
                    </option>
                  </select>
                </template>
                <template v-else>
                  {{ getLanguageName(plan.subscription_language) }}
                </template>
              </td>
              <td class="px-4 py-4 text-sm text-gray-900">
                <template v-if="editPlanId === plan._id">
                  <select v-model="editPlanData.subscription_mode" class="border border-gray-300 px-2 py-1 rounded-md w-full">
                    <option v-for="mode in modes" :value="mode._id" :key="mode._id">
                      {{ mode.name }}
                    </option>
                  </select>
                </template>
                <template v-else>
                  {{ getModeName(plan.subscription_mode) }}
                </template>
              </td>
              <td class="px-4 py-4 text-sm text-gray-900">
                <template v-if="editPlanId === plan._id">
                  <input type="number" v-model="editPlanData.duration_in_months" class="border border-gray-300 px-2 py-1 rounded-md w-full" />
                </template>
                <template v-else>
                  {{ plan.duration_in_months }}
                </template>
              </td>
              <td class="px-4 py-4 text-sm flex space-x-2">
                <button v-if="editPlanId === plan._id" @click="savePlan(editPlanData, 'isAddingNew')" class="bg-green-600 text-white px-3 py-1 rounded-md text-xs shadow-sm hover:bg-green-700">
                  Save
                </button>
                <button v-if="editPlanId !== plan._id" @click="editPlan(plan)" class="bg-yellow-500 text-white px-3 py-1 rounded-md text-xs shadow-sm hover:bg-yellow-600">
                  Edit
                </button>
                <button v-if="editPlanId === plan._id" @click="cancelEditPlan" class="bg-gray-500 text-white px-3 py-1 rounded-md text-xs shadow-sm hover:bg-gray-600">
                  Cancel
                </button>
                <button @click="confirmDeletePlan(plan._id)" class="bg-red-600 text-white px-3 py-1 rounded-md text-xs shadow-sm hover:bg-red-700">
                  Delete
                </button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Confirmation modal for deletion -->
    <confirmation-modal
      v-if="showConfirmationModal"
      :show="showConfirmationModal"
      title="Confirm Delete"
      message="Are you sure you want to delete this subscription plan?"
      @close="hideDeleteModal"
      @confirm="deletePlan"
    />
  </div>
</template>

<script>
import subscriptionPlanService from "../services/subscriptionPlanService";
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
      plans: [],
      languages: [],
      modes: [],
      editPlanId: null,
      editPlanData: {}, // A deep copy of the plan being edited
      showConfirmationModal: false,
      planToDelete: null,
      isAddingNew: false,
    };
  },
  created() {
    this.runWithLoader(() =>
      Promise.all([this.loadPlans(), this.loadLanguages(), this.loadModes()])
    );
  },
  methods: {
    loadPlans() {
      return this.runWithLoader(() => {
        return subscriptionPlanService.getPlans()
          .then((response) => {
            this.plans = response.data;
          })
          .catch((error) => {
            console.error("There was an error retrieving the subscription plans!", error);
          });
      });
    },
    loadLanguages() {
      return this.runWithLoader(() => {
        return subscriptionPlanService.getLanguages()
          .then((response) => {
            this.languages = response.data;
          })
          .catch((error) => {
            console.error("There was an error retrieving the languages!", error);
          });
      });
    },
    loadModes() {
      return this.runWithLoader(() => {
        return subscriptionPlanService.getModes()
          .then((response) => {
            this.modes = response.data;
          })
          .catch((error) => {
            console.error("There was an error retrieving the modes!", error);
          });
      });
    },
    addPlan() {
      const newPlan = {
        _id: null,
        name: "New Plan",
        version: "",
        start_date: "",
        subscription_price: 0,
        subscription_language: this.languages.length > 0 ? this.languages[0]._id : null,
        subscription_mode: this.modes.length > 0 ? this.modes[0]._id : null,
        duration_in_months: 0,
      };
      this.plans.unshift(newPlan);
      // For a new plan, set editing state and create a deep copy for editing.
      this.editPlanId = newPlan._id; // Remains null if unsaved.
      this.editPlanData = JSON.parse(JSON.stringify(newPlan));
      this.isAddingNew = true;
    },
    editPlan(plan) {
      this.editPlanId = plan._id;
      // Create a deep copy for editing.
      this.editPlanData = JSON.parse(JSON.stringify(plan));
      this.isAddingNew = false;
    },
    savePlan(editedPlan, condition) {
      return this.runWithLoader(() => {
        // Determine version number.
        const existingPlans = this.plans.filter(
          (p) =>
            p.duration_in_months === editedPlan.duration_in_months &&
            p.subscription_language === editedPlan.subscription_language &&
            p.subscription_mode === editedPlan.subscription_mode
        );
        if (existingPlans.length > 0) {
          const validVersions = existingPlans
            .map((p) => parseInt(p.version.replace("v", "")))
            .filter((v) => !isNaN(v) && v !== null);
          const highestVersion = validVersions.length > 0 ? Math.max(...validVersions) : 0;
          editedPlan.version = "v" + (highestVersion + 1);
        } else {
          editedPlan.version = "v1";
        }
        const planData = {
          ...editedPlan,
          subscription_language: editedPlan.subscription_language,
          subscription_mode: editedPlan.subscription_mode,
        };
        let promise;
        if (editedPlan._id) {
          promise = subscriptionPlanService.updatePlan(editedPlan._id, planData);
        } else {
          promise = subscriptionPlanService.createPlan(planData).then(() => {
            this.isAddingNew = false;
          });
        }
        return promise
          .then(() => {
            this.loadPlans();
            this.editPlanId = null;
          })
          .catch((error) => {
            console.error("There was an error updating/creating the subscription plan!", error);
          });
      }, condition); // Pass the condition, for example "isAddingNew"
    },
    cancelEditPlan() {
      if (this.isAddingNew) {
        // For new unsaved plan, remove it from the list.
        this.plans.shift();
        this.isAddingNew = false;
      } else {
        // For existing plans, simply clear the editing state.
        // Since editPlanData is a copy, the original plan in the plans array remains unchanged.
        this.editPlanData = {};
      }
      this.editPlanId = null;
    },
    confirmDeletePlan(planId) {
      this.planToDelete = planId;
      this.showConfirmationModal = true;
    },
    hideDeleteModal() {
      this.showConfirmationModal = false;
    },
    deletePlan() {
      if (this.planToDelete) {
        return this.runWithLoader(() => {
          return subscriptionPlanService.deletePlan(this.planToDelete)
            .then(() => {
              this.loadPlans();
              this.hideDeleteModal();
            })
            .catch((error) => {
              console.error("There was an error deleting the subscription plan!", error);
            });
        });
      }
    },
    getLanguageName(languageId) {
      const language = this.languages.find((lang) => lang._id === languageId);
      return language ? language.name : "";
    },
    getModeName(modeId) {
      const mode = this.modes.find((m) => m._id === modeId);
      return mode ? mode.name : "";
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
.table th,
.table td {
  padding: 12px 16px;
  text-align: left;
}
.table th {
  background-color: #f8fafc;
}
</style>
