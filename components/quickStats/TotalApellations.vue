<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white rounded shadow-lg"
  >
    <div class="flex-auto p-4">
      <div class="flex flex-wrap">
        <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
          <h5 class="text-slate-400 uppercase font-bold text-xs">
            {{ $t('cellar.totalApellations') }}
          </h5>
          <span class="font-semibold text-xl text-slate-700">
            {{ Object.keys(totalApellations).length }}
          </span>
        </div>
        <div class="relative w-auto pl-4 flex-initial">
          <div
            class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500"
          >
            <font-awesome-icon :icon="['fas', 'map-signs']" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { useBottlesStore } from '@/stores/bottles'
  import { computed, defineComponent } from 'vue'

  export default defineComponent({
    setup() {
      const store = useBottlesStore()
      return {
        totalApellations: computed(() => store.totalCellarApellations),
      }
    },
  })
</script>
