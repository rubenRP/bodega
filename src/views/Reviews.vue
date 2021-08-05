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
    <span>Reviews</span>
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
        hidden
      "
      @click="toggleNewBottle()"
    >
      {{ $t('general.add') }}
    </button>
  </h2>

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
            <th class="px-4 py-3 text-center">{{ $t('reviews.rating') }}</th>
            <th class="px-4 py-3 text-right"></th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
          <TableItem
            v-for="bottle in getReviews"
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

  import TableItem from '../components/Reviews/TableItem.vue'
  import Modal from '../components/Modal.vue'
  import BottleForm from '../components/Cellar/BottleForm.vue'
  import { mapActions, mapGetters } from 'vuex'

  export default defineComponent({
    name: 'Reviews',
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
      }
    },
    created() {
      this.fetchCellar()
      this.fetchReviews()
    },
    destroyed() {
      this.destroyCellar()
    },
    computed: {
      ...mapGetters({
        getCellar: 'cellar/cellar',
        getReviews: 'reviews/reviews',
      }),
    },
    methods: {
      ...mapActions({
        fetchCellar: 'cellar/fetchCellar',
        unsuscribeCellar: 'cellar/unsuscribeCellar',
        destroyCellar: 'cellar/destroyCellar',
        fetchReviews: 'reviews/fetchReviews',
      }),

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
