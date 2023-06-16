<template>
  <div class="sm:flex sm:justify-between sm:items-center mb-8">
    <div class="relative w-full lg:max-w-md focus-within:text-gray-200">
      <div class="absolute inset-y-0 flex items-center pl-2">
        <ClientOnly>
          <font-awesome-icon :icon="['fas', 'search']" class="w-4 h-4" />
        </ClientOnly>
      </div>
      <input
        class="w-full pl-8 pr-2 py-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border rounded-md focus:placeholder-gray-500 focus:bg-white focus:border-pink-900 focus:outline-none focus:shadow-outline-purple form-input h-8"
        type="text"
        :placeholder="$t('cellar.filterWines')"
        aria-label="Search"
        v-model="search"
      />
    </div>

    <div class="flex flex-wrap mt-4 lg:mt-0 w-full lg:w-auto">
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
</template>

<script setup lang="ts">
const search = ref("");
const type = ref("All");

const emit = defineEmits(["filterCollection"]);

watch([search, type], () => {
  emit("filterCollection", { search: search.value, type: type.value });
});
</script>
