<template>
  <div class="container mx-auto mt-8 px-4 relative">
    <!-- Loader Component -->
    <Loader v-if="isLoading" />

    <!-- Breadcrumb Navigation -->
    <nav aria-label="breadcrumb" class="mb-6">
      <ol class="flex space-x-2 text-gray-700">
        <li>
          <router-link to="/HomePage" class="text-blue-600 hover:text-blue-800 hover:underline">
            Home
          </router-link>
        </li>
        <li><span>/</span></li>
        <li class="text-gray-500" aria-current="page">Generate Report</li>
      </ol>
    </nav>

    <!-- Heading -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-3xl font-bold text-gray-800">Generate Report</h2>
      <!-- Optionally, top-right action button(s) -->
    </div>

    <!-- Filter Section -->
    <div class="mb-8 bg-white shadow-lg rounded-lg p-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Filter Options</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Left Column -->
        <div class="space-y-4">
          <!-- Subscriber Type -->
          <div class="filter-group">
            <label for="subscriberType" class="block text-sm font-medium text-gray-700 mb-1">
              <span class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Subscriber Type
              </span>
            </label>
            <select
              id="subscriberType"
              v-model="form.subscriberType"
              class="w-full border border-gray-300 rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 bg-white shadow-sm"
            >
              <option value="" disabled>Select Type</option>
              <option
                v-for="type in subscriberTypes"
                :key="type._id"
                :value="type.name"
              >
                {{ type.name }}
              </option>
            </select>
          </div>

          <!-- Subscription Plan -->
          <div class="filter-group">
            <label for="subscriptionPlan" class="block text-sm font-medium text-gray-700 mb-1">
              <span class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Subscription Plan
              </span>
            </label>
            <select
              id="subscriptionPlan"
              v-model="form.subscriptionPlan"
              class="w-full border border-gray-300 rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 bg-white shadow-sm"
            >
              <option value="" disabled>Select Plan</option>
              <option
                v-for="plan in subscriptionPlans"
                :key="plan._id"
                :value="plan._id"
              >
                {{ plan.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-4">
          <!-- Subscriber Category -->
          <div class="filter-group">
            <label for="subscriberCategory" class="block text-sm font-medium text-gray-700 mb-1">
              <span class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Subscriber Category
              </span>
            </label>
            <select
              id="subscriberCategory"
              v-model="form.subscriberCategory"
              class="w-full border border-gray-300 rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 bg-white shadow-sm"
            >
              <option value="" disabled>Select Category</option>
              <option
                v-for="category in subscriberCategories"
                :key="category._id"
                :value="category.name"
              >
                {{ category.name }}
              </option>
            </select>
          </div>

          <!-- Subscriber Status -->
          <div class="filter-group">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              <span class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Subscriber Status
              </span>
            </label>
            <div class="mt-1 p-2 bg-gray-50 rounded-lg border border-gray-200">
              <div class="flex items-center justify-between px-4">
                <span :class="form.subscriberStatus === 'active' ? 'text-green-600 font-medium' : 'text-gray-500'">
                  Active
                </span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="isActive" 
                    @change="toggleSubscriberStatus"
                    class="sr-only peer"
                  >
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
                <span :class="form.subscriberStatus === 'inactive' ? 'text-red-600 font-medium' : 'text-gray-500'">
                  Inactive
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Buttons to Generate & Download Report -->
    <div class="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
      <button
        class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition duration-200"
        @click="generateReport"
      >
        Generate
      </button>
      <button
        class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition duration-200"
        @click="downloadPdf"
      >
        Download PDF
      </button>
    </div>

    <!-- Report Display Section -->
    <div v-if="reportGenerated" class="mb-8 bg-white shadow-lg rounded-lg p-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Report</h2>
      <div v-if="reportData.length === 0" class="text-gray-500 italic">
        No data to display.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="(item, index) in reportData"
          :key="index"
          class="bg-white border border-gray-200 rounded-lg shadow p-4 hover:shadow-md transition-transform transform hover:-translate-y-1"
        >
          <div class="flex flex-col space-y-1 text-gray-700">
            <p>{{ item.Name }}</p>
            <p>{{ item['Address line 1'] }}</p>
            <p>{{ item['Address line 2'] }}</p>
            <p>{{ item.City }}</p>
            <p>{{ item.District }}</p>
            <p>{{ item.State }}</p>
            <p>{{ item.Pincode }}</p>
            <p>{{ item['Phone Number'] }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Toast Notification component at the end -->
    <toast-notification ref="toast" />
  </div>
</template>

<script>
import reportService from "../services/reportService";
import subscriberTypeService from "../services/subscriberTypeService";
import subscriberCategoryService from "../services/subscriberCategoryService";
import subscriptionPlanService from "../services/subscriptionPlanService";
import Loader from "~/components/Loader.vue";
import loadingMixin from "~/mixins/loadingMixin.js";
import ToastNotification from "./ToastNotification.vue";

export default {
  mixins: [loadingMixin],
  components: {
    Loader,
    ToastNotification,
  },
  data() {
    return {
      form: {
        subscriberStatus: "active",
        subscriberType: "",
        subscriberCategory: "",
        subscriptionPlan: "",
      },
      isActive: true,
      reportGenerated: false,
      reportData: [],
      subscriberTypes: [],
      subscriberCategories: [],
      subscriptionPlans: [],
    };
  },
  created() {
    this.runWithLoader(() =>
      Promise.all([
        this.fetchSubscriberTypes(),
        this.fetchSubscriberCategories(),
        this.fetchSubscriptionPlans(),
      ])
    );
  },
  methods: {
    toggleSubscriberStatus() {
      this.form.subscriberStatus = this.isActive ? "active" : "inactive";
    },
    fetchSubscriberTypes() {
      return subscriberTypeService
        .getSubscriberTypes()
        .then((response) => {
          this.subscriberTypes = response.data;
        })
        .catch((error) => {
          console.error("Error fetching subscriber types:", error);
          this.$refs.toast.showToast("Failed to fetch subscriber types", "Error", "error");
        });
    },
    fetchSubscriberCategories() {
      return subscriberCategoryService
        .getSubscriberCategories()
        .then((response) => {
          this.subscriberCategories = response.data;
        })
        .catch((error) => {
          console.error("Error fetching subscriber categories:", error);
          this.$refs.toast.showToast("Failed to fetch subscriber categories", "Error", "error");
        });
    },
    fetchSubscriptionPlans() {
      return subscriptionPlanService
        .getPlans()
        .then((response) => {
          this.subscriptionPlans = response.data;
        })
        .catch((error) => {
          console.error("Error fetching subscription plans:", error);
          this.$refs.toast.showToast("Failed to fetch subscription plans", "Error", "error");
        });
    },
    generateReport() {
      const filters = {
        status: this.form.subscriberStatus,
        subscriberType: this.form.subscriberType,
        subscriberCategory: this.form.subscriberCategory,
        subscriptionPlan: this.form.subscriptionPlan,
      };
      return this.runWithLoader(() => {
        return reportService
          .getReport(filters)
          .then((response) => {
            if (response.data.length > 0) {
              this.reportData = response.data;
              this.reportGenerated = true;
              this.$refs.toast.showToast("Report generated successfully", "Success", "success");
            } else {
              this.reportData = [];
              this.reportGenerated = false;
              this.$refs.toast.showToast("No data found for the selected filters", "Info", "info");
            }
          })
          .catch((error) => {
            console.error("There was an error fetching the report!", error);
            this.reportData = [];
            this.reportGenerated = false;
            this.$refs.toast.showToast("Failed to generate report", "Error", "error");
          });
      });
    },
    downloadPdf() {
      const filters = {
        status: this.form.subscriberStatus,
        subscriberType: this.form.subscriberType,
        subscriberCategory: this.form.subscriberCategory,
        subscriptionPlan: this.form.subscriptionPlan,
      };
      return this.runWithLoader(() => {
        return reportService
          .downloadPdfReport(filters)
          .then((response) => {
            const now = new Date();
            const formattedDate = now.toISOString().slice(0, 10);
            const formattedTime = now
              .toISOString()
              .slice(11, 19)
              .replace(/:/g, "-");
            const filename = `subscriber_report_${formattedDate}_${formattedTime}_IST.pdf`;
            const url = window.URL.createObjectURL(
              new Blob([response.data], { type: "application/pdf" })
            );
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            this.$refs.toast.showToast("PDF downloaded successfully", "Success", "success");
          })
          .catch((error) => {
            console.error("Error downloading the PDF:", error);
            this.$refs.toast.showToast("Failed to download PDF", "Error", "error");
          });
      });
    },
  },
};
</script>

<style scoped>
.filter-group {
  @apply relative rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-sm;
}

/* Remove the previous switch styles if they exist */
</style>
