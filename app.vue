<template>
  <ReloadPWA />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useUserStore } from "./stores/user";
import { useGeneralStore } from "./stores/general";

const generalStore = useGeneralStore();
const userStore = useUserStore();
// const reviewsStore = useReviewsStore();
const user = useSupabaseUser();
const client = useSupabaseClient();

if (user.value) userStore.fetchUser(user.value);

client.auth.onAuthStateChange((_, session) => {
  if (session) userStore.fetchUser(session.user);
});

//bottlesStore.fetchStoreData();
// reviewsStore.fetchStoreData();

onMounted(() => {
  // getClientWith
  const width = window.innerWidth;

  if (width > 1024) {
    generalStore.sidebar = true;
  }
});
</script>
