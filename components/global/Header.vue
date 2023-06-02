<template>
  <header class="sticky top-0 bg-white border-b border-slate-200 z-30">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 -mb-px">
        <div class="flex"></div>
        <div class="flex items-center space-x-3">
          <QuickAdd />
          <hr class="w-px h-6 bg-slate-200 dark:bg-slate-700 border-none" />
          <ProfileMenu />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useGeneralStore } from "~~/stores/general";

const store = useGeneralStore();
const showSidebar = computed(() => store.sidebar);
const toggleSidebar = () => store.toggleSidebar();
</script>
P
