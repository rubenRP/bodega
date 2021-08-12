<template>
  <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
    {{ this.product?.name }}
  </h2>
  <div class="grid gap-6 mb-8 md:grid-cols-2">
    <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      <h4 class="mb-4 font-semibold text-gray-600 dark:text-gray-300">
        {{ this.product?.cellar }}
      </h4>
      <p class="text-gray-600 dark:text-gray-400">
        {{ this.product?.vintage }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapActions, mapGetters } from 'vuex'
  import TableItem from '@/components/Cellar/TableItem.vue'

  export default defineComponent({
    name: 'Bottle',
    components: { TableItem },
    data: () => ({
      id: 0,
    }),
    mounted() {
      if (this.id === 0) {
        this.fetchCellar()
      }
      this.id = parseInt(<any>this.$route.params.id)
    },
    computed: {
      ...mapGetters({
        getCellar: 'cellar/cellar',
      }),
      product(): any {
        return this.getCellar.find(
          (bottle: { id: number }) => bottle.id === this.id
        )
      },
    },
    watch: {},
    methods: {
      ...mapActions({
        fetchCellar: 'cellar/fetchCellar',
      }),
    },
  })
</script>
