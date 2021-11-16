<template>
  <h2
    class="
      my-8
      text-xl
      lg:text-3xl
      font-semibold
      flex
      items-center
      justify-between
    "
  >
    <div>
      <div
        class="
          p-2
          text-center
          inline-flex
          items-center
          justify-center
          w-8
          lg:w-16
          h-8
          lg:h-16
          mr-2
          lg:mr-6
          shadow-lg
          rounded-full
          bg-pink-900
          text-white
        "
      >
        <font-awesome-icon
          :icon="['fas', 'wine-bottle']"
          class="text-sm lg:text-xl"
        />
      </div>
      <span>{{ $t('bottles.bottles') }}</span>
    </div>
  </h2>
  <div class="relative w-full max-w-xl focus-within:text-gray-200 m-auto mb-4">
    <div class="absolute inset-y-0 flex items-center pl-2">
      <SearchIcon class="w-4 h-4" />
    </div>
    <input
      class="
        w-full
        pl-8
        pr-2
        py-2
        text-sm text-gray-700
        placeholder-gray-600
        bg-gray-100
        border
        rounded-md
        dark:placeholder-gray-500
        dark:focus:shadow-outline-gray
        dark:focus:placeholder-gray-600
        dark:focus:border-gray-400
        dark:bg-gray-700
        dark:border-gray-700
        dark:text-gray-200
        focus:placeholder-gray-500
        focus:bg-white
        focus:border-pink-900
        focus:outline-none
        focus:shadow-outline-purple
        form-input
      "
      type="text"
      :placeholder="$t('cellar.filterWines')"
      aria-label="Search"
      v-model="search"
    />
  </div>

  <Spinner v-if="!bottles.length" />

  <div class="w-full overflow-hidden shadow-lg rounded" v-else>
    <div class="w-full overflow-x-auto">
      <table class="w-full whitespace-no-wrap">
        <thead>
          <tr
            class="
              text-xs
              font-semibold
              tracking-wide
              text-left text-gray-500
              uppercase
              border-b
              dark:border-gray-700
              bg-gray-50
              dark:text-gray-400 dark:bg-gray-800
              hidden
              md:table-row
            "
          >
            <th class="px-4 py-3">{{ $t('cellar.name') }}</th>
            <th class="px-4 py-3">{{ $t('cellar.vintage') }}</th>
            <th class="px-4 py-3">{{ $t('cellar.apellation') }}</th>
            <th class="px-4 py-3">{{ $t('cellar.type') }}</th>
            <th class="px-4 py-3 text-center">{{ $t('general.qty') }}</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
          <TableItem
            v-for="bottle in filteredBottles"
            :key="bottle.id"
            :item="bottle"
            @editItem="editBottle(bottle)"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import {
    CurrencyEuroIcon,
    HomeIcon,
    CalculatorIcon,
    PencilAltIcon,
    SearchIcon,
  } from '@heroicons/vue/solid'
  import TableItem from '@/components/Cellar/TableItem.vue'
  import Modal from '@/components/General/Modal.vue'
  import BottleForm from '@/components/Cellar/BottleForm.vue'
  import { getBottles } from '@/api/bottles'
  import { Bottle } from '@/models/cellar'
  import Spinner from '@/components/General/Spinner.vue'

  export default defineComponent({
    name: 'Cellar',
    components: {
      PencilAltIcon,
      CurrencyEuroIcon,
      HomeIcon,
      SearchIcon,
      CalculatorIcon,
      TableItem,
      Modal,
      BottleForm,
      Spinner,
    },
    data() {
      return {
        openedNewBottle: false,
        activeBottle: <any>null,
        search: '',
        bottles: <any>[],
      }
    },
    created() {
      this.getBottles()
    },
    computed: {
      filteredBottles(): any[] {
        return this.bottles.filter((bottle: any) => {
          return (
            bottle.name.toLowerCase().includes(this.search.toLowerCase()) ||
            bottle.cellar.toLowerCase().includes(this.search.toLowerCase()) ||
            bottle.apellation.toLowerCase().includes(this.search.toLowerCase())
          )
        })
      },
    },
    methods: {
      async getBottles() {
        this.bottles = await getBottles()
      },
    },
  })
</script>
