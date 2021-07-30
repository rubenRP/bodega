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
    <span>{{ $t('cellar.myCellar') }}</span>
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

  <!-- Cards -->
  <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
    <!-- Card -->
    <div
      class="
        flex
        items-center
        p-4
        bg-white
        rounded-lg
        shadow-xs
        dark:bg-gray-800
      "
    >
      <div
        class="
          p-3
          mr-4
          text-orange-500
          bg-orange-100
          rounded-full
          dark:text-orange-100 dark:bg-orange-500
        "
      >
        🍷
      </div>
      <div>
        <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
          {{ $t('cellar.totalBottles') }}
        </p>
        <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {{ totalBottles }}
        </p>
      </div>
    </div>
  </div>

  <div class="relative w-full max-w-xl focus-within:text-pink-900 m-auto mb-4">
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
        dark:bg-gray-700
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
      <table class="w-full whitespace-no-wrap" v-if="!loading">
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
            <th class="px-4 py-3 text-right">{{ $t('general.actions') }}</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
          <TableItem
            v-for="bottle in filteredCellar"
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
  import { supabase } from '../supabase'

  import TableItem from '../components/Cellar/TableItem.vue'
  import Modal from '../components/Modal.vue'
  import BottleForm from '../components/Cellar/BottleForm.vue'
  import { mapGetters, mapMutations } from 'vuex'

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
        loading: true,
        openedNewBottle: false,
        cellar: [],
        cellarSubscriber: <any>null,
        activeBottle: <any>null,
        totalBottles: 0,
        search: '',
      }
    },
    created() {
      this.getCellarData()
    },
    destroyed() {
      supabase.removeSubscription(this.cellarSubscriber)
      this.resetCellar()
    },
    computed: {
      ...mapGetters({
        getCellar: 'cellar',
      }),
      filteredCellar(): any[] {
        console.log(this.search)
        return this.getCellar.filter((bottle: any) => {
          return (
            bottle.name.toLowerCase().includes(this.search.toLowerCase()) ||
            bottle.cellar.toLowerCase().includes(this.search.toLowerCase()) ||
            bottle.apellation.toLowerCase().includes(this.search.toLowerCase())
          )
        })
      },
    },
    methods: {
      ...mapMutations({
        resetCellar: 'RESET_CELLAR',
        setCellar: 'SET_CELLAR',
        addBottle: 'ADD_BOTTLE',
        modifyBottle: 'MODIFY_BOTTLE',
        deleteBottle: 'DELETE_BOTTLE',
      }),
      async getCellarData() {
        try {
          let { data, error, status } = await supabase
            .from('mycellar')
            .select()
            .gt('qty', 0)
            .order('last_added', { ascending: false })

          if (error && status !== 406) throw error

          if (data) {
            this.totalBottles = data.reduce((acc, curr) => acc + curr.qty, 0)
            this.setCellar(data)
            this.setCellarSubscriber()
          }
        } catch (error) {
          alert(error.message)
        } finally {
          this.loading = false
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
      setCellarSubscriber() {
        this.cellarSubscriber = supabase
          .from('mycellar')
          .on('*', (payload) => {
            console.log('Change received!', payload)
            switch (payload.eventType) {
              case 'INSERT':
                this.addBottle(payload.new)
                break
              case 'UPDATE':
                this.modifyBottle(payload.new)
                return
              case 'DELETE':
                this.deleteBottle(payload.new.id)
                break
            }
          })
          .subscribe()
      },
    },
  })
</script>
