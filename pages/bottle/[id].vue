<template>
  <h2
    class="text-2xl font-semibold text-gray-700 items-center justify-between pb-6 md:pb-2 flex md:hidden"
  >
    <span
      >{{ bottle?.name }}
      <p class="text-sm text-gray-500">
        {{ bottle?.cellar }}
      </p>
    </span>
  </h2>
  <div class="grid gap-6 mb-6 md:my-6 md:grid-cols-3">
    <div class="min-w-0 p-4 bg-white shadow-lg rounded">
      <img
        aria-hidden="true"
        class="w-auto max-h-80 m-auto"
        :src="bottle.image"
        v-if="bottle?.image"
      />
      <img
        aria-hidden="true"
        class="w-auto max-h-80 m-auto"
        src="@/assets/img/bottle-empty.jpg"
        v-else
      />
    </div>
    <div
      class="min-w-0 p-6 bg-white shadow-lg rounded md:col-span-2 flex flex-col justify-between"
    >
      <h2
        class="mb-4 text-2xl font-semibold text-gray-700 items-center justify-between pb-4 border-b-2 hidden md:flex"
      >
        <span
          >{{ bottle?.name }}
          <p class="text-sm text-gray-500 md:block">
            {{ bottle?.cellar }}
          </p>
        </span>
      </h2>
      <div class="mb-4">
        <div class="text-md text-gray-500">
          <span v-if="bottle?.apellation">{{ bottle?.apellation }} - </span
          ><span class="font-bold">{{ bottle?.vintage }}</span>
        </div>
        <p class="text-sm text-gray-500 mt-4">
          {{ bottle?.grapes?.join(", ") }}
        </p>
        <div class="text-xs mt-6">
          <WineTag :type="bottle?.type" />
        </div>

        <div class="mt-6">
          <span
            class="p-2 w-10 h-10 border-pink-900 text-gray-800 rounded-md flex items-center justify-center border"
          >
            {{ bottle?.qty }}
          </span>
        </div>
      </div>

      <div class="flex justify-between items-center pt-4 border-t-2">
        <div class="flex">
          <button
            class=""
            type="button"
            @click="toggleEditBottle()"
            v-if="isAdmin"
          >
            <span
              class="p-2 w-10 h-10 bg-pink-100 hover:bg-pink-900 text-gray-600 hover:text-white transition-all rounded-md flex items-center justify-center m-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                class="fill-current"
              >
                <path
                  d="M16.51 1.16L19.34 4a2 2 0 010 2.83l-10.6 10.6a2 2 0 01-.37.3l.02.01-.16.06c-.14.07-.29.13-.44.16l-3.84 1.42a2 2 0 01-2.62-2.42l1.3-4.59.03.02a2 2 0 01.42-.61l10.6-10.6a2 2 0 012.83 0zM3.67 16.06l-.41 1.43 1.4-.51-1-.92zm8.96-11.02l-8.14 8.14 2.83 2.83 8.14-8.14-2.83-2.83zm2.47-2.46l-1.06 1.05 2.83 2.83 1.05-1.06-2.82-2.82z"
                ></path>
              </svg>
            </span>
            <span class="mt-3 text-xs">Edit</span>
          </button>
          <button
            class="ml-4"
            type="button"
            @click="scrapeBottle()"
            v-if="isAdmin"
          >
            <span
              class="p-2 w-10 h-10 bg-pink-100 hover:bg-pink-900 text-gray-600 hover:text-white transition-all rounded-md flex items-center justify-center m-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                class="fill-current"
              >
                <path
                  d="M16.625,1 C17.9366763,1 19,2.00735931 19,3.25 L19,3.25 L19.0009752,11.500811 C18.485361,10.8140699 17.7970599,10.2644049 17.0005324,9.91627634 L17,6.72 L11.5683958,9.53363561 C11.8787783,9.72974764 12.2010832,9.93461394 12.5356328,10.1483794 C11.9225066,10.4964379 11.390024,10.9703902 10.9735012,11.5351089 C7.36965551,9.25212309 5.12210955,7.9626603 4.88962842,7.9626603 L4.65576095,8.12481111 C4.55165957,8.19941242 4.41729931,8.3014151 4.26167022,8.43419821 C3.79406338,8.83316144 3.21509447,9.43266289 2.53276052,10.2281591 L2,10.859 L2,17 L10.6696616,17.0012971 C11.1692205,17.864288 11.9193504,18.5641124 12.8205484,19.0012675 L2.375,19 C1.06332372,19 0,17.9926407 0,16.75 L0,16.75 L0,3.25 C0,2.00735931 1.06332372,1 2.375,1 L2.375,1 Z M15,11 C15.4487314,11 15.8185688,11.3377852 15.8691132,11.7729565 L15.875,11.875 L15.875,13.625 L17.625,13.625 C18.1082492,13.625 18.5,14.0167508 18.5,14.5 C18.5,14.9487314 18.1622148,15.3185688 17.7270435,15.3691132 L17.625,15.375 L15.875,15.375 L15.875,17.125 C15.875,17.6082492 15.4832492,18 15,18 C14.5512686,18 14.1814312,17.6622148 14.1308868,17.2270435 L14.125,17.125 L14.125,15.375 L12.375,15.375 C11.8917508,15.375 11.5,14.9832492 11.5,14.5 C11.5,14.0512686 11.8377852,13.6814312 12.2729565,13.6308868 L12.375,13.625 L14.125,13.625 L14.125,11.875 C14.125,11.3917508 14.5167508,11 15,11 Z M17,3 L2,3 L2.00088142,7.77594251 C3.16397552,6.58028446 4.06152092,6 4.88962842,6 C5.50631387,6 6.88443503,6.66963101 9.32918035,8.14609891 L17,4.17 L17,3 Z"
                ></path>
              </svg>
            </span>
            <span class="mt-3 text-xs">Scrape</span>
          </button>
          <button class="ml-4" type="button" @click="decreaseQty(bottle?.id!)">
            <span
              class="p-2 w-10 h-10 bg-pink-100 hover:bg-pink-900 text-gray-600 hover:text-white transition-all rounded-md flex items-center justify-center m-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                class="fill-current"
              >
                <path
                  d="M9.56 0c1.22 0 2.22.9 2.22 2v3C13 5 14 5.9 14 7v1c-.8 0-1.54.17-2.22.47V7H9.56V2H8.44v5H6.22v11h4.62c.82.58 1.8.94 2.87 1-.39.6-1.1 1-1.93 1H6.22C5 20 4 19.1 4 18V7c0-1.1 1-2 2.22-2V2c0-1.1 1-2 2.22-2h1.12zm7.06 12.5c.49 0 .88.45.88 1 0 .51-.34.94-.77 1h-5.35c-.49 0-.88-.45-.88-1 0-.51.34-.94.77-1H16.63z"
                ></path>
              </svg>
            </span>
            <span class="mt-3 text-xs">Decrease</span>
          </button>
          <button class="ml-4" type="button" @click="increaseQty(bottle?.id!)">
            <span
              class="p-2 w-10 h-10 bg-pink-100 hover:bg-pink-900 text-gray-600 hover:text-white transition-all rounded-md flex items-center justify-center m-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                class="fill-current"
              >
                <path
                  d="M10 1a1 1 0 0 1 1 1v7h7a1 1 0 0 1 1 .88V10a1 1 0 0 1-1 1h-7v7a1 1 0 0 1-.88 1H10a1 1 0 0 1-1-1v-7H2a1 1 0 0 1-1-.88V10a1 1 0 0 1 1-1h7V2a1 1 0 0 1 .88-1Z"
                ></path>
              </svg>
            </span>
            <span class="mt-3 text-xs">Increase</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <BottleEditor
    v-if="editBottle && isAdmin"
    v-on:updateBottle="updateBottle"
    v-on:cancelEdit="toggleEditBottle"
    :bottle="bottle || {}"
  />

  <div
    v-if="bottle?.description"
    class="min-w-0 p-4 bg-white shadow-lg rounded"
  >
    <p class="text-gray-600 text-sm">
      {{ bottle?.description }}
    </p>
  </div>

  <BottleDetails v-if="bottle" :bottle="bottle" />
  <BottleMoreFromCellar v-if="bottle" :bottle="bottle" />
</template>

<script setup lang="ts">
import { useBottlesStore } from "@/stores/bottles";
import { Bottle } from "~~/types/bottle";

definePageMeta({
  middleware: "auth",
});

const store = useBottlesStore();
const route = useRoute();

const id = ref(0);
const editBottle = ref(false);
const isAdmin = ref(true);

onMounted(() => {
  id.value = parseInt(route.params.id as string);
});

watch(
  () => route.params.id,
  () => {
    id.value = parseInt(route.params.id as string);
  }
);

const bottle = computed(() => {
  return store.allBottles.find((bottle) => bottle.id === id.value);
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
const updateBottle = async (bottle: Bottle) => {
  const { updateBottle } = useBottles();

  await updateBottle(bottle, bottle.id);

  editBottle.value = false;
};
const scrapeBottle = async () => {
  console.log("Scraping!");
  const query = `${bottle.value?.name.replace(" ", "+")}+${
    bottle.value?.vintage
  }`;
  // const res = await $fetch(`http://localhost:3001/api/bottle?data=${query}`);
  // console.log(res);
};
</script>
