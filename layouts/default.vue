<template>
  <Header />
  <!--<Notifications />-->
  <main class="container">
    <router-view />
  </main>
  <Footer />
</template>

<script setup lang="ts">
import { useGeneralStore } from "@/stores/general";

const store = useGeneralStore();
const showSidebar = store.sidebar;
const toggleSidebar = () => store.toggleSidebar;
</script>
