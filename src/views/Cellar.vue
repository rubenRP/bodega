<template>
  <h2
    class="my-8 text-xl lg:text-3xl font-semibold flex items-center justify-between"
  >
    <div>
      <div
        class="p-2 text-center inline-flex items-center justify-center w-8 lg:w-16 h-8 lg:h-16 mr-2 lg:mr-6 shadow-lg rounded-full bg-pink-900 text-white"
      >
        <font-awesome-icon
          :icon="['fas', 'border-all']"
          class="text-sm lg:text-xl"
        />
      </div>
      <span>{{ $t('cellar.myCellar') }}</span>
    </div>
    <button
      class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-pink-900 bg-pink-900 hover:bg-transparent hover:text-pink-800 ml-4 lg:mt-0 ease-linear transition-all duration-150"
      @click="toggleNewBottle()"
    >
      {{ $t('general.add') }}
    </button>
  </h2>
  <div class="relative w-full max-w-xl focus-within:text-gray-200 m-auto mb-4">
    <div class="absolute inset-y-0 flex items-center pl-2">
      <font-awesome-icon :icon="['fas', 'search']" class="w-4 h-4" />
    </div>
    <input
      class="w-full pl-8 pr-2 py-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border rounded-md focus:placeholder-gray-500 focus:bg-white focus:border-pink-900 focus:outline-none focus:shadow-outline-purple form-input"
      type="text"
      :placeholder="$t('cellar.filterWines')"
      aria-label="Search"
      v-model="search"
    />
  </div>

  <Spinner v-if="!cellarBottles.length" />

  <div class="w-full overflow-hidden shadow-lg rounded" v-else>
    <div class="w-full overflow-x-auto">
      <table class="w-full whitespace-no-wrap">
        <thead>
          <tr
            class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50 hidden md:table-row"
          >
            <th class="px-4 py-3">{{ $t('cellar.name') }}</th>
            <th class="px-4 py-3">{{ $t('cellar.vintage') }}</th>
            <th class="px-4 py-3">{{ $t('cellar.apellation') }}</th>
            <th class="px-4 py-3">{{ $t('cellar.type') }}</th>
            <th class="px-4 py-3 text-center">{{ $t('general.qty') }}</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y">
          <TableItem
            v-for="bottle in filteredCellar"
            :key="bottle.id"
            :item="bottle"
          />
        </tbody>
      </table>
    </div>
  </div>
  <teleport to="#beforeBodyEnd">
    <BottleForm v-if="openedNewBottle" @closeModalForm="toggleNewBottle()" />
  </teleport>
</template>

<script lang="ts">
  import BottleForm from '@/components/Cellar/BottleForm.vue'
  import TableItem from '@/components/Cellar/TableItem.vue'
  import Modal from '@/components/General/Modal.vue'
  import Spinner from '@/components/General/Spinner.vue'
  import useFilteredBottles from '@/hooks/useFilteredBottles'
  import { computed, defineComponent, ref } from 'vue'
  import { useStore } from 'vuex'

  export default defineComponent({
    components: {
      TableItem,
      Modal,
      BottleForm,
      Spinner,
    },
    setup() {
      const store = useStore()
      const search = ref('')
      const openedNewBottle = ref(false)

      const toggleNewBottle = () => {
        openedNewBottle.value = !openedNewBottle.value
      }

      const cellarBottles = computed(
        () => store.getters['bottles/cellarBottles']
      )

      const filteredCellar = computed(() => {
        return useFilteredBottles(cellarBottles.value, search.value)
      })

      return {
        search,
        openedNewBottle,
        filteredCellar,
        toggleNewBottle,
        cellarBottles,
      }
    },
  })
</script>
