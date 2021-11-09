<template>
  <h2
    class="
      mb-4
      mt-6
      text-2xl
      font-semibold
      text-gray-700
      dark:text-gray-200
      items-center
      justify-between
      pb-2
      flex
      md:hidden
    "
  >
    <span
      >{{ bottle.name }}
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ bottle.cellar }}
      </p>
    </span>
    <button
      @click="$router.back()"
      class="
        inline-block
        text-sm
        px-4
        py-2
        leading-none
        border
        rounded
        text-white
        border-pink-900
        bg-pink-900
        hover:bg-transparent hover:text-pink-800
        ml-4
        lg:mt-0
      "
    >
      {{ $t('general.back') }}
    </button>
  </h2>
  <div class="grid gap-6 mb-6 md:my-6 md:grid-cols-3">
    <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      <img
        aria-hidden="true"
        class="w-auto max-h-80 m-auto"
        :src="bottle.image"
        v-if="bottle.image"
      />
      <img
        aria-hidden="true"
        class="w-auto max-h-80 m-auto"
        src="../assets/img/bottle-empty.jpg"
        v-else
      />
    </div>
    <div
      class="
        min-w-0
        p-6
        bg-white
        rounded-lg
        shadow-xs
        dark:bg-gray-800
        md:col-span-2
        flex flex-col
        justify-between
      "
    >
      <h2
        class="
          mb-4
          text-2xl
          font-semibold
          text-gray-700
          dark:text-gray-200
          items-center
          justify-between
          border-b-2
          pb-2
          hidden
          md:flex
        "
      >
        <span
          >{{ bottle.name }}
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ bottle.cellar }}
          </p>
        </span>
        <button
          @click="$router.back()"
          class="
            inline-block
            text-sm
            px-4
            py-2
            leading-none
            border
            rounded
            text-white
            border-pink-900
            bg-pink-900
            hover:bg-transparent hover:text-pink-800
            ml-4
            lg:mt-0
          "
        >
          {{ $t('general.back') }}
        </button>
      </h2>
      <div class="text-md text-gray-500 dark:text-gray-400">
        {{ bottle.vintage }}
      </div>
      <div class="text-md text-gray-500 dark:text-gray-400 border-b-2 pb-4">
        {{ bottle.apellation }}
      </div>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ bottle.grapes?.join(', ') }}
      </p>
      <div class="flex justify-between items-center mt-4">
        <div class="text-xs">
          <WineTag :type="bottle.type" />
        </div>
        <div class="h-8 w-24 m-left">
          <QtySelector
            :qty="bottle.qty"
            v-on:incrementQty="increaseQty(bottle.id)"
            v-on:decrementQty="decreaseQty(bottle.id)"
          />
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="bottle?.description"
    class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
  >
    <h4 class="mb-4 font-semibold dark:text-gray-300">
      {{ $t('cellar.description') }}
    </h4>
    <p class="text-gray-600 dark:text-gray-400 text-sm">
      {{ bottle?.description }}
    </p>
  </div>

  <div class="min-w-0 p-4 mt-6 bg-white rounded-lg shadow-xs dark:bg-gray-800">
    <h4 class="mb-4 font-semibold dark:text-gray-300">
      {{ $t('cellar.details') }}
    </h4>

    <table class="w-full whitespace-no-wrap">
      <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
        <tr
          class="text-gray-700 dark:text-gray-400 border-b"
          v-if="bottle?.name"
        >
          <td class="pr-4 py-3">
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
          <td class="pr-4 py-3">
            <div class="flex items-center text-sm font-semibold">
              {{ $t('cellar.cellar') }}
            </div>
          </td>
          <td class="px-4 py-3 text-sm">{{ bottle?.cellar }}</td>
        </tr>
        <tr
          class="text-gray-700 dark:text-gray-400 border-b"
          v-if="bottle?.vintage"
        >
          <td class="pr-4 py-3">
            <div class="flex items-center text-sm font-semibold">
              {{ $t('cellar.vintage') }}
            </div>
          </td>
          <td class="px-4 py-3 text-sm">{{ bottle?.vintage }}</td>
        </tr>
        <tr
          class="text-gray-700 dark:text-gray-400 border-b"
          v-if="bottle?.country"
        >
          <td class="pr-4 py-3">
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
          <td class="pr-4 py-3">
            <div class="flex items-center text-sm font-semibold">
              {{ $t('cellar.region') }}
            </div>
          </td>
          <td class="px-4 py-3 text-sm">{{ bottle?.region }}</td>
        </tr>
        <tr
          class="text-gray-700 dark:text-gray-400 border-b"
          v-if="bottle?.apellation"
        >
          <td class="pr-4 py-3">
            <div class="flex items-center text-sm font-semibold">
              {{ $t('cellar.apellation') }}
            </div>
          </td>
          <td class="px-4 py-3 text-sm">{{ bottle?.apellation }}</td>
        </tr>
        <tr
          class="text-gray-700 dark:text-gray-400 border-b"
          v-if="bottle?.type"
        >
          <td class="pr-4 py-3">
            <div class="flex items-center text-sm font-semibold">
              {{ $t('cellar.type') }}
            </div>
          </td>
          <td class="px-4 py-3 text-xs"><WineTag :type="bottle.type" /></td>
        </tr>
        <tr
          class="text-gray-700 dark:text-gray-400 border-b"
          v-if="bottle?.grapes"
        >
          <td class="pr-4 py-3">
            <div class="flex items-center text-sm font-semibold">
              {{ $t('cellar.grapes') }}
            </div>
          </td>
          <td class="px-4 py-3 text-sm">
            {{ bottle?.grapes.join(', ') }}
          </td>
        </tr>

        <tr
          class="text-gray-700 dark:text-gray-400 border-b"
          v-if="bottle?.alcohol_content"
        >
          <td class="pr-4 py-3">
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
          <td class="pr-4 py-3">
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
          <td class="pr-4 py-3">
            <div class="flex items-center text-sm font-semibold">
              {{ $t('cellar.comsumption') }}
            </div>
          </td>
          <td class="px-4 py-3 text-sm">{{ bottle?.comsumption }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    class="
      min-w-0
      p-4
      mt-6
      bg-white
      rounded-lg
      shadow-xs
      dark:bg-gray-800
      hidden
    "
  >
    <Scraper :bottle="bottle" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapActions, mapGetters } from 'vuex'
  import { Bottle } from '@/models/cellar'
  import WineTag from '../components/WineTag.vue'
  import Scraper from '@/components/Bottle/Scraper.vue'
  import QtySelector from '@/components/QtySelector.vue'
  import { increaseBottleQty, decreaseBottleQty } from '@/api/bottles'

  export default defineComponent({
    name: 'Bottle',
    components: { WineTag, Scraper, QtySelector },
    data: () => ({
      id: 0,
      bottle: <Bottle>{},
    }),
    async mounted() {
      if (this.id === 0) {
        await this.fetchCellar()
      }
      this.id = parseInt(<any>this.$route.params.id)
      await this.getBottle()
    },
    computed: {
      ...mapGetters({
        getCellar: 'cellar/cellar',
      }),
    },
    watch: {},
    methods: {
      ...mapActions({
        fetchCellar: 'cellar/fetchCellar',
      }),

      async getBottle() {
        this.bottle = await this.getCellar.find(
          (bottle: { id: number }) => bottle.id === this.id
        )
      },
      increaseQty(id: number) {
        increaseBottleQty(id, this.bottle.qty)
      },
      decreaseQty(id: number) {
        decreaseBottleQty(id, this.bottle.qty)
      },
    },
  })
</script>
