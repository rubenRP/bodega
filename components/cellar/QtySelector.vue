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
        <span class="">{{ $t("cellar.drink") }}</span>
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

<script setup lang="ts">
const props = defineProps({
  qty: Number,
  quick: Boolean,
});

const showAction = ref(false);

const emit = defineEmits<{
  (event: "incrementQty", qty: number): void;
  (event: "decrementQty", qty: number): void;
}>();

const increaseQty = () => {
  emit("incrementQty", (props.qty || 0) + 1);
};

const decreaseQty = () => {
  if (props.qty != 0) {
    emit("decrementQty", (props.qty || 0) - 1);
  }
  showAction.value = false;
};
</script>
