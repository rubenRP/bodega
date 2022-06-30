<template>
  <h2
    class="mt-6 text-2xl font-semibold text-gray-700 items-center justify-between pb-6 md:pb-2 flex md:hidden"
  >
    <span
      >{{ bottle?.name }}
      <p class="text-sm text-gray-500 hidden md:block">
        {{ bottle?.cellar }}
      </p>
    </span>
    <button
      class="text-pink-900 bg-transparent border border-solid border-pink-900 hover:bg-pink-900 hover:text-white active:bg-pink-700 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="button"
      @click="$router.back()"
    >
      {{ $t('general.back') }}
    </button>
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
        src="../assets/img/bottle-empty.jpg"
        v-else
      />
    </div>
    <div
      class="min-w-0 p-6 bg-white shadow-lg rounded md:col-span-2 flex flex-col justify-between"
    >
      <h2
        class="mb-4 text-2xl font-semibold text-gray-700 items-center justify-between pb-4 border-b-2 flex md:flex"
      >
        <span
          >{{ bottle?.name }}
          <p class="text-sm text-gray-500 hidden md:block">
            {{ bottle?.cellar }}
          </p>
        </span>
        <button
          @click="$router.back()"
          class="hidden md:inline-block text-sm px-4 py-2 leading-none border rounded text-white border-pink-900 bg-pink-900 hover:bg-transparent hover:text-pink-800 ml-4 lg:mt-0 ease-linear transition-all duration-150"
        >
          {{ $t('general.back') }}
        </button>
      </h2>
      <div class="md:hidden">
        <p class="text-gray-500">
          {{ bottle?.cellar }}
        </p>
      </div>
      <div class="my-4">
        <div class="text-md text-gray-500">
          <span v-if="bottle?.apellation">{{ bottle?.apellation }} - </span
          ><span class="font-bold">{{ bottle?.vintage }}</span>
        </div>
        <p class="text-sm text-gray-500 mt-4">
          {{ bottle?.grapes?.join(', ') }}
        </p>
        <div class="text-xs mt-6">
          <WineTag :type="bottle?.type" />
        </div>
      </div>

      <div class="flex justify-between items-center pt-4 border-t-2">
        <div>
          <button
            class="text-pink-900 bg-transparent hover:text-pink-700 active:text-pink-600 font-bold uppercase text-xl mr-6"
            type="button"
            @click="toggleEditBottle()"
            v-if="isAdmin"
          >
            <font-awesome-icon icon="edit" />
          </button>
        </div>

        <div class="h-8 w-24 m-left">
          <QtySelector
            :qty="bottle?.qty"
            v-on:incrementQty="increaseQty(bottle?.id || -1)"
            v-on:decrementQty="decreaseQty(bottle?.id || -1)"
          />
        </div>
      </div>
    </div>
  </div>

  <h2
    class="my-8 mt-12 text-xl font-semibold flex items-center justify-between"
  >
    <div>
      <div
        class="p-2 text-center inline-flex items-center justify-center w-12 h-12 mr-6 shadow-lg rounded-full bg-pink-900 text-white"
      >
        <font-awesome-icon :icon="['fas', 'info']" class="text-xl" />
      </div>
      <span>{{ $t('cellar.details') }}</span>
    </div>
  </h2>

  <div
    v-if="bottle?.description"
    class="min-w-0 p-4 bg-white shadow-lg rounded"
  >
    <p class="text-gray-600 text-sm">
      {{ bottle?.description }}
    </p>
  </div>

  <div class="min-w-0 p-4 mt-6 bg-white shadow-lg rounded">
    <table class="w-full whitespace-no-wrap">
      <tbody class="bg-white divide-y">
        <tr class="text-gray-700 border-b" v-if="bottle?.name">
          <td class="pr-4 py-3">
            <div class="flex items-center text-sm font-semibold">
              {{ $t('cellar.name') }}
            </div>
          </td>
          <td class="px-4 py-3 text-sm">{{ bottle?.name }}</td>
        </tr>
        <tr class="text-gray-700 border-b" v-if="bottle?.cellar">
          <td class="pr-4 py-3">
            <div class="flex items-center text-sm font-semibold">
              {{ $t('cellar.cellar') }}
            </div>
          </td>
          <td class="px-4 py-3 text-sm">{{ bottle?.cellar }}</td>
        </tr>
        <tr class="text-gray-700 border-b" v-if="bottle?.vintage">
          <td class="pr-4 py-3">
            <div class="flex items-center text-sm font-semibold">
              {{ $t('cellar.vintage') }}
            </div>
          </td>
          <td class="px-4 py-3 text-sm">{{ bottle?.vintage }}</td>
        </tr>
        <tr class="text-gray-700 border-b" v-if="bottle?.country">
          <td class="pr-4 py-3">
            <div class="flex items-center text-sm font-semibold">
              {{ $t('cellar.country') }}
            </div>
          </td>
          <td class="px-4 py-3 text-sm">{{ bottle?.country }}</td>
        </tr>
        <tr class="text-gray-700 border-b" v-if="bottle?.region">
          <td class="pr-4 py-3">
            <div class="flex items-center text-sm font-semibold">
              {{ $t('cellar.region') }}
            </div>
          </td>
          <td class="px-4 py-3 text-sm">{{ bottle?.region }}</td>
        </tr>
        <tr class="text-gray-700 border-b" v-if="bottle?.apellation">
          <td class="pr-4 py-3">
            <div class="flex items-center text-sm font-semibold">
              {{ $t('cellar.apellation') }}
            </div>
          </td>
          <td class="px-4 py-3 text-sm">{{ bottle?.apellation }}</td>
        </tr>
        <tr class="text-gray-700 border-b" v-if="bottle?.type">
          <td class="pr-4 py-3">
            <div class="flex items-center text-sm font-semibold">
              {{ $t('cellar.type') }}
            </div>
          </td>
          <td class="px-4 py-3 text-xs"><WineTag :type="bottle.type" /></td>
        </tr>
        <tr class="text-gray-700 border-b" v-if="bottle?.grapes">
          <td class="pr-4 py-3">
            <div class="flex items-center text-sm font-semibold">
              {{ $t('cellar.grapes') }}
            </div>
          </td>
          <td class="px-4 py-3 text-sm">
            {{ bottle?.grapes.join(', ') }}
          </td>
        </tr>

        <tr class="text-gray-700 border-b" v-if="bottle?.alcohol_content">
          <td class="pr-4 py-3">
            <div class="flex items-center text-sm font-semibold">
              {{ $t('cellar.alcoholContent') }}
            </div>
          </td>
          <td class="px-4 py-3 text-sm">{{ bottle?.alcohol_content }}</td>
        </tr>
        <tr class="text-gray-700 border-b" v-if="bottle?.climate_soil">
          <td class="pr-4 py-3">
            <div class="flex items-center text-sm font-semibold">
              {{ $t('cellar.climateSoil') }}
            </div>
          </td>
          <td class="px-4 py-3 text-sm">{{ bottle?.climate_soil }}</td>
        </tr>
        <tr class="text-gray-700 border-b" v-if="bottle?.consumption">
          <td class="pr-4 py-3">
            <div class="flex items-center text-sm font-semibold">
              {{ $t('cellar.consumption') }}
            </div>
          </td>
          <td class="px-4 py-3 text-sm">{{ bottle?.consumption }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2
    class="my-8 mt-12 text-xl font-semibold flex items-center justify-between"
    v-if="cellarBottles.length"
  >
    <div>
      <div
        class="p-2 text-center inline-flex items-center justify-center w-12 h-12 mr-6 shadow-lg rounded-full bg-pink-900 text-white"
      >
        <font-awesome-icon :icon="['fas', 'wine-bottle']" class="text-xl" />
      </div>
      <span>{{ $t('cellar.moreFromCellar') }}</span>
    </div>
  </h2>

  <Spinner v-if="!cellarBottles.length" />

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
          </tr>
        </thead>
        <tbody class="bg-white divide-y">
          <TableItem
            v-for="bottle in cellarBottles"
            :key="bottle.id"
            :item="bottle"
            :actions="false"
          />
        </tbody>
      </table>
    </div>
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
      <span>Reviews</span>
    </div>
  </h2>

  <div
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
  </div>

  <Scraper :bottle="bottle" v-if="isAdmin && bottle" />

  <teleport to="#beforeBodyEnd">
    <BottleForm
      v-if="editBottle"
      @closeModalForm="toggleEditBottle()"
      :bottle="bottle"
    />
  </teleport>
</template>

<script lang="ts">
  import QtySelector from '@/components/Bottle/QtySelector.vue'
  import ReviewForm from '@/components/Bottle/ReviewForm.vue'
  import ReviewList from '@/components/Bottle/ReviewList.vue'
  import Scraper from '@/components/Bottle/Scraper.vue'
  import BottleForm from '@/components/Cellar/BottleForm.vue'
  import TableItem from '@/components/Cellar/TableItem.vue'
  import { Bottle } from '@/models/cellar'
  import { useBottlesStore } from '@/stores/bottles'
  import { useUserStore } from '@/stores/user'
  import { mapActions, mapState } from 'pinia'
  import { defineComponent } from 'vue'
  import WineTag from '../components/Bottle/WineTag.vue'

  export default defineComponent({
    name: 'Bottle',
    components: {
      WineTag,
      Scraper,
      QtySelector,
      ReviewList,
      BottleForm,
      ReviewForm,
      TableItem,
    },
    data: () => ({
      id: 0,
      editBottle: false,
    }),
    async mounted() {
      this.id = parseInt(<any>this.$route.params.id)
    },
    computed: {
      ...mapState(useBottlesStore, ['bottles', 'bottlesFromCellar']),
      ...mapState(useUserStore, ['isAdmin']),
      bottle() {
        return this.bottles.find((bottle: Bottle) => bottle.id === this.id)
      },
      cellarBottles() {
        if (this.bottle) {
          return this.bottlesFromCellar(this.bottle)
        } else {
          return []
        }
      },
    },
    watch: {},
    methods: {
      ...mapActions(useBottlesStore, [
        'increaseBottleQty',
        'decreaseBottleQty',
      ]),
      increaseQty(id: number) {
        this.bottle &&
          this.increaseBottleQty({ bottleId: id, qty: this.bottle.qty! })
      },
      decreaseQty(id: number) {
        this.bottle &&
          this.decreaseBottleQty({ bottleId: id, qty: this.bottle.qty! })
      },
      toggleEditBottle() {
        this.editBottle = !this.editBottle
      },
    },
  })
</script>
