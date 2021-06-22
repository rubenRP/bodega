<template>
  <div class="flex flex-row h-8 w-full rounded-lg relative bg-transparent mt-1">
    <button
      class="
        bg-gray-300
        text-gray-600
        hover:text-gray-700 hover:bg-gray-400
        h-full
        w-20
        rounded-l
        cursor-pointer
        outline-none
      "
      @click="decreaseQty()"
    >
      <span class="m-auto text-2xl font-thin">−</span>
    </button>
    <div
      class="
        focus:outline-none
        text-center
        w-full
        bg-gray-300
        font-semibold
        text-md
        hover:text-black
        focus:text-black
        md:text-basecursor-default
        flex
        items-center
        text-gray-700
        outline-none
        justify-center
      "
    >
      {{ qty }}
    </div>
    <button
      data-action="increment"
      class="
        bg-gray-300
        text-gray-600
        hover:text-gray-700 hover:bg-gray-400
        h-full
        w-20
        rounded-r
        cursor-pointer
      "
      @click="increaseQty()"
    >
      <span class="m-auto text-2xl font-thin">+</span>
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'QtySelector',
    props: {
      qty: {
        type: Number,
        default: 1,
      },
    },
    methods: {
      increaseQty() {
        this.$emit('incrementQty', this.qty + 1)
      },
      decreaseQty() {
        if (this.qty != 0) {
          this.$emit('decrementQty', this.qty - 1)
        }
      },
    },
  })
</script>
