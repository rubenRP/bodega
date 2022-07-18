<template>
  <span
    class="px-2 py-1 font-semibold leading-tight rounded-full"
    :class="getTypeColor"
  >
    {{ $t(getTypeTranslated) }}
  </span>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'WineTag',
    props: {
      type: String,
    },
    computed: {
      getTypeColor(): string {
        switch (this.type) {
          case 'Red':
            return 'text-red-700 bg-red-100 '
          case 'White':
            return 'text-green-700 bg-green-100  '
          case 'Rose':
            return 'text-pink-700 bg-pink-100'
          case 'Sparkling':
            return 'text-yellow-700 bg-yellow-100'
          default:
            return 'text-yellow-700 bg-yellow-100'
        }
      },
      getTypeTranslated(): string {
        switch (this.type) {
          case 'Red':
            return 'cellar.red'
          case 'White':
            return 'cellar.white'
          case 'Rose':
            return 'cellar.rose'
          case 'Sparkling':
            return 'cellar.sparkling'
        }
        return 'cellar.other'
      },
    },
  })
</script>
