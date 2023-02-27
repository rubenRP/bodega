<template>
  <div
    class="flex flex-row h-8 w-full rounded-lg relative bg-transparent mt-1"
    v-if="quick"
  >
    <div
      class="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-white focus:text-black md:text-basecursor-default flex items-center text-gray-700 outline-none justify-center rounded cursor-pointer hover:bg-gray-500"
      v-if="!showAction"
      @click="showAction = true"
    >
      {{ qty }}
    </div>
    <div
      v-else
      class="focus:outline-none text-center w-full bg-pink-900 font-semibold text-md hover:text-white text-white focus:text-black md:text-basecursor-default flex items-center outline-none justify-center rounded cursor-pointer hover:bg-pink-800"
    >
      <button class="" @click="decreaseQty()">
        <span class="">{{ $t('cellar.drink') }}</span>
      </button>
    </div>
  </div>
  <div
    class="flex flex-row h-8 w-full rounded-lg relative bg-transparent mt-1"
    v-else
  >
    <div
      class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none flex"
      @click="decreaseQty()"
    >
      <font-awesome-icon
        :icon="['fas', 'minus']"
        class="m-auto"
      ></font-awesome-icon>
    </div>
    <div
      class="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md focus:text-black md:text-basecursor-default flex items-center text-gray-700 outline-none justify-center"
    >
      {{ qty }}
    </div>
    <div
      class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer flex"
      @click="increaseQty()"
    >
      <font-awesome-icon
        :icon="['fas', 'plus']"
        class="m-auto"
      ></font-awesome-icon>
    </div>
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
      quick: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        showAction: false,
      }
    },
    methods: {
      increaseQty() {
        console.log('increaseQty')
        this.$emit('incrementQty', this.qty + 1)
      },
      decreaseQty() {
        if (this.qty != 0) {
          console.log('decreaseQty')
          this.$emit('decrementQty', this.qty - 1)
        }
        this.showAction = false
      },
    },
  })
</script>
