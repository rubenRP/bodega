<template>
  <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
    Home
  </h2>
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
          <TableItem
            v-for="bottle in getCellar.slice(0, 5)"
            :key="bottle.id"
            :item="bottle"
            :actions="false"
            :quickQty="false"
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
      <PieChart :data="totalApellations" selector="chart-dop" />
    </div>
    <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
        {{ $t('cellar.countries') }}
      </h4>
      <PieChart :data="totalCountries" selector="chart-paises" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapActions, mapGetters } from 'vuex'
  import TableItem from '../components/Cellar/TableItem.vue'

  import PieChart from '../components/PieChart.vue'

  export default defineComponent({
    name: 'Home',
    components: { TableItem, PieChart },
    data: () => ({}),
    created() {
      if (this.getCellar.length === 0) {
        this.fetchCellar()
      }
    },
    computed: {
      ...mapGetters({
        getCellar: 'cellar/cellar',
      }),
      totalCountries(): any {
        return this.getCellar.reduce(
          (
            acc: { [x: string]: any },
            curr: { country: string | number; qty: any }
          ) => {
            acc[curr.country] = (acc[curr.country] || 0) + curr.qty
            return acc
          },
          {}
        )
      },
      totalApellations(): any {
        return this.getCellar.reduce(
          (
            acc: { [x: string]: any },
            curr: { apellation: string | number; qty: any }
          ) => {
            if (curr.apellation)
              acc[curr.apellation] = (acc[curr.apellation] || 0) + curr.qty
            return acc
          },
          {}
        )
      },
    },
    methods: {
      ...mapActions({
        fetchCellar: 'cellar/fetchCellar',
      }),
    },
  })
</script>
