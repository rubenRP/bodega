<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white rounded shadow-lg"
  >
    <div class="flex-auto p-4">
      <div class="flex flex-wrap">
        <router-link
          to="/cellar"
          class="relative w-full pr-4 max-w-full flex-grow flex-1"
        >
          <h5 class="text-slate-400 uppercase font-bold text-xs">
            {{ $t("cellar.bottlesInCellar") }}
          </h5>
          <span class="font-semibold text-xl text-slate-700">
            {{ totalCellarBottles }}
          </span>
        </router-link>
        <div class="relative w-auto pl-4 flex-initial">
          <div
            class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              class="fill-current"
            >
              <path
                d="M10.78 0c1.17 0 2.13 1.05 2.13 2.35v2.43l.08.03c.22.07.43.18.62.33l.13-.06.07-.02V3c0-1.05.72-1.92 1.62-2h1.01c.96 0 1.75.9 1.75 2v2.06l.07.02c.68.24 1.18.93 1.24 1.77V16c0 1.1-.78 2-1.75 2h-3.27c-.16 1.13-1.04 2-2.1 2H8.12c-1.06 0-1.94-.87-2.1-2H2.75C1.78 18 1 17.1 1 16V7c0-.9.52-1.67 1.24-1.92l.07-.02V3c0-1.05.72-1.92 1.62-2h1.01c.96 0 1.75.9 1.75 2v2.06l.07.02.14.06a2 2 0 01.61-.33l.08-.03V2.35C7.6 1.11 8.46.1 9.56.01L9.72 0zm0 2H9.72v4.92h-1.6V18h4.26V6.92h-1.6V2zm5.6 1h-.75v4H14.5v9h3V7h-1.13V3zM6 7H4.87V3h-.75v4H3v9h3V7z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBottlesStore } from "~~/stores/bottles";

const store = useBottlesStore();
const totalCellarBottles = computed(() => store.totalCellarBottles);
const openedBottles = computed(() => store.openedBottles);
const addedBottles = computed(() => store.addedBottles);

const monthlyOpenedBottles = computed(() => {
  return openedBottles.value.filter(
    (bottle: any) =>
      new Date(bottle.date_opened).getMonth() === new Date().getMonth() &&
      new Date(bottle.date_opened).getFullYear() === new Date().getFullYear()
  );
});

const monthlyAddedBottles = computed(() => {
  return addedBottles.value.filter(
    (bottle: any) =>
      new Date(bottle.date_added).getMonth() === new Date().getMonth() &&
      new Date(bottle.date_added).getFullYear() === new Date().getFullYear()
  );
});

const monthlyBalance = computed(() => {
  return monthlyAddedBottles.value.length - monthlyOpenedBottles.value.length;
});
</script>
