<template>
  <div
    class="
      relative
      flex flex-col
      min-w-0
      break-words
      w-full
      mb-6
      shadow-lg
      rounded
      bg-white
      mt-6
    "
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h3
            class="
              font-semibold
              text-lg text-blueGray-700
              flex
              items-center
              justify-between
            "
          >
            <span>Scraper</span>
            <button
              v-if="!loading || finished"
              class="
                text-pink-900
                bg-transparent
                border border-solid border-pink-900
                hover:bg-pink-900 hover:text-white
                active:bg-pink-700
                font-bold
                uppercase
                text-xs
                px-4
                py-2
                rounded
                outline-none
                focus:outline-none
                mr-1
                mb-1
                ease-linear
                transition-all
                duration-150
              "
              type="button"
              @click="scrapeBottle"
            >
              {{ $t('general.start') }}
            </button>
          </h3>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <div
        class="
          w-full
          bg-transparent
          border-collapse
          mb-6
          px-8
          py-3
          flex flex-col
          items-start
        "
      >
        <div class="mx-auto w-full container mt-6" v-if="message">
          <div
            class="
              text-white
              px-6
              py-4
              border-0
              rounded
              relative
              mb-4
              bg-orange-500
            "
          >
            <span class="text-xl inline-block mr-5 align-middle">
              <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
            </span>
            <span class="inline-block align-middle mr-8">
              {{ message }}
            </span>
          </div>
        </div>
        <div class="grid gap-6 mb-8 md:grid-cols-10 w-full">
          <Spinner v-if="loading && !finished" class="lg:col-span-4" />
          <div v-else class="lg:col-span-4">
            <img
              v-if="newBottleImage"
              aria-hidden="true"
              class="w-auto max-h-60 m-auto"
              :src="newBottleImage"
            />
            <div
              class="min-w-0 y-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
              v-if="newBottleDescription"
            >
              <h4 class="mb-4 font-semibold dark:text-gray-300">
                {{ $t('cellar.description') }}
              </h4>
              <p class="text-gray-600 dark:text-gray-400 text-xs">
                {{ newBottleDescription }}
              </p>
            </div>
          </div>

          <Spinner v-if="loading && !finished" class="lg:col-span-6" />
          <div class="lg:col-span-6" v-else>
            <table class="w-full whitespace-no-wrap">
              <tbody
                class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
              >
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

            <div class="flex mt-6 mb-6 text-sm px-4" v-if="bottleFounded">
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

        <div class="flex justify-between w-full" v-if="bottleFounded">
          <div>
            <button
              @click="suggestBottle()"
              class="
                text-pink-900
                bg-transparent
                border border-solid border-pink-900
                hover:bg-pink-700 hover:text-white
                active:bg-pink-700
                font-bold
                uppercase
                text-xs
                px-4
                py-2
                rounded
                outline-none
                focus:outline-none
                mb-1
                ease-linear
                transition-all
                duration-150
              "
              v-if="!finished"
            >
              {{ $t('cellar.nextSuggestion') }}
            </button>
          </div>
          <div class="flex justify-between">
            <button
              @click="updateAndSuggestBottle()"
              class="
                text-pink-900
                bg-transparent
                border border-solid border-pink-900
                hover:bg-pink-700 hover:text-white
                active:bg-pink-700
                font-bold
                uppercase
                text-xs
                px-4
                py-2
                rounded
                outline-none
                focus:outline-none
                mb-1
                ease-linear
                transition-all
                duration-150
                mr-4
              "
              v-if="!finished"
            >
              {{ $t('cellar.updateAndNextSuggestion') }}
            </button>

            <button
              @click="updateBottle()"
              class="
                bg-pink-900
                text-white
                active:pink-700
                font-bold
                uppercase
                text-xs
                px-4
                py-2
                rounded
                shadow
                hover:shadow-md
                outline-none
                focus:outline-none
                mr-1
                mb-1
                ease-linear
                transition-all
                duration-150
              "
            >
              {{ $t('cellar.updateBottle') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { getBottle, searchForBottle } from '@/api/shopping'
  import { updateBottleMetadata } from '@/api/bottles'
  import Spinner from '@/components/General/Spinner.vue'

  export default defineComponent({
    name: 'Scraper',
    components: {
      Spinner,
    },
    props: {
      bottle: {
        type: Object,
        required: true,
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
      message: '',
    }),

    methods: {
      async scrapeBottle() {
        try {
          this.finished = false
          this.loading = true
          this.filteredBottles = await this.getFilteredBottles()
          await this.suggestBottle()
          this.loading = false
        } catch (error: any) {
          console.log(error)
          this.message = error.message
          this.finished = true
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
        this.finished = false
        this.loading = true

        const response = await searchForBottle(
          `${this.bottle?.cellar} ${this.bottle?.name}`
        )
        response.data.shopping_results.filter((product: any, key: number) => {
          if (
            (product.product_id && sellers.includes(product.source)) ||
            key === 0
          ) {
            filteredProducts.push(product)
          }
        })

        this.loading = false

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
        try {
          this.loading = true
          while (this.filteredBottles.length > 0) {
            const product = this.filteredBottles.pop()
            const bottle = await getBottle(product.product_id)
            //const bottle = this.bottles.pop()
            if (bottle?.data.specs_results?.detalles) {
              this.newBottleSpecs = bottle.data.specs_results.detalles
              this.newBottleImage = bottle.data.product_results.media[0].link
              this.newBottleDescription =
                bottle.data.product_results.description
              this.bottleFounded = true
              break
            }
          }
          if (this.filteredBottles.length === 0) {
            this.finished = true
          }
          this.loading = false
        } catch (error: any) {
          console.log(error)
          this.message = error.message
          this.finished = true
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
                const grapes = value.split(',')
                updatedData[refs[key].value] = grapes
              } else {
                updatedData[refs[key].value] = value
              }
            }
          }
          if (Object.keys(updatedData).length > 0) {
            await updateBottleMetadata(this.bottle?.id, updatedData)
          }
          if (finishProcess) {
            this.finished = true
            this.message = this.$t('cellar.bottleUpdated')
          }
        } catch (error) {
          console.log(error)
        }
      },
    },
  })
</script>
