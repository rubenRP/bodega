<template>
  <div class="flex h-screen overflow-hidden">
    <Navigation />
    <div
      class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
    >
      <Header />
      <Notifications />
      <main>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <router-view />
        </div>
      </main>
      <Footer />
    </div>
  </div>
  <!-- <ReviewForm v-if="openedNewReview" @closeModalReview="toggleNewReview()" /> -->
  <BottleForm
    v-if="store.bottleForm"
    @closeModalForm="store.closeBottleForm()"
  />
</template>

<script setup lang="ts">
import { useGeneralStore } from "@/stores/general";
import BottleForm from "~/components/global/BottleForm.vue";

const store = useGeneralStore();

const bodyClasses = "font-inter antialiased bg-slate-100 text-slate-600";

useHead({
  bodyAttrs: {
    class: bodyClasses,
  },
});

onMounted(() => {
  if (store.sidebar) document.body.classList.add("sidebar-expanded");
});

watch(
  () => store.sidebar,
  (sidebar) => {
    if (sidebar) {
      document.body.classList.add("sidebar-expanded");
    } else {
      document.body.classList.remove("sidebar-expanded");
    }
  }
);
</script>
