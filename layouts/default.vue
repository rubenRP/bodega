<template>
  <div class="flex h-screen overflow-hidden">
    <!-- <Notifications />-->
    <Navigation />
    <div
      class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
    >
      <Header />

      <main>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <router-view />
        </div>
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGeneralStore } from "@/stores/general";

const store = useGeneralStore();
const showSidebar = store.sidebar;
const toggleSidebar = () => store.toggleSidebar;

const bodyClasses =
  "font-inter antialiased bg-slate-100 text-slate-600 sidebar-expanded";

useHead({
  bodyAttrs: {
    class: bodyClasses,
  },
});
</script>
