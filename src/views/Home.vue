<template>
  <div class="mt-6">
    <QuickStats />
  </div>
  <h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
    {{ $t('cellar.latestBottles') }}
  </h4>
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
          </tr>
        </thead>
        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
          <TableItemCellar
            v-for="bottle in getCellar.slice(0, 5)"
            :key="bottle.id"
            :item="bottle"
            :actions="false"
          />
        </tbody>
      </table>
    </div>
  </div>
  <h4 class="my-6 mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
    {{ $t('reviews.latestReviews') }}
  </h4>
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
          </tr>
        </thead>
        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
          <TableItemReviews
            v-for="review in getReviews.slice(0, 5)"
            :key="review.id"
            :item="review"
            :actions="false"
          />
        </tbody>
      </table>
    </div>
  </div>
  <h4 class="mt-8 text-lg font-semibold text-gray-600 dark:text-gray-300">
    {{ $t('general.stats') }}
  </h4>
  <div class="grid gap-6 mb-8 md:grid-cols-2 mt-8">
    <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
        {{ $t('cellar.apellations') }}
      </h4>
      <BarChart :data="totalApellations" selector="chart-dop" />
    </div>
    <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
        {{ $t('cellar.vintages') }}
      </h4>
      <BarChart :data="totalVintages" selector="chart-vintages" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapActions, mapGetters } from 'vuex'
  import QuickStats from '@/components/Stats/QuickStats.vue'
  import TableItemCellar from '@/components/Cellar/TableItem.vue'
  import TableItemReviews from '@/components/Reviews/TableItem.vue'
  import BarChart from '@/components/Stats/BarChart.vue'

  export default defineComponent({
    name: 'Home',
    components: { TableItemCellar, TableItemReviews, BarChart, QuickStats },
    data: () => ({}),
    created() {
      if (this.getCellar.length === 0) {
        this.fetchCellar()
      }
      if (this.getReviews.length === 0) {
        this.fetchReviews()
      }
    },
    computed: {
      ...mapGetters({
        getCellar: 'cellar/cellar',
        getReviews: 'reviews/reviews',
        totalApellations: 'cellar/totalApellations',
        totalVintages: 'cellar/totalVintages',
      }),
    },
    watch: {},
    methods: {
      ...mapActions({
        fetchCellar: 'cellar/fetchCellar',
        fetchReviews: 'reviews/fetchReviews',
      }),
    },
  })
</script>
