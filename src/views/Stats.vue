<template>
  <h2
    class="my-8 text-xl lg:text-3xl font-semibold flex items-center justify-between"
  >
    <div>
      <div
        class="p-2 text-center inline-flex items-center justify-center w-8 lg:w-16 h-8 lg:h-16 mr-2 lg:mr-6 shadow-lg rounded-full bg-pink-900 text-white"
      >
        <font-awesome-icon
          :icon="['fas', 'chart-line']"
          class="text-sm lg:text-xl"
        />
      </div>
      <span>{{ $t('stats.stats') }}</span>
    </div>
  </h2>
  <div class="grid gap-6 mb-8 grid-cols-1 xl:grid-cols-3">
    <CellarBottles />
    <TotalApellations />
    <TotalCountries />
  </div>
  <div class="grid gap-6 mb-8 md:grid-cols-6">
    <div class="min-w-0 p-4 bg-white shadow-lg rounded md:col-span-4">
      <h4 class="mb-4 font-semibold text-gray-800">
        {{ $t('stats.cellarStatus') }}
      </h4>
      <LineChart
        :data="bottlesConsumptionData"
        :labels="bottlesConsumptionLabels"
        selector="chart-bottles"
      />
    </div>
    <div class="min-w-0 p-4 bg-white shadow-lg rounded md:col-span-2">
      <h4 class="mb-4 font-semibold text-gray-800">
        {{ $t('cellar.types') }}
      </h4>
      <PieChart :data="totalTypes" selector="chart-types" />
    </div>
  </div>
  <div class="grid gap-6 mb-8 md:grid-cols-2">
    <div class="min-w-0 p-4 bg-white shadow-lg rounded">
      <h4 class="mb-4 font-semibold text-gray-800">
        {{ $t('cellar.apellations') }}
      </h4>
      <BarChart :data="totalApellations" selector="chart-dop" />
    </div>
    <div class="min-w-0 p-4 bg-white shadow-lg rounded">
      <h4 class="mb-4 font-semibold text-gray-800">
        {{ $t('cellar.vintages') }}
      </h4>
      <BarChart :data="totalVintages" selector="chart-vintages" />
    </div>
  </div>
</template>

<script lang="ts">
  import { getAddedBottles, getOpenedBottles } from '@/api/bottles'
  import TableItemCellar from '@/components/Cellar/TableItem.vue'
  import TableItemReviews from '@/components/Reviews/TableItem.vue'
  import BarChart from '@/components/Stats/BarChart.vue'
  import LineChart from '@/components/Stats/LineChart.vue'
  import PieChart from '@/components/Stats/PieChart.vue'
  import CellarBottles from '@/components/Stats/QuickStats/CellarBottles.vue'
  import TotalApellations from '@/components/Stats/QuickStats/TotalApellations.vue'
  import TotalCountries from '@/components/Stats/QuickStats/TotalCountries.vue'
  import { useBottlesStore } from '@/stores/bottles'
  import { useReviewsStore } from '@/stores/reviews'
  import { mapState } from 'pinia'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Home',
    components: {
      TableItemCellar,
      TableItemReviews,
      BarChart,
      LineChart,
      CellarBottles,
      TotalApellations,
      TotalCountries,
      PieChart,
    },
    data: () => ({
      openedBottles: <any>[],
      addedBottles: <any>[],
    }),
    created() {
      this.fetchOpenedBottles()
      this.fetchAddedBottles()
    },
    computed: {
      ...mapState(useBottlesStore, {
        totalApellations: 'totalCellarApellations',
        totalVintages: 'totalCellarVintages',
        totalTypes: 'cellarTypes',
      }),
      ...mapState(useReviewsStore, {
        getReviews: 'reviews',
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
