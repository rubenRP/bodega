<template>
  <div class="row my-5">
    <div class="col-3">
      <QuickStatsCellarBottles />
    </div>
    <!--  <TotalReviews class="hidden md:block" /> -->
  </div>

  <h2 class="mb-4">
    <span>{{ $t("cellar.latestBottles") }}</span>
  </h2>

  <Spinner v-if="!latestCellarBottles.length" />

  <div class="table-responsive" v-else>
    <table class="table shadow-sm align-middle">
      <thead class="text-uppercase text-muted border-top">
        <tr>
          <th scope="col" class="ps-3">{{ $t("cellar.name") }}</th>
          <th scope="col">{{ $t("cellar.vintage") }}</th>
          <th scope="col">{{ $t("cellar.apellation") }}</th>
          <th scope="col">{{ $t("cellar.type") }}</th>
          <th scope="col" class="text-center pe-3">{{ $t("general.qty") }}</th>
        </tr>
      </thead>
      <tbody>
        <CellarTableItem
          v-for="bottle in latestCellarBottles"
          :key="bottle.id"
          :item="bottle"
        />
      </tbody>
    </table>
  </div>

  <h2 class="mb-4 mt-4">
    <span> {{ $t("reviews.latestReviews") }}</span>
  </h2>

  <Spinner v-if="!reviews.length" />

  <div class="table-responsive" v-else>
    <table class="table shadow-sm align-middle">
      <thead class="text-uppercase text-muted border-top">
        <tr>
          <th scope="col" class="ps-3">{{ $t("cellar.name") }}</th>
          <th scope="col">{{ $t("cellar.vintage") }}</th>
          <th scope="col">{{ $t("cellar.apellation") }}</th>
          <th scope="col">{{ $t("cellar.type") }}</th>
          <th scope="col" class="text-center pe-3">
            {{ $t("reviews.rating") }}
          </th>
        </tr>
      </thead>
      <tbody>
        <TableItemReviews
          v-for="review in reviews"
          :key="review.id"
          :item="review"
        />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useBottlesStore } from "~~/stores/bottles";
import { useReviewsStore } from "~~/stores/reviews";

const store = useBottlesStore();
const reviewsStore = useReviewsStore();
const latestCellarBottles = computed(() => store.latestCellarBottles);
const reviews = computed(() => reviewsStore.latestReviews);
</script>
