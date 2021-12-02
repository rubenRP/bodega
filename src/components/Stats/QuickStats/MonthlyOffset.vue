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
            {{ $t('cellar.monthlyBottles') }}
          </h5>
          <span class="font-semibold text-xl text-blueGray-700">
            <span v-if="monthlyBalance > 0">+</span>{{ monthlyBalance }}
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
              bg-emerald-500
            "
            v-if="monthlyBalance >= 0"
          >
            <font-awesome-icon :icon="['fas', 'thumbs-up']" />
          </div>
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
              bg-red-500
            "
            v-else
          >
            <font-awesome-icon :icon="['fas', 'thumbs-down']" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useStore } from 'vuex'

  export default defineComponent({
    setup() {
      const store = useStore()

      const openedBottles = computed(
        () => store.getters['bottles/getOpenedBottles']
      )
      const addedBottles = computed(
        () => store.getters['bottles/getAddedBottles']
      )

      const monthlyOpenedBottles = computed(() => {
        return openedBottles.value.filter(
          (bottle: any) =>
            new Date(bottle.date_opened).getMonth() === new Date().getMonth() &&
            new Date(bottle.date_opened).getFullYear() ===
              new Date().getFullYear()
        )
      })

      const monthlyAddedBottles = computed(() => {
        return addedBottles.value.filter(
          (bottle: any) =>
            new Date(bottle.date_added).getMonth() === new Date().getMonth() &&
            new Date(bottle.date_added).getFullYear() ===
              new Date().getFullYear()
        )
      })

      const monthlyBalance = computed(() => {
        return (
          monthlyAddedBottles.value.length - monthlyOpenedBottles.value.length
        )
      })

      return {
        monthlyBalance,
      }
    },
  })
</script>
