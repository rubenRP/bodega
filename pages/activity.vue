<template>
  <Spinner v-if="!allBottles.length" />

  <div class="w-full overflow-hidden shadow-lg rounded" v-else>
    <div class="w-full overflow-x-auto">
      <table class="w-full whitespace-no-wrap">
        <thead>
          <tr
            class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50 hidden md:table-row"
          >
            <th></th>
            <th class="px-4 py-3">{{ $t("cellar.name") }}</th>
            <th class="px-4 py-3">{{ $t("cellar.vintage") }}</th>
            <th class="px-4 py-3">{{ $t("cellar.apellation") }}</th>
            <th class="px-4 py-3 text-center">{{ $t("cellar.type") }}</th>
            <th class="px-4 py-3">{{ $t("cellar.date") }}</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y">
          <ActivityTableItem v-for="item in activity" :item="item" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBottlesStore } from "@/stores/bottles";

definePageMeta({
  middleware: "auth",
});

const store = useBottlesStore();
const allBottles = computed(() => store.allBottles);
const openedBottles = computed(() => store.openedBottles);
const addedBottles = computed(() => store.addedBottles);

const openedBottlesWithData = computed(() =>
  openedBottles.value.map((bottle) => {
    const bottleData = allBottles.value.find((b) => b.id === bottle.bottle_id);
    return {
      ...bottle,
      ...bottleData,
      date_used: bottle.date_opened,
      action: "bottle_opened",
    };
  })
);

const addedBottlesWithData = computed(() =>
  addedBottles.value.map((bottle) => {
    const bottleData = allBottles.value.find((b) => b.id === bottle.bottle_id);
    return {
      ...bottle,
      ...bottleData,
      date_used: bottle.date_added,
      action: "bottle_added",
    };
  })
);

const activity = computed(() => {
  const activity = [
    ...openedBottlesWithData.value,
    ...addedBottlesWithData.value,
  ];
  return activity
    .sort((a, b) => {
      return new Date(b.date_used).getTime() - new Date(a.date_used).getTime();
    })
    .slice(0, 50);
});
</script>
