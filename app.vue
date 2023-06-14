<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useBottlesStore } from "~~/stores/bottles";
import { useReviewsStore } from "~~/stores/reviews";
import { useUserStore } from "./stores/user";

const store = useBottlesStore();
const userStore = useUserStore();
const reviewsStore = useReviewsStore();
const user = useSupabaseUser();
const auth = useSupabaseAuthClient();
const client = useSupabaseClient();

userStore.fetchUser(user.value);
client.auth.onAuthStateChange((_, session) => {
  if (session) userStore.fetchUser(session.user);
});

store.fetchStoreData();
reviewsStore.fetchStoreData();
</script>
