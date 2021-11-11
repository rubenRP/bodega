<template>
  <div class="grid gap-6 mb-8 grid-cols-2 xl:grid-cols-3">
    <!-- Card -->
    <div
      class="
        relative
        flex flex-col
        min-w-0
        break-words
        bg-white
        rounded
        mb-6
        xl:mb-0
        shadow-lg
      "
    >
      <div class="flex-auto p-4">
        <div class="flex flex-wrap">
          <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
            <h5 class="text-blueGray-400 uppercase font-bold text-xs">
              {{ $t('cellar.totalBottles') }}
            </h5>
            <span class="font-semibold text-xl text-blueGray-700">
              {{ totalBottles }}
            </span>
          </div>
          <div class="relative w-auto pl-4 flex-initial">
            <div
              class="
                text-white
                p-3
                text-center
                inline-flex
                items-center
                justify-center
                w-12
                h-12
                shadow-lg
                rounded-full
                bg-red-500
              "
            >
              <font-awesome-icon :icon="['fas', 'wine-bottle']" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="
        relative
        flex flex-col
        min-w-0
        break-words
        bg-white
        rounded
        mb-6
        xl:mb-0
        shadow-lg
      "
    >
      <div class="flex-auto p-4">
        <div class="flex flex-wrap">
          <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
            <h5 class="text-blueGray-400 uppercase font-bold text-xs">
              {{ $t('cellar.totalApellations') }}
            </h5>
            <span class="font-semibold text-xl text-blueGray-700">
              {{ Object.keys(totalApellations).length }}
            </span>
          </div>
          <div class="relative w-auto pl-4 flex-initial">
            <div
              class="
                text-white
                p-3
                text-center
                inline-flex
                items-center
                justify-center
                w-12
                h-12
                shadow-lg
                rounded-full
                bg-orange-500
              "
            >
              <font-awesome-icon :icon="['fas', 'map-signs']" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="
        relative
        flex flex-col
        min-w-0
        break-words
        bg-white
        rounded
        mb-6
        xl:mb-0
        shadow-lg
      "
    >
      <div class="flex-auto p-4">
        <div class="flex flex-wrap">
          <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
            <h5 class="text-blueGray-400 uppercase font-bold text-xs">
              {{ $t('cellar.totalCountries') }}
            </h5>
            <span class="font-semibold text-xl text-blueGray-700">
              {{ Object.keys(totalCountries).length }}
            </span>
          </div>
          <div class="relative w-auto pl-4 flex-initial">
            <div
              class="
                text-white
                p-3
                text-center
                inline-flex
                items-center
                justify-center
                w-12
                h-12
                shadow-lg
                rounded-full
                bg-green-500
              "
            >
              <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
            </div>
          </div>
        </div>
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
