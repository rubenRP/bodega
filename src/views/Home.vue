<template>
  <div class="mt-12">
    <div class="grid gap-6 mb-8 grid-cols-2 xl:grid-cols-4">
      <CellarBottles />
      <TotalBottles />
      <TotalReviews />
      <MonthlyOffset />
    </div>
  </div>
  <h2
    class="my-8 mt-12 text-xl font-semibold flex items-center justify-between"
  >
    <div>
      <div
        class="
          p-2
          text-center
          inline-flex
          items-center
          justify-center
          w-12
          h-12
          mr-6
          shadow-lg
          rounded-full
          bg-pink-900
          text-white
        "
      >
        <font-awesome-icon :icon="['fas', 'wine-bottle']" class="text-xl" />
      </div>
      <span>{{ $t('cellar.latestBottles') }}</span>
    </div>
  </h2>

  <Spinner v-if="!getCellarBottles.length" />

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
          <TableItemCellar
            v-for="bottle in getCellarBottles"
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
        class="
          p-2
          text-center
          inline-flex
          items-center
          justify-center
          w-12
          h-12
          mr-6
          shadow-lg
          rounded-full
          bg-pink-900
          text-white
        "
      >
        <font-awesome-icon :icon="['fas', 'star']" class="text-xl" />
      </div>
      <span> {{ $t('reviews.latestReviews') }}</span>
    </div>
  </h2>

  <Spinner v-if="!getReviews.length" />

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
            <th class="px-4 py-3 text-center">{{ $t('reviews.rating') }}</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
          <TableItemReviews
            v-for="review in getReviews"
            :key="review.id"
            :item="review"
            :actions="false"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapGetters } from 'vuex'
  import TableItemCellar from '@/components/Cellar/TableItem.vue'
  import TableItemReviews from '@/components/Reviews/TableItem.vue'
  import Spinner from '@/components/General/Spinner.vue'
  import TotalBottles from '@/components/Stats/QuickStats/TotalBottles.vue'
  import TotalApellations from '@/components/Stats/QuickStats/TotalApellations.vue'
  import TotalReviews from '@/components/Stats/QuickStats/TotalReviews.vue'
  import MonthlyOffset from '@/components/Stats/QuickStats/MonthlyOffset.vue'
  import CellarBottles from '@/components/Stats/QuickStats/CellarBottles.vue'

  export default defineComponent({
    name: 'Home',
    components: {
      TableItemCellar,
      TableItemReviews,
      Spinner,
      TotalBottles,
      TotalApellations,
      TotalReviews,
      MonthlyOffset,
      CellarBottles,
    },
    data: () => ({}),

    computed: {
      ...mapGetters({
        getCellarBottles: 'bottles/latestCellarBottles',
        getReviews: 'reviews/latestReviews',
      }),
    },
    watch: {},
  })
</script>
