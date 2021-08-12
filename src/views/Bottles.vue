<template>
  <h2
    class="
      my-6
      text-2xl
      font-semibold
      text-gray-700
      dark:text-gray-200
      flex
      items-center
      justify-between
    "
  >
    <span>{{ $t('bottles.bottles') }}</span>
    <button
      class="
        inline-block
        text-sm
        px-4
        py-2
        leading-none
        border
        rounded
        text-white
        border-pink-900
        bg-pink-900
        hover:bg-transparent hover:text-pink-800
        ml-4
        lg:mt-0
      "
      @click="toggleNewBottle()"
    >
      {{ $t('general.add') }}
    </button>
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

  <div class="w-full overflow-hidden rounded-lg shadow-xs">
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
            <th class="px-4 py-3 text-right"></th>
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
  <BottleForm
    v-if="openedNewBottle"
    @closeModalForm="toggleNewBottle()"
    :bottle="activeBottle"
  />
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
  import Modal from '@/components/Modal.vue'
  import BottleForm from '@/components/Cellar/BottleForm.vue'
  import { getBottles } from '@/api/bottles'

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
        try {
          let { data, error, status } = await getBottles()

          if (error && status !== 406) throw error
          if (data) {
            this.bottles = data
          }
        } catch (error) {
          console.log(error)
        }
      },
      toggleNewBottle() {
        if (this.openedNewBottle) {
          this.activeBottle = null
        }
        this.openedNewBottle = !this.openedNewBottle
      },
      editBottle(bottle: {}) {
        this.activeBottle = bottle
        this.toggleNewBottle()
      },
    },
  })
</script>
