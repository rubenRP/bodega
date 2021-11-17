<template>
  <div
    class="
      relative
      flex flex-col
      min-w-0
      break-words
      bg-white
      rounded
      shadow-lg
    "
  >
    <div class="flex-auto p-4">
      <div class="flex flex-wrap">
        <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
          <h5 class="text-blueGray-400 uppercase font-bold text-xs">
            {{ $t('cellar.drinkedBottles') }}
          </h5>
          <span class="font-semibold text-xl text-blueGray-700">
            {{ openedBottles }}
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
              bg-blue-500
            "
          >
            <font-awesome-icon :icon="['fas', 'wine-glass-alt']" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { getOpenedBottles } from '@/api/bottles'
  import { defineComponent, onMounted, ref } from 'vue'

  export default defineComponent({
    setup() {
      const openedBottles = ref(0)
      onMounted(async () => {
        const bottles = (await getOpenedBottles()).data || []
        const monthBottles = bottles.filter(
          (bottle: any) =>
            new Date(bottle.date_opened).getMonth() === new Date().getMonth() &&
            new Date(bottle.date_opened).getFullYear() ===
              new Date().getFullYear()
        )
        openedBottles.value = monthBottles.length
      })

      return {
        openedBottles,
      }
    },
  })
</script>
