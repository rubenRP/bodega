<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white mt-6"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h3
            class="font-semibold text-lg text-slate-700 flex items-center justify-between"
          >
            <span>Scraper</span>
            <button
              v-if="!loading || finished"
              class="text-pink-900 bg-transparent border border-solid border-pink-900 hover:bg-pink-900 hover:text-white active:bg-pink-700 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
        class="w-full bg-transparent border-collapse mb-6 px-8 py-3 flex flex-col items-start"
      >
        <div class="mx-auto w-full container mt-6" v-if="message">
          <div
            class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-orange-500"
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
              class="min-w-0 y-4 bg-white rounded-lg shadow-xs"
              v-if="newBottleDescription"
            >
              <h4 class="mb-4 font-semibold">
                {{ $t('cellar.description') }}
              </h4>
              <p class="text-gray-600 text-xs">
                {{ newBottleDescription }}
              </p>
            </div>
          </div>

          <Spinner v-if="loading && !finished" class="lg:col-span-6" />
          <div class="lg:col-span-6" v-else>
            <table class="w-full whitespace-no-wrap">
              <tbody class="bg-white divide-y">
                <tr
                  class="text-gray-700 border-b"
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
                      class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
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
                      <option value="consumption">
                        {{ $t('cellar.consumption') }}
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
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple"
                  v-model="updatePhoto"
                />
                <span class="ml-2"> Update photo </span>
              </label>
              <label class="flex items-center ml-4">
                <input
                  type="checkbox"
                  class="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple"
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
              class="text-pink-900 bg-transparent border border-solid border-pink-900 hover:bg-pink-700 hover:text-white active:bg-pink-700 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
              v-if="!finished"
            >
              {{ $t('cellar.nextSuggestion') }}
            </button>
          </div>
          <div class="flex justify-between">
            <button
              @click="updateAndSuggestBottle()"
              class="text-pink-900 bg-transparent border border-solid border-pink-900 hover:bg-pink-700 hover:text-white active:bg-pink-700 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 mr-4"
              v-if="!finished"
            >
              {{ $t('cellar.updateAndNextSuggestion') }}
            </button>

            <button
              @click="updateBottle()"
              class="bg-pink-900 text-white active:pink-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
  import { updateBottleMetadata } from '@/api/bottles'
  import { getBottle, searchForBottle } from '@/api/shopping'
  import Spinner from '@/components/General/Spinner.vue'
  import { defineComponent } from 'vue'

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
          `${this.removeAccents(this.bottle?.name)} ${this.removeAccents(
            this.bottle?.cellar
          )}`
        )
        response.data.shopping_results?.filter((product: any, key: number) => {
          if (
            (product.product_id && sellers.includes(product.source)) ||
            (product.product_id && key < 5)
          ) {
            filteredProducts.push(product)
          }
        })

        if (response.data.error) {
          this.message = response.data.error
        }

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
            const product = this.filteredBottles.shift()
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
            if (refs[key][0].value != 'null') {
              if (refs[key][0].value === 'grapes') {
                const grapes = value.split(',')
                updatedData[refs[key][0].value] = grapes
              } else {
                updatedData[refs[key][0].value] = value
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
      removeAccents(str: String) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      },
    },
  })
</script>
