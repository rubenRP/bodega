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

//bottlesStore.fetchStoreData();
// reviewsStore.fetchStoreData();

await client.auth.onAuthStateChange((_, session) => {
  console.log("onAuthStateChange");
  console.log(userStore.loggedIn, userStore.data, session);
  if (session && !userStore.loggedIn && !userStore.data)
    userStore.fetchUser(session.user);
});

onMounted(async () => {
  const width = window.innerWidth;

  if (width > 1024) {
    generalStore.sidebar = true;
  }
});
</script>
