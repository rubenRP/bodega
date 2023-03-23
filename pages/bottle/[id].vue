<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom d-lg-none"
  >
    <h1 class="h2">
      <span>{{ bottle?.name }}</span>
      <p class="text-muted fw-light fs-4">
        {{ bottle?.cellar }}
      </p>
    </h1>
    <div class="btn-toolbar mb-2 mb-md-0">
      <div class="btn-group me-2">
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="$router.back"
        >
          <ClientOnly>
            <font-awesome-icon :icon="['fas', 'border-all']" />
          </ClientOnly>
          {{ $t("general.back") }}
        </button>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-4">
      <div class="card shadow-sm card-bottle-img h-100">
        <img
          :src="bottle.image"
          class="card-img-top"
          alt="..."
          v-if="bottle?.image"
        />
        <img
          src="@/assets/img/bottle-empty.jpg"
          class="card-img-top"
          alt="..."
          v-else
        />
      </div>
    </div>
    <div class="col-8">
      <div class="card shadow-sm">
        <div class="card-body">
          <h2 class="card-title">
            {{ bottle?.name }}
          </h2>
          <h6 class="card-subtitle fs-4 fw-light mb-4 text-muted">
            {{ bottle?.cellar }}
          </h6>
          <div class="card-text">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <WineTag :type="bottle?.type" />
              </div>

              <div class="d-flex align-items-center">
                <button
                  class="btn btn-outline-primary me-4"
                  type="button"
                  @click="toggleEditBottle()"
                  v-if="isAdmin"
                >
                  <ClientOnly>
                    <font-awesome-icon :icon="['fas', 'edit']" />
                  </ClientOnly>
                </button>

                <BottleQtySelector
                  :qty="bottle?.qty"
                  v-on:incrementQty="increaseQty(bottle?.id || -1)"
                  v-on:decrementQty="decreaseQty(bottle?.id || -1)"
                />
              </div>
            </div>
          </div>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-if="bottle?.vintage">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ $t("cellar.vintage") }}</h5>
            </div>
            <p class="mb-1">{{ bottle?.vintage }}</p>
          </li>
          <li
            class="list-group-item"
            v-if="bottle?.country || bottle?.region || bottle?.apellation"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">
                {{ $t("cellar.region")
                }}<span v-if="bottle?.apellation">
                  - {{ $t("cellar.apellation") }}</span
                >
              </h5>
            </div>
            <p class="mb-1">
              <span v-if="bottle?.country">{{ bottle?.country }}</span
              ><span v-if="bottle?.region"> - {{ bottle?.region }}</span
              ><span v-if="bottle?.apellation">
                - {{ bottle?.apellation }}</span
              >
            </p>
          </li>
          <li class="list-group-item" v-if="bottle?.grapes">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ $t("cellar.grapes") }}</h5>
            </div>
            <p class="mb-1">{{ bottle?.grapes?.join(", ") }}</p>
          </li>
          <li class="list-group-item" v-if="bottle?.alcohol_content">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ $t("cellar.alcoholContent") }}</h5>
            </div>
            <p class="mb-1">{{ bottle?.alcohol_content }}%</p>
          </li>
          <li class="list-group-item" v-if="bottle?.climate_soil">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ $t("cellar.climateSoil") }}</h5>
            </div>
            <p class="mb-1">{{ bottle?.climate_soil }}</p>
          </li>
          <li class="list-group-item" v-if="bottle?.consumption">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ $t("cellar.consumption") }}</h5>
            </div>
            <p class="mb-1">{{ bottle?.consumption }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="card shadow-sm mt-4" v-if="bottle?.description">
    <div class="card-body">
      <h3 class="card-title">
        <span>{{ $t("cellar.details") }}</span>
      </h3>
      <div class="card-text">
        {{ bottle?.description }}
      </div>
    </div>
  </div>

  <div class="mt-4" v-if="cellarBottles.length">
    <h2 class="mb-4">
      <span>{{ $t("cellar.moreFromCellar") }}</span>
    </h2>

    <div class="table-responsive">
      <table class="table shadow-sm align-middle">
        <thead class="text-uppercase text-muted border-top">
          <tr>
            <th scope="col" class="ps-3">{{ $t("cellar.name") }}</th>
            <th scope="col">{{ $t("cellar.vintage") }}</th>
            <th scope="col">{{ $t("cellar.apellation") }}</th>
            <th scope="col">{{ $t("cellar.type") }}</th>
          </tr>
        </thead>
        <tbody>
          <CellarTableItem
            v-for="bottle in cellarBottles"
            :key="bottle.id"
            :item="bottle"
            :actions="false"
          />
        </tbody>
      </table>
    </div>
  </div>

  <div class="mt-4" v-if="apellationBottles.length">
    <h2 class="mb-4">
      <span>{{ $t("cellar.moreFromApellation") }}</span>
    </h2>

    <div class="table-responsive">
      <table class="table shadow-sm align-middle">
        <thead class="text-uppercase text-muted border-top">
          <tr>
            <th scope="col" class="ps-3">{{ $t("cellar.name") }}</th>
            <th scope="col">{{ $t("cellar.vintage") }}</th>
            <th scope="col">{{ $t("cellar.apellation") }}</th>
            <th scope="col">{{ $t("cellar.type") }}</th>
          </tr>
        </thead>
        <tbody>
          <CellarTableItem
            v-for="bottle in apellationBottles"
            :key="bottle.id"
            :item="bottle"
            :actions="false"
          />
        </tbody>
      </table>
    </div>
  </div>

  <!-- <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white mt-6"
  >
    <div class="block w-full overflow-x-auto">
      <div
        class="w-full bg-transparent border-collapse lg:mb-6 px-4 py-6 flex flex-col lg:flex-row items-start"
      >
        <div class="w-full lg:w-2/3 mr-8">
          <ReviewList :bottleId="bottle.id" v-if="bottle" />
        </div>
        <div class="w-full lg:w-1/3">
          <ReviewForm :bottleId="bottle.id" v-if="bottle" />
        </div>
      </div>
    </div>
  </div> -->

  <!--     <Scraper :bottle="bottle" v-if="isAdmin && bottle" />
  
    <teleport to="#beforeBodyEnd">
      <BottleForm
        v-if="editBottle"
        @closeModalForm="toggleEditBottle()"
        :bottle="bottle"
      />
    </teleport> -->
</template>

<script setup lang="ts">
import { useBottlesStore } from "@/stores/bottles";

const store = useBottlesStore();
const route = useRoute();

const id = ref(0);
const editBottle = ref(false);
const isAdmin = ref(true);

onMounted(() => {
  id.value = parseInt(route.params.id as string);
});

const bottle = computed(() => {
  return store.allBottles.find((bottle) => bottle.id === id.value);
});

const cellarBottles = computed(() => {
  if (bottle.value) {
    return store.bottlesFromCellar(bottle.value);
  } else {
    return [];
  }
});

const apellationBottles = computed(() => {
  if (bottle.value) {
    return store.bottlesFromApellation(bottle.value).slice(0, 5);
  } else {
    return [];
  }
});

const increaseQty = (id: number) => {
  bottle && store.increaseBottleQty({ bottleId: id, qty: bottle.value!.qty! });
};

const decreaseQty = (id: number) => {
  bottle && store.decreaseBottleQty({ bottleId: id, qty: bottle.value!.qty! });
};
const toggleEditBottle = () => {
  editBottle.value = !editBottle.value;
};
</script>
