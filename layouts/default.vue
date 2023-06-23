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
          <slot />
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
import type { RealtimeChannel } from "@supabase/supabase-js";
import { useBottlesStore } from "~/stores/bottles";
import { useUserStore } from "~/stores/user";
import { useSupabase } from "~/composables/useSupabase";

const store = useGeneralStore();
const bottlesStore = useBottlesStore();

const client = useSupabase();

const bodyClasses = "font-inter antialiased bg-slate-100 text-slate-600";

let realtimeChannelBottles: RealtimeChannel;
let realtimeChannelOpenedBottles: RealtimeChannel;
let realtimeChannelAddedBottles: RealtimeChannel;

useHead({
  bodyAttrs: {
    class: bodyClasses,
  },
});

onMounted(() => {
  if (store.sidebar) document.body.classList.add("sidebar-expanded");
  bottlesStore.fetchStoreData();
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

realtimeChannelBottles = client
  .channel("any")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "bottles" },
    (payload) => {
      console.log("Change received!", payload);
      bottlesStore.fetchBottles();
    }
  );
realtimeChannelBottles.subscribe();

realtimeChannelAddedBottles = client
  .channel("any")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "added_bottles" },
    (payload) => {
      console.log("Change received!", payload);
      bottlesStore.fetchAddedBottles();
    }
  );
realtimeChannelAddedBottles.subscribe();

realtimeChannelOpenedBottles = client
  .channel("any")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "opened_bottles" },
    (payload) => {
      console.log("Change received!", payload);
      bottlesStore.fetchOpenedBottles();
    }
  );
realtimeChannelOpenedBottles.subscribe();
</script>
