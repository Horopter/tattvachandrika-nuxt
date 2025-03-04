<template>
  <div class="container mx-auto mt-8 px-4">
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
          Generate Report
        </li>
      </ol>
    </nav>

    <!-- Heading (similar style to your other pages) -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-3xl font-bold text-gray-800">
        Generate Report
      </h2>
      <!-- Optionally, you can place any top-right action button(s) here -->
    </div>

    <!-- Filter Section (similar to the "Search & Filter" box in the other page) -->
    <div class="mb-8 bg-white shadow-lg rounded-lg p-6">
      <!-- Use a grid layout for consistent columns -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Subscriber Type -->
        <div>
          <label 
            for="subscriberType" 
            class="block text-sm font-semibold text-gray-700 mb-1"
          >
            Subscriber Type
          </label>
          <select
            id="subscriberType"
            v-model="form.subscriberType"
            class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
          >
            <option value="" disabled>Select</option>
            <option
              v-for="type in subscriberTypes"
              :key="type._id"
              :value="type.name"
            >
              {{ type.name }}
            </option>
          </select>
        </div>

        <!-- Subscriber Category -->
        <div>
          <label 
            for="subscriberCategory" 
            class="block text-sm font-semibold text-gray-700 mb-1"
          >
            Subscriber Category
          </label>
          <select
            id="subscriberCategory"
            v-model="form.subscriberCategory"
            class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
          >
            <option value="" disabled>Select</option>
            <option
              v-for="category in subscriberCategories"
              :key="category._id"
              :value="category.name"
            >
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- Subscriber Status (Toggle) -->
        <div>
          <label 
            for="subscriberStatus" 
            class="block text-sm font-semibold text-gray-700 mb-1"
          >
            Subscriber Status
          </label>
          <div class="flex items-center space-x-3">
            <!-- "Active" Label -->
            <span
              :class="form.subscriberStatus === 'active' 
                ? 'text-green-600 font-bold' 
                : 'text-gray-400'"
            >
              Active
            </span>
            <!-- Toggle Switch -->
            <label class="switch">
              <input
                type="checkbox"
                v-model="isActive"
                @change="toggleSubscriberStatus"
              />
              <span class="slider round"></span>
            </label>
            <!-- "Inactive" Label -->
            <span
              :class="form.subscriberStatus === 'inactive' 
                ? 'text-red-600 font-bold' 
                : 'text-gray-400'"
            >
              Inactive
            </span>
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
      
      <!-- Show "No data" if empty -->
      <div v-if="reportData.length === 0" class="text-gray-500 italic">
        No data to display.
      </div>

      <!-- Card Layout for Results -->
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
  </div>
</template>

<script>
import reportService from '../services/reportService';
import subscriberTypeService from '../services/subscriberTypeService';
import subscriberCategoryService from '../services/subscriberCategoryService';

export default {
  data() {
    return {
      form: {
        subscriberStatus: 'active', // Default to active
        subscriberType: '',
        subscriberCategory: '',
      },
      isActive: true, // Switch state for active/inactive subscribers
      reportGenerated: false,
      reportData: [],
      subscriberTypes: [],
      subscriberCategories: [],
    };
  },
  methods: {
    toggleSubscriberStatus() {
      this.form.subscriberStatus = this.isActive ? 'active' : 'inactive';
    },
    fetchSubscriberTypes() {
      subscriberTypeService
        .getSubscriberTypes()
        .then((response) => {
          this.subscriberTypes = response.data;
        })
        .catch((error) => {
          console.error('Error fetching subscriber types:', error);
          alert('Failed to fetch subscriber types. Please try again.');
        });
    },
    fetchSubscriberCategories() {
      subscriberCategoryService
        .getSubscriberCategories()
        .then((response) => {
          this.subscriberCategories = response.data;
        })
        .catch((error) => {
          console.error('Error fetching subscriber categories:', error);
          alert('Failed to fetch subscriber categories. Please try again.');
        });
    },
    generateReport() {
      const filters = {
        status: this.form.subscriberStatus,
        subscriberType: this.form.subscriberType,
        subscriberCategory: this.form.subscriberCategory,
      };

      reportService
        .getReport(filters)
        .then((response) => {
          if (response.data.length > 0) {
            this.reportData = response.data;
            this.reportGenerated = true;
          } else {
            this.reportData = [];
            this.reportGenerated = false;
          }
        })
        .catch((error) => {
          console.error('There was an error fetching the report!', error);
          this.reportData = [];
          this.reportGenerated = false;
          alert('Failed to fetch the report. Please try again.');
        });
    },
    downloadPdf() {
      const filters = {
        status: this.form.subscriberStatus,
        subscriberType: this.form.subscriberType,
        subscriberCategory: this.form.subscriberCategory,
      };

      reportService
        .downloadPdfReport(filters)
        .then((response) => {
          // Get the current datetime
          const now = new Date();
          const formattedDate = now.toISOString().slice(0, 10); // YYYY-MM-DD
          const formattedTime = now.toISOString().slice(11, 19).replace(/:/g, '-'); // HH-MM-SS

          // Set the filename with IST timezone
          const filename = `subscriber_report_${formattedDate}_${formattedTime}_IST.pdf`;

          // Handle the PDF download
          const url = window.URL.createObjectURL(
            new Blob([response.data], { type: 'application/pdf' })
          );
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error('Error downloading the PDF:', error);
          alert('Failed to download the PDF. Please try again.');
        });
    },
  },
  created() {
    this.fetchSubscriberTypes();
    this.fetchSubscriberCategories();
  },
};
</script>

<style scoped>
/* Keep switch-related styling if you want the same toggle UI. */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  cursor: pointer;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: #fff;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4caf50;
}

input:checked + .slider:before {
  transform: translateX(26px);
}
</style>
