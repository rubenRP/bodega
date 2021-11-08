<template>
  <Modal v-on:closeModal="$emit('closeModalForm')">
    <template v-slot:header>{{ bottle?.name }}</template>
    <template v-slot:body>
      <img
        aria-hidden="true"
        class="w-auto max-h-100 m-auto"
        :src="bottle?.image"
      />
      <table class="w-full whitespace-no-wrap">
        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
          <tr
            class="text-gray-700 dark:text-gray-400 border-b"
            v-if="bottle?.name"
          >
            <td class="px-4 py-3">
              <div class="flex items-center text-sm font-semibold">
                {{ $t('cellar.name') }}
              </div>
            </td>
            <td class="px-4 py-3 text-sm">{{ bottle?.name }}</td>
          </tr>
          <tr
            class="text-gray-700 dark:text-gray-400 border-b"
            v-if="bottle?.cellar"
          >
            <td class="px-4 py-3">
              <div class="flex items-center text-sm font-semibold">
                {{ $t('cellar.cellar') }}
              </div>
            </td>
            <td class="px-4 py-3 text-sm">{{ bottle?.cellar }}</td>
          </tr>
          <tr
            class="text-gray-700 dark:text-gray-400 border-b"
            v-if="bottle?.country"
          >
            <td class="px-4 py-3">
              <div class="flex items-center text-sm font-semibold">
                {{ $t('cellar.country') }}
              </div>
            </td>
            <td class="px-4 py-3 text-sm">{{ bottle?.country }}</td>
          </tr>
          <tr
            class="text-gray-700 dark:text-gray-400 border-b"
            v-if="bottle?.region"
          >
            <td class="px-4 py-3">
              <div class="flex items-center text-sm font-semibold">
                {{ $t('cellar.region') }}
              </div>
            </td>
            <td class="px-4 py-3 text-sm">{{ bottle?.region }}</td>
          </tr>
          <tr
            class="text-gray-700 dark:text-gray-400 border-b"
            v-if="bottle?.type"
          >
            <td class="px-4 py-3">
              <div class="flex items-center text-sm font-semibold">
                {{ $t('cellar.type') }}
              </div>
            </td>
            <td class="px-4 py-3 text-sm">{{ bottle?.type }}</td>
          </tr>
          <tr
            class="text-gray-700 dark:text-gray-400 border-b"
            v-if="bottle?.vintage"
          >
            <td class="px-4 py-3">
              <div class="flex items-center text-sm font-semibold">
                {{ $t('cellar.vintage') }}
              </div>
            </td>
            <td class="px-4 py-3 text-sm">{{ bottle?.vintage }}</td>
          </tr>
          <tr
            class="text-gray-700 dark:text-gray-400 border-b"
            v-if="bottle?.alcohol_content"
          >
            <td class="px-4 py-3">
              <div class="flex items-center text-sm font-semibold">
                {{ $t('cellar.alcoholContent') }}
              </div>
            </td>
            <td class="px-4 py-3 text-sm">{{ bottle?.alcohol_content }}</td>
          </tr>
          <tr
            class="text-gray-700 dark:text-gray-400 border-b"
            v-if="bottle?.climate_soil"
          >
            <td class="px-4 py-3">
              <div class="flex items-center text-sm font-semibold">
                {{ $t('cellar.climateSoil') }}
              </div>
            </td>
            <td class="px-4 py-3 text-sm">{{ bottle?.climate_soil }}</td>
          </tr>
          <tr
            class="text-gray-700 dark:text-gray-400 border-b"
            v-if="bottle?.comsumption"
          >
            <td class="px-4 py-3">
              <div class="flex items-center text-sm font-semibold">
                {{ $t('cellar.comsumption') }}
              </div>
            </td>
            <td class="px-4 py-3 text-sm">{{ bottle?.comsumption }}</td>
          </tr>
        </tbody>
      </table>

      <label class="block mt-4 mb-4 text-sm px-4">
        <div class="flex align-middle justify-between items-center">
          <div class="w-auto text-pink-900">
            <button @click="scrapeBottle()" v-if="!bottle?.date_scrapped">
              {{ $t('cellar.scrapeBottle') }}
            </button>
          </div>
        </div>
      </label>
    </template>
    <template v-slot:footer
      ><button
        @click="$emit('closeModalForm')"
        class="
          w-full
          px-5
          py-3
          text-sm
          font-medium
          leading-5
          text-gray-700
          transition-colors
          duration-150
          border border-gray-300
          rounded-lg
          dark:text-gray-400
          sm:px-4 sm:py-2 sm:w-auto
          active:bg-transparent
          hover:border-gray-500
          focus:border-gray-500
          active:text-gray-500
          focus:outline-none focus:shadow-outline-gray
        "
      >
        {{ $t('general.close') }}
      </button>
    </template>
  </Modal>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Modal from '../Modal.vue'
  import { searchForBottle, getBottle } from '@/api/shopping'
  export default defineComponent({
    name: 'BottleView',
    components: { Modal },
    props: {
      bottle: Object,
    },
    methods: {
      async scrapeBottle() {
        const sellers = [
          'El Corte Inglés',
          'Lavinia',
          'Lavinia.com',
          'Carrefour Bodega',
        ]
        const filteredProducts: any[] = []
        try {
          const response = await searchForBottle(
            `${this.bottle?.cellar} ${this.bottle?.name} ${this.bottle?.vintage}`
          )
          console.log(response.data)

          response.data.shopping_results.filter((product: any) => {
            if (product.product_id && sellers.includes(product.seller)) {
              filteredProducts.push(product)
            }
          })
          console.log(filteredProducts)

          if (filteredProducts.length > 0) {
            const product = filteredProducts[0]
            const bottle = await getBottle(product.product_id)
            console.log(bottle)
          }
        } catch (error) {
          console.log(error)
        }
      },
    },
  })
</script>
