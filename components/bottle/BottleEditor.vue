<template>
  <h2
    class="my-4 mt-12 text-xl font-semibold flex items-center justify-between"
  >
    <span>Edit bottle</span>
  </h2>
  <section class="min-w-0 p-4 mt-4 bg-white shadow-lg rounded">
    <form id="bottleEdit">
      <div class="grid gap-6 mb-6 md:grid-cols-3">
        <div>
          <label class="block text-sm">
            <span class="text-gray-700">{{ $t("cellar.name") }}</span>
            <input
              class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
              placeholder="Name"
              v-model="updatedBottle.name"
            />
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700">{{ $t("cellar.cellar") }}</span>
            <input
              class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
              placeholder="Cellar"
              v-model="updatedBottle.cellar"
            />
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700">{{ $t("cellar.vintage") }}</span>
            <input
              class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
              placeholder="Vintage"
              v-model="updatedBottle.vintage"
            />
          </label>

          <label class="block mt-4 text-sm">
            <span class="text-gray-700">{{ $t("cellar.country") }}</span>
            <input
              class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
              placeholder="Country"
              v-model="updatedBottle.country"
            />
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700">{{ $t("cellar.region") }}</span>
            <input
              class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
              placeholder="Region"
              v-model="updatedBottle.region"
            />
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700">{{ $t("cellar.apellation") }}</span>
            <input
              class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
              placeholder="Apellation"
              v-model="updatedBottle.apellation"
            />
          </label>
        </div>
        <div>
          <label class="block text-sm">
            <span class="text-gray-700">{{ $t("cellar.alcohol") }}</span>
            <input
              class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
              placeholder="Alcohol"
              v-model="updatedBottle.alcohol_content"
            />
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700">{{ $t("cellar.climate") }}</span>
            <input
              class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
              placeholder="Climate / Soil"
              v-model="updatedBottle.climate_soil"
            />
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700">{{ $t("cellar.consumption") }}</span>
            <input
              class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
              placeholder="Consumption"
              v-model="updatedBottle.consumption"
            />
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700">{{ $t("cellar.aging") }}</span>
            <input
              class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
              placeholder="Agint"
              v-model="updatedBottle.aging"
            />
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700">{{ $t("cellar.stay_barrel") }}</span>
            <input
              class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
              placeholder="Stay in barrel"
              v-model="updatedBottle.stay_barrel"
            />
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700">{{ $t("cellar.grapes") }}</span>
            <input
              class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
              placeholder="Grapes"
              v-model="updatedBottle.grapes"
            />
          </label>
        </div>
        <div>
          <label class="block text-sm">
            <span class="text-gray-700">{{ $t("cellar.type") }}</span>
            <select
              class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
              v-model="updatedBottle.type"
            >
              <option value="Red">{{ $t("cellar.red") }}</option>
              <option value="White">{{ $t("cellar.white") }}</option>
              <option value="Rose">{{ $t("cellar.rose") }}</option>
              <option value="Orange">{{ $t("cellar.orange") }}</option>
              <option value="Sparkling">{{ $t("cellar.sparkling") }}</option>
              <option value="Other">{{ $t("cellar.other") }}</option>
            </select>
          </label>
          <label class="block mt-4 mb-4 text-sm">
            <span class="text-gray-700">{{ $t("general.qty") }}</span>
            <div class="flex align-middle justify-between items-center">
              <div class="w-1/3">
                <input
                  type="number"
                  class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
                  v-model="updatedBottle.qty"
                />
              </div>
            </div>
          </label>
          <div class="block box">
            <button
              class="w-full px-5 py-3 text-sm font-medium leading-5 text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
              @click="emit('cancelEdit')"
            >
              {{ $t("general.cancel") }}
            </button>
            <button
              class="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-pink-900 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-pink-600 hover:bg-pink-700 focus:outline-none focus:shadow-outline-purple"
              @click="updateBottle()"
            >
              {{ $t("general.update") }}
            </button>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { Bottle } from "~/types/bottle";

const props = defineProps({
  bottle: {
    type: Object,
    required: true,
  },
});

const updatedBottle = ref({
  ...props.bottle,
} as Bottle);
const emit = defineEmits(["updateBottle", "cancelEdit"]);

const updateBottle = () => {
  emit("updateBottle", updatedBottle.value);
};
</script>
