<template>
  <h2
    class="my-4 mt-12 text-xl font-semibold flex items-center justify-between"
    v-if="cellarBottles.length"
  >
    <span>{{ $t("cellar.moreFromCellar") }}</span>
  </h2>

  <div
    class="w-full overflow-hidden shadow-lg rounded"
    v-if="cellarBottles.length"
  >
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
          </tr>
        </thead>
        <tbody class="bg-white divide-y">
          <CellarTableItem
            v-for="bottle in cellarBottles"
            :key="bottle.id"
            :item="bottle"
            :actions="false"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBottlesStore } from "@/stores/bottles";
import { Bottle } from "~/types/bottle";

const props = defineProps({
  bottle: {
    type: Object as () => Bottle,
    required: true,
  },
});

const store = useBottlesStore();

const cellarBottles = computed(() => {
  return store.bottlesFromCellar(props.bottle);
});
</script>
