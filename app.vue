<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useBottlesStore } from "~~/stores/bottles";
import { useReviewsStore } from "~~/stores/reviews";
const store = useBottlesStore();
const reviewsStore = useReviewsStore();
store.fetchStoreData();
reviewsStore.fetchStoreData();
</script>
