<template>
  <div class="mt-6 xl:mt-12">
    <div class="grid gap-6 mb-8 grid-cols-1 xl:grid-cols-3">
      <QuickStatsCellarBottles />
      <CellarBottles class="hidden md:block" />
      <MonthlyOffset />
    </div>
  </div>
  <h2
    class="my-8 mt-12 text-xl font-semibold flex items-center justify-between"
  >
    <div>
      <div
        class="p-2 text-center inline-flex items-center justify-center w-12 h-12 mr-6 shadow-lg rounded-full bg-pink-900 text-white"
      >
        <font-awesome-icon :icon="['fas', 'wine-bottle']" class="text-xl" />
      </div>
      <span>{{ $t("cellar.latestBottles") }}</span>
    </div>
  </h2>

  <Spinner v-if="!latestCellarBottles.length" />

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
            <th class="px-4 py-3">{{ $t("cellar.type") }}</th>
            <th class="px-4 py-3 text-center">{{ $t("general.qty") }}</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y">
          <CellarTableItem
            v-for="bottle in latestCellarBottles"
            :key="bottle.id"
            :item="bottle"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBottlesStore } from "~~/stores/bottles";

const store = useBottlesStore();
const latestCellarBottles = computed(() => store.latestCellarBottles);
</script>
