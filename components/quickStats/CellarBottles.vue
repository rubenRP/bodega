<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ $t("cellar.bottlesInCellar") }}</h5>
      <p class="card-text">
        {{ totalCellarBottles }}
        <span class="ms-2 fw-bold text-success" v-if="monthlyBalance > 0">
          <span>+</span>{{ monthlyBalance }}</span
        >
        <span class="ms-2 fw-bold text-danger" v-else>
          {{ monthlyBalance }}</span
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBottlesStore } from "~~/stores/bottles";

const store = useBottlesStore();
const totalCellarBottles = computed(() => store.totalCellarBottles);
const openedBottles = computed(() => store.openedBottles);
const addedBottles = computed(() => store.addedBottles);

const monthlyOpenedBottles = computed(() => {
  return openedBottles.value.filter(
    (bottle: any) =>
      new Date(bottle.date_opened).getMonth() === new Date().getMonth() &&
      new Date(bottle.date_opened).getFullYear() === new Date().getFullYear()
  );
});

const monthlyAddedBottles = computed(() => {
  return addedBottles.value.filter(
    (bottle: any) =>
      new Date(bottle.date_added).getMonth() === new Date().getMonth() &&
      new Date(bottle.date_added).getFullYear() === new Date().getFullYear()
  );
});

const monthlyBalance = computed(() => {
  return monthlyAddedBottles.value.length - monthlyOpenedBottles.value.length;
});
</script>
