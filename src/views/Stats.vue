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
    {{ $t('stats.stats') }}
  </h2>
  <QuickStats />
  <div class="grid gap-6 mb-8 md:grid-cols-2">
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
  import TableItemCellar from '../components/Cellar/TableItem.vue'
  import TableItemReviews from '../components/Reviews/TableItem.vue'
  import BarChart from '../components/Stats/BarChart.vue'
  import LineChart from '../components/Stats/LineChart.vue'
  import QuickStats from '../components/Stats/QuickStats.vue'

  export default defineComponent({
    name: 'Home',
    components: {
      TableItemCellar,
      TableItemReviews,
      BarChart,
      LineChart,
      QuickStats,
    },
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
