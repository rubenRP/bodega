<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useBottlesStore } from "~~/stores/bottles";
const store = useBottlesStore();
store.fetchStoreData();
</script>
