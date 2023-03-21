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
  <h2
    class="my-8 mt-12 text-xl font-semibold flex items-center justify-between"
  >
    <div>
      <div
        class="p-2 text-center inline-flex items-center justify-center w-12 h-12 mr-6 shadow-lg rounded-full bg-pink-900 text-white"
      >
        <font-awesome-icon :icon="['fas', 'star']" class="text-xl" />
      </div>
      <span> {{ $t("reviews.latestReviews") }}</span>
    </div>
  </h2>

  <!-- <Spinner v-if="!reviews.length" />
  
    <div class="w-full overflow-hidden shadow-lg rounded" v-else>
      <div class="w-full overflow-x-auto">
        <table class="w-full whitespace-no-wrap">
          <thead>
            <tr
              class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50 hidden md:table-row"
            >
              <th class="px-4 py-3">{{ $t('cellar.name') }}</th>
              <th class="px-4 py-3">{{ $t('cellar.vintage') }}</th>
              <th class="px-4 py-3">{{ $t('cellar.apellation') }}</th>
              <th class="px-4 py-3">{{ $t('cellar.type') }}</th>
              <th class="px-4 py-3 text-center">{{ $t('reviews.rating') }}</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y">
            <TableItemReviews
              v-for="review in reviews"
              :key="review.id"
              :item="review"
              :actions="false"
            />
          </tbody>
        </table>
      </div>
    </div> -->
</template>

<script setup lang="ts">
import { useBottlesStore } from "~~/stores/bottles";

const store = useBottlesStore();
const latestCellarBottles = computed(() => store.latestCellarBottles);
</script>
