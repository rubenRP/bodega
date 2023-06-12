<template>
  <div class="mt-6 xl:mt-12">
    <div class="grid gap-6 mb-8 grid-cols-1 xl:grid-cols-3">
      <CellarBottles class="hidden md:block" />
      <QuickStatsMonthlyOffset />
    </div>
  </div>
  <h2
    class="my-4 mt-12 text-xl font-semibold flex items-center justify-between"
  >
    <span>{{ $t("cellar.latestBottles") }}</span>
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
import CellarBottles from "~/components/quickStats/CellarBottles.vue";
import { useBottlesStore } from "~~/stores/bottles";

definePageMeta({
  middleware: "auth",
});

const store = useBottlesStore();
const latestCellarBottles = computed(() => store.latestCellarBottles);
</script>
