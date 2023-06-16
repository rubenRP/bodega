<template>
  <ReloadPWA />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useBottlesStore } from "~~/stores/bottles";
/* import { useReviewsStore } from "~~/stores/reviews"; */
import { useUserStore } from "./stores/user";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { useGeneralStore } from "./stores/general";

const generalStore = useGeneralStore();
const bottlesStore = useBottlesStore();
const userStore = useUserStore();
// const reviewsStore = useReviewsStore();
const user = useSupabaseUser();
const client = useSupabaseClient();

let realtimeChannelBottles: RealtimeChannel;
let realtimeChannelOpenedBottles: RealtimeChannel;
let realtimeChannelAddedBottles: RealtimeChannel;

userStore.fetchUser(user.value);
client.auth.onAuthStateChange((_, session) => {
  if (session) userStore.fetchUser(session.user);
});

bottlesStore.fetchStoreData();
// reviewsStore.fetchStoreData();

onMounted(() => {
  // getClientWith
  const width = window.innerWidth;

  if (width > 1024) {
    generalStore.sidebar = true;
  }

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
});
</script>
