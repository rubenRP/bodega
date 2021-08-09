<template>
  <div class="grid gap-6 mb-8 grid-cols-2 xl:grid-cols-3">
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
        🗺️
      </div>
      <div>
        <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
          {{ $t('cellar.totalApellations') }}
        </p>
        <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {{ Object.keys(totalApellations).length }}
        </p>
      </div>
    </div>
    <div
      class="
        hidden
        md:flex
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
        🌍
      </div>
      <div>
        <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
          {{ $t('cellar.totalCountries') }}
        </p>
        <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {{ Object.keys(totalCountries).length }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapGetters } from 'vuex'

  export default defineComponent({
    name: 'QuickStats',
    components: {},
    props: {},
    data: () => ({}),

    computed: {
      ...mapGetters({
        totalBottles: 'cellar/totalBottles',
        totalApellations: 'cellar/totalApellations',
        totalCountries: 'cellar/totalCountries',
      }),
    },
  })
</script>
