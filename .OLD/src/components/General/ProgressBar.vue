<template>
  <div class="relative pt-1">
    <div class="flex mb-2 items-center justify-between" v-if="text">
      <div>
        <span
          class="
            text-xs
            font-semibold
            inline-block
            py-1
            px-2
            uppercase
            rounded-full
            text-white
            bg-pink-600
          "
        >
          {{ text }}
        </span>
      </div>
      <div class="text-right">
        <span class="text-xs font-semibold inline-block text-pink-900">
          {{ value }}%
        </span>
      </div>
    </div>
    <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
      <div
        :style="{ width: value + '%' }"
        class="
          shadow-none
          flex flex-col
          text-center
          whitespace-nowrap
          text-white
          justify-center
          bg-pink-900
        "
      ></div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'ProgressBar',
    props: {
      value: {
        type: Number,
        default: 0,
      },
      text: {
        type: String,
      },
    },
  })
</script>
