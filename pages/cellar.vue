<template>
  <div class="sm:flex sm:justify-between sm:items-center mb-8">
    <div class="relative w-full max-w-md focus-within:text-gray-200">
      <div class="absolute inset-y-0 flex items-center pl-2">
        <font-awesome-icon :icon="['fas', 'search']" class="w-4 h-4" />
      </div>
      <input
        class="w-full pl-8 pr-2 py-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border rounded-md focus:placeholder-gray-500 focus:bg-white focus:border-pink-900 focus:outline-none focus:shadow-outline-purple form-input"
        type="text"
        :placeholder="$t('cellar.filterWines')"
        aria-label="Search"
        v-model="search"
      />
    </div>

    <div class="flex flex-wrap">
      <button
        class="text-sm px-4 py-2 leading-none border rounded rounded-r-none text-pink-800 border-pink-900 hover:bg-pink-900 hover:text-white lg:mt-0 ease-linear transition-all duration-150"
        :class="{ 'bg-pink-900 text-white': type === 'All' }"
        @click="type = 'All'"
      >
        All
      </button>

      <button
        class="text-sm px-4 py-2 leading-none border text-pink-800 border-pink-900 hover:bg-pink-900 hover:text-white lg:mt-0 ease-linear transition-all duration-150 -ml-px"
        :class="{ 'bg-pink-900 text-white': type === 'Red' }"
        @click="type = 'Red'"
      >
        {{ $t("cellar.red") }}
      </button>
      <button
        class="text-sm px-4 py-2 leading-none border text-pink-800 border-pink-900 hover:bg-pink-900 hover:text-white lg:mt-0 ease-linear transition-all duration-150 -ml-px"
        :class="{ 'bg-pink-900 text-white': type === 'White' }"
        @click="type = 'White'"
      >
        {{ $t("cellar.white") }}
      </button>
      <button
        class="text-sm px-4 py-2 leading-none border text-pink-800 border-pink-900 hover:bg-pink-900 hover:text-white lg:mt-0 ease-linear transition-all duration-150 -ml-px"
        :class="{ 'bg-pink-900 text-white': type === 'Rose' }"
        @click="type = 'Rose'"
      >
        {{ $t("cellar.rose") }}
      </button>
      <button
        class="text-sm px-4 py-2 leading-none border rounded rounded-l-none text-pink-800 border-pink-900 hover:bg-pink-900 hover:text-white lg:mt-0 ease-linear transition-all duration-150 -ml-px"
        :class="{ 'bg-pink-900 text-white': type === 'Sparkling' }"
        @click="type = 'Sparkling'"
      >
        {{ $t("cellar.sparkling") }}
      </button>
    </div>
  </div>

  <Spinner v-if="!cellarBottles.length" />

  <div class="w-full overflow-hidden shadow-lg rounded" v-else>
    <div class="w-full overflow-x-auto">
      <table class="w-full whitespace-no-wrap">
        <thead>
          <tr
            class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50 hidden md:table-row"
          >
            <th class="px-4 py-3">{{ $t("cellar.name") }}</th>
            <th class="px-4 py-3">{{ $t("cellar.vintage") }}</th>
            <th class="px-4 py-3">{{ $t("cellar.apellation") }}</th>
            <th class="px-4 py-3 text-center">{{ $t("cellar.type") }}</th>
            <th class="px-4 py-3 text-center">{{ $t("general.qty") }}</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y">
          <CellarTableItem
            v-for="bottle in filteredCellar"
            :key="bottle.id"
            :item="bottle"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBottlesStore } from "@/stores/bottles";
import useFilteredBottles from "~~/composables/filteredBottles";

const store = useBottlesStore();
const search = ref("");
const type = ref("All");
const openedNewBottle = ref(false);

const toggleNewBottle = () => {
  openedNewBottle.value = !openedNewBottle.value;
};

const cellarBottles = computed(() => store.cellarBottles);

const filteredCellar = computed(() => {
  return useFilteredBottles(cellarBottles.value, search.value, type.value);
});
</script>
