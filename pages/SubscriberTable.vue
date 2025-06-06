<template>
  <Loader v-if="loading" />
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
        v-for="subscriber in subscribers"
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
          <button
            class="bg-blue-600 text-white px-4 py-1 rounded-md text-xs shadow-sm hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            @click="$emit('view', subscriber._id)"
          >
            View
          </button>

          <button
            class="bg-gray-600 text-white px-4 py-1 rounded-md text-xs shadow-sm hover:bg-gray-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            @click="$emit('edit', subscriber)"
          >
            Edit
          </button>

          <button
            v-if="showDelete"
            class="bg-red-600 text-white px-4 py-1 rounded-md text-xs shadow-sm hover:bg-orange-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            @click="$emit('delete', subscriber._id)"
          >
            Delete
          </button>

          <button
            v-if="showActivate"
            class="bg-green-600 text-white px-4 py-1 rounded-md text-xs shadow-sm hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            @click="$emit('activate', subscriber._id)"
          >
            Activate
          </button>
        </td>
      </tr>
      <tr v-if="subscribers.length === 0 && !loading">
        <td colspan="7" class="text-center py-4 text-gray-500">No subscribers to display.</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import Loader from '~/components/Loader.vue'

defineProps({
  subscribers: {
    type: Array,
    required: true,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  showDelete: {
    type: Boolean,
    default: false
  },
  showActivate: {
    type: Boolean,
    default: false
  }
})
</script>