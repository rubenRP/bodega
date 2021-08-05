<template>
  <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
    Home
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
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { supabase } from '../supabase'

  export default defineComponent({
    name: 'Home',
    data: () => ({
      totalBottles: 0,
      totalCountries: [{}],
      totalApellations: [{}],
    }),
    created() {
      this.getCellarTotal()
    },
    methods: {
      async getCellarTotal() {
        try {
          let { data, error, status } = await supabase
            .from('bottles')
            .select(`qty`)

          if (error && status !== 406) throw error

          if (data) {
            console.log(data)
            this.totalBottles = data.reduce((acc, curr) => acc + curr.qty, 0)
            this.totalCountries = data.reduce((acc, curr) => {
              acc[curr.country] = (acc[curr.country] || 0) + curr.qty
              return acc
            }, {})
            this.totalApellations = data.reduce((acc, curr) => {
              if (curr.apellation)
                acc[curr.apellation] = (acc[curr.apellation] || 0) + curr.qty
              return acc
            }, {})
          }
        } catch (error) {
          alert(error.message)
        }
      },
    },
  })
</script>
