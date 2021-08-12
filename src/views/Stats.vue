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
  <div class="mb-8">
    <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
        {{ $t('stats.cellarStatus') }}
      </h4>
      <LineChart
        :data="bottlesConsumptionData"
        :labels="bottlesConsumptionLabels"
        selector="chart-bottles"
      />
    </div>
  </div>
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
  import TableItemCellar from '@/components/Cellar/TableItem.vue'
  import TableItemReviews from '@/components/Reviews/TableItem.vue'
  import BarChart from '@/components/Stats/BarChart.vue'
  import LineChart from '@/components/Stats/LineChart.vue'
  import QuickStats from '@/components/Stats/QuickStats.vue'
  import { getAddedBottles, getOpenedBottles } from '@/api/bottles'

  export default defineComponent({
    name: 'Home',
    components: {
      TableItemCellar,
      TableItemReviews,
      BarChart,
      LineChart,
      QuickStats,
    },
    data: () => ({
      openedBottles: <any>[],
      addedBottles: <any>[],
    }),
    created() {
      if (this.getCellar.length === 0) {
        this.fetchCellar()
      }
      if (this.getReviews.length === 0) {
        this.fetchReviews()
      }
      this.fetchOpenedBottles()
      this.fetchAddedBottles()
    },
    computed: {
      ...mapGetters({
        getCellar: 'cellar/cellar',
        getReviews: 'reviews/reviews',
        totalApellations: 'cellar/totalApellations',
        totalVintages: 'cellar/totalVintages',
      }),
      // Group opened bottles by month and year
      openedBottlesByMonth(): any {
        return this.openedBottles.reduce(
          (
            acc: { [x: string]: any },
            bottle: { date_opened: string | number | Date }
          ) => {
            const date = new Date(bottle.date_opened)
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            const key = `${month}-${year}`
            acc[key] = (acc[key] || 0) + 1
            return acc
          },
          {}
        )
      },
      addedBottlesByMonth(): any {
        return this.addedBottles.reduce(
          (
            acc: { [x: string]: any },
            bottle: { date_added: string | number | Date }
          ) => {
            const date = new Date(bottle.date_added)
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            const key = `${month}-${year}`
            acc[key] = (acc[key] || 0) + 1
            return acc
          },
          {}
        )
      },
      bottlesConsumptionData(): any {
        return [this.addedBottlesByMonth, this.openedBottlesByMonth]
      },
      bottlesConsumptionLabels(): any {
        return ['Botellas Añadidas', 'Botellas Consumidas']
      },
    },
    watch: {},
    methods: {
      ...mapActions({
        fetchCellar: 'cellar/fetchCellar',
        fetchReviews: 'reviews/fetchReviews',
      }),
      async fetchOpenedBottles() {
        try {
          let { data } = await getOpenedBottles()
          this.openedBottles = data
        } catch (e) {
          console.error(e)
        }
      },
      async fetchAddedBottles() {
        try {
          let { data } = await getAddedBottles()
          this.addedBottles = data
        } catch (e) {
          console.error(e)
        }
      },
    },
  })
</script>
