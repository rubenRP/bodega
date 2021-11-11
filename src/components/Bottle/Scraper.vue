<template>
  <div class="grid gap-6 mb-8 md:grid-cols-2" v-if="scraping">
    <div v-if="!loading">
      <img
        v-if="newBottleImage"
        aria-hidden="true"
        class="w-auto max-h-60 m-auto"
        :src="newBottleImage"
      />
      <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
        <h4 class="mb-4 font-semibold dark:text-gray-300">
          {{ $t('cellar.description') }}
        </h4>
        <p class="text-gray-600 dark:text-gray-400">
          {{ newBottleDescription }}
        </p>
      </div>
    </div>
    <div v-if="!loading">
      <table class="w-full whitespace-no-wrap">
        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
          <tr
            class="text-gray-700 dark:text-gray-400 border-b"
            v-for="(value, key) in newBottleSpecs"
            :key="key"
          >
            <td class="px-4 py-3">
              <div class="flex items-center text-sm font-semibold">
                {{ key }}
              </div>
            </td>
            <td class="px-4 py-3 text-sm">{{ value }}</td>
            <td class="px-4 py-3 text-sm">
              <select
                class="
                  block
                  w-full
                  mt-1
                  text-sm
                  dark:border-gray-600 dark:bg-gray-700
                  focus:border-red-800
                  focus:outline-none
                  focus:shadow-outline-purple
                  dark:text-gray-300 dark:focus:shadow-outline-gray
                  border-gray-200 border
                  rounded-md
                  px-3
                  py-2
                "
                :ref="key"
              >
                <option value="null">
                  {{ $t('cellar.noImport') }}
                </option>
                <option value="alcohol_content">
                  {{ $t('cellar.alcoholContent') }}
                </option>
                <option value="climate_soil">
                  {{ $t('cellar.climateSoil') }}
                </option>
                <option value="aging">
                  {{ $t('cellar.aging') }}
                </option>
                <option value="comsumption">
                  {{ $t('cellar.comsumption') }}
                </option>
                <option value="stay_barrel">
                  {{ $t('cellar.stayBarrel') }}
                </option>
                <option value="grapes">
                  {{ $t('cellar.grapes') }}
                </option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex mt-6 mb-6 text-sm px-4">
        <label class="flex items-center dark:text-gray-400">
          <input
            type="checkbox"
            class="
              text-purple-600
              form-checkbox
              focus:border-purple-400
              focus:outline-none
              focus:shadow-outline-purple
              dark:focus:shadow-outline-gray
            "
            v-model="updatePhoto"
          />
          <span class="ml-2"> Update photo </span>
        </label>
        <label class="flex items-center dark:text-gray-400 ml-4">
          <input
            type="checkbox"
            class="
              text-purple-600
              form-checkbox
              focus:border-purple-400
              focus:outline-none
              focus:shadow-outline-purple
              dark:focus:shadow-outline-gray
            "
            v-model="updateDescription"
          />
          <span class="ml-2"> Update description </span>
        </label>
      </div>
    </div>
  </div>

  <div v-if="bottleFounded">
    <button
      @click="updateBottle()"
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
      {{ $t('cellar.updateBottle') }}
    </button>
    <button
      @click="suggestBottle()"
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
      {{ $t('cellar.nextSuggestion') }}
    </button>
    <button
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
      {{ $t('cellar.updateAndNextSuggestion') }}
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { getBottle, searchForBottle } from '@/api/shopping'
  import { updateBottleMetadata } from '@/api/bottles'

  export default defineComponent({
    name: 'Scraper',
    props: {
      bottle: {
        type: Object,
        required: true,
      },
      scraping: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    data: () => ({
      filteredBottles: <any>[],
      bottleFounded: false,
      newBottleSpecs: {},
      newBottleImage: '',
      newBottleDescription: '',
      updatePhoto: false,
      updateDescription: false,
      loading: false,
      finished: false,
    }),

    methods: {
      async scrapeBottle() {
        try {
          this.filteredBottles = await this.getFilteredBottles()
          await this.suggestBottle()
        } catch (error) {
          console.log(error)
        }
      },
      async getFilteredBottles() {
        const sellers = [
          'El Corte Inglés',
          'Lavinia',
          'Lavinia.com',
          'Carrefour Bodega',
          'Carrefour Supermercado',
          'Enterwine',
          'EnCopaDeBalón',
        ]
        const filteredProducts: any[] = []

        const response = await searchForBottle(
          `${this.bottle?.cellar} ${this.bottle?.name} ${this.bottle?.vintage}`
        )
        response.data.shopping_results.filter((product: any, key: number) => {
          if (
            (product.product_id && sellers.includes(product.source)) ||
            key === 0
          ) {
            filteredProducts.push(product)
          }
        })

        return filteredProducts
      },

      async updateAndSuggestBottle() {
        try {
          await this.updateBottle(false)
          await this.suggestBottle()
        } catch (error) {
          console.log(error)
        }
      },

      async suggestBottle() {
        while (this.filteredBottles.length > 0) {
          const product = this.filteredBottles.pop()
          const bottle = await getBottle(product.product_id)
          //const bottle = this.bottles.pop()
          if (bottle?.data.specs_results?.detalles) {
            this.newBottleSpecs = bottle.data.specs_results.detalles
            this.newBottleImage = bottle.data.product_results.media[0].link
            this.newBottleDescription = bottle.data.product_results.description
            this.bottleFounded = true
            break
          }
        }
      },
      async updateBottle(finishProcess: boolean = true) {
        try {
          const updatedData = <any>{}
          const refs = <any>this.$refs
          if (this.updateDescription) {
            updatedData.description = this.newBottleDescription
          }
          if (this.updatePhoto) {
            updatedData.image = this.newBottleImage
          }
          for (var [key, value] of Object.entries(this.newBottleSpecs)) {
            if (refs[key].value != 'null') {
              if (refs[key].value === 'grapes') {
                const grapes = refs[key].value.split(',')
                updatedData[refs[key].value] = grapes
              } else {
                updatedData[refs[key].value] = value
              }
            }
          }
          if (Object.keys(updatedData).length > 0) {
            await updateBottleMetadata(this.bottle?.id, updatedData)
          }
        } catch (error) {
          console.log(error)
        }
      },
    },
    watch: {
      scraping() {
        if (this.scraping === true) {
          this.scrapeBottle()
        }
      },
    },
  })
</script>
