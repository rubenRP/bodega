<template>
  <header class="sticky top-0 bg-white border-b border-slate-200 z-30">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 -mb-px">
        <div class="flex">
          <button
            class="text-slate-500 hover:text-slate-600 lg:hidden mr-3"
            aria-controls="sidebar"
            aria-expanded="false"
            @click="toggleSidebar()"
          >
            <span class="sr-only">Open sidebar</span
            ><svg
              class="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="4" y="5" width="16" height="2"></rect>
              <rect x="4" y="11" width="16" height="2"></rect>
              <rect x="4" y="17" width="16" height="2"></rect>
            </svg>
          </button>
          <NuxtLink to="/">
            <Logo class="w-32 text-slate-800 lg:hidden" />
          </NuxtLink>
        </div>
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
const toggleSidebar = () => store.toggleSidebar();
</script>
P
