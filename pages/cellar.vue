<template>
  <CellarFilters v-on:filterCollection="filterSearch" />

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

definePageMeta({
  middleware: "auth",
});

const store = useBottlesStore();
const search = ref("");
const type = ref("All");

const cellarBottles = computed(() => store.cellarBottles);

const filteredCellar = computed(() => {
  return useFilteredBottles(cellarBottles.value, search.value, type.value);
});

const filterSearch = (filters: { search: string; type: string }) => {
  search.value = filters.search;
  type.value = filters.type;
};
</script>
