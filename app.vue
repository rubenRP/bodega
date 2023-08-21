<template>
  <ClientOnly>
    <ReloadPWA />
  </ClientOnly>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useUserStore } from "./stores/user";
import { useGeneralStore } from "./stores/general";
import { useBottlesStore } from "./stores/bottles";
import { useSupabase } from "./composables/useSupabase";

const generalStore = useGeneralStore();
const userStore = useUserStore();
// const reviewsStore = useReviewsStore();
const bottlesStore = useBottlesStore();
const supabase = useSupabase();
const client = useSupabase();

// bottlesStore.fetchStoreData();
// reviewsStore.fetchStoreData();

await supabase.auth.onAuthStateChange((_, session) => {
  if (session && !userStore.loggedIn && !userStore.data)
    userStore.fetchUser(session.user);
});

let realtimeChannelBottles = client
  .channel("any")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "bottles" },
    (payload) => {
      console.log("Change received!", payload);
      bottlesStore.fetchBottles();
      bottlesStore.fetchOpenedBottles();
      bottlesStore.fetchAddedBottles();
    }
  )
  .subscribe();

onMounted(async () => {
  const width = window.innerWidth;

  if (width > 1024) {
    generalStore.sidebar = true;
  }
});
</script>
