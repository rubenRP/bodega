<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom"
  >
    <h1 class="h2">{{ $t("cellar.myCellar") }}</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
      <div class="btn-group me-2">
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="toggleNewBottle()"
        >
          <ClientOnly>
            <font-awesome-icon :icon="['fas', 'border-all']" />
          </ClientOnly>
          {{ $t("general.add") }}
        </button>
      </div>
    </div>
  </div>

  <div class="row justify-content-between mb-4 mt-3">
    <div class="col-auto">
      <div class="input-group mb-3">
        <span class="input-group-text" id="cellar-search"
          ><ClientOnly>
            <font-awesome-icon
              :icon="['fas', 'search']"
              class="w-4 h-4"
            /> </ClientOnly
        ></span>
        <input
          type="text"
          class="form-control"
          :placeholder="$t('cellar.filterWines')"
          aria-label="Search"
          aria-describedby="cellar-search"
          v-model="search"
        />
      </div>
    </div>
    <div class="col-auto">
      <div class="btn-group mb-3" role="group">
        <input
          type="radio"
          class="btn-check"
          autocomplete="off"
          checked
          name="btnType"
          id="btnTypeAll"
          v-model="type"
          value="All"
        />
        <label class="btn btn-outline-primary" for="btnTypeAll">All</label>
        <input
          type="radio"
          class="btn-check"
          autocomplete="off"
          name="btnType"
          id="btnTypeRed"
          v-model="type"
          value="Red"
        />
        <label class="btn btn-outline-primary" for="btnTypeRed">
          {{ $t("cellar.red") }}</label
        >
        <input
          type="radio"
          class="btn-check"
          autocomplete="off"
          name="btnType"
          id="btnTypeWhite"
          v-model="type"
          value="White"
        />
        <label class="btn btn-outline-primary" for="btnTypeWhite">
          {{ $t("cellar.white") }}</label
        >
        <input
          type="radio"
          class="btn-check"
          autocomplete="off"
          name="btnType"
          id="btnTypeRose"
          v-model="type"
          value="Rose"
        />
        <label class="btn btn-outline-primary" for="btnTypeRose">
          {{ $t("cellar.rose") }}</label
        >
        <input
          type="radio"
          class="btn-check"
          autocomplete="off"
          name="btnType"
          id="btnTypeSparkling"
          v-model="type"
          value="Sparkling"
        />
        <label class="btn btn-outline-primary" for="btnTypeSparkling">
          {{ $t("cellar.sparkling") }}</label
        >
      </div>
    </div>
  </div>

  <Spinner v-if="!cellarBottles.length" />

  <div class="table-responsive" v-else>
    <table class="table shadow-sm align-middle">
      <thead class="text-uppercase text-muted border-top">
        <tr>
          <th scope="col" class="ps-3">{{ $t("cellar.name") }}</th>
          <th scope="col">{{ $t("cellar.vintage") }}</th>
          <th scope="col">{{ $t("cellar.apellation") }}</th>
          <th scope="col">{{ $t("cellar.type") }}</th>
          <th scope="col" class="text-center pe-3">
            {{ $t("general.qty") }}
          </th>
        </tr>
      </thead>
      <tbody>
        <CellarTableItem
          v-for="bottle in filteredCellar"
          :key="bottle.id"
          :item="bottle"
        />
      </tbody>
    </table>
  </div>
  <BottleForm :opened="openedNewBottle" @closeModalForm="toggleNewBottle()" />
</template>

<script setup lang="ts">
import { useBottlesStore } from "@/stores/bottles";
import useFilteredBottles from "~~/composables/filteredBottles";

const store = useBottlesStore();
const search = ref("");
const type = ref("All");
const openedNewBottle = ref(false);

const toggleNewBottle = () => {
  openedNewBottle.value = !openedNewBottle.value;
};

const cellarBottles = computed(() => store.cellarBottles);

const filteredCellar = computed(() => {
  return useFilteredBottles(cellarBottles.value, search.value, type.value);
});
</script>
