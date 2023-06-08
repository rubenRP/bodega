<template>
  <div class="relative inline-flex">
    <button
      class="w-8 h-8 flex items-center justify-center hover:bg-slate-200 rounded-full bg-slate-200 text-slate-600"
      aria-haspopup="true"
      @click="toggleQuickAdd"
      @keydown.escape="closeQuickAdd"
    >
      <span class="sr-only">Quick Add</span
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        class="fill-current"
      >
        <path
          d="M9.317 0c1.228 0 2.223.895 2.223 2v3c1.227 0 2.222.895 2.222 2v1.005a5.47 5.47 0 00-2.223.575V7H9.318V2h-1.11v5H5.983v11h4.853a5.47 5.47 0 002.642.976C13.1 19.586 12.374 20 11.54 20H5.985c-1.227 0-2.222-.895-2.222-2V7c0-1.105.995-2 2.222-2V2c0-1.105.995-2 2.222-2h1.111zM14 9.5a1 1 0 01.993.883L15 10.5v2h2a1 1 0 01.117 1.993L17 14.5h-2v2a1 1 0 01-1.993.117L13 16.5v-2h-2a1 1 0 01-.117-1.993L11 12.5h2v-2a1 1 0 011-1z"
        ></path>
      </svg>
    </button>
    <div
      @keydown.escape="closeQuickAdd"
      v-if="isQuickAddOpen"
      class="origin-top-right z-10 absolute top-full min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1 right-0"
      aria-label="submenu"
    >
      <div>
        <ul>
          <li>
            <button
              class="font-medium text-sm flex items-center py-1 px-3 text-pink-900 hover:text-pink-800"
              @click="toggleNewBottle()"
            >
              <span>{{ $t("cellar.addBottle") }}</span>
            </button>
          </li>
          <li>
            <button
              class="font-medium text-sm flex items-center py-1 px-3 text-pink-900 hover:text-pink-800"
              @click="toggleNewReview()"
            >
              <span>{{ $t("reviews.addReview") }}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGeneralStore } from "~/stores/general";

const store = useGeneralStore();

const isQuickAddOpen = ref(false);
const openedNewReview = ref(false);

const toggleQuickAdd = () => (isQuickAddOpen.value = !isQuickAddOpen.value);
const closeQuickAdd = () => (isQuickAddOpen.value = false);

const toggleNewBottle = () => {
  store.openBottleForm();
  closeQuickAdd();
};
const toggleNewReview = () => {
  openedNewReview.value = !openedNewReview.value;
  closeQuickAdd();
};
</script>
