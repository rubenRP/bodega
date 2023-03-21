<template>
  <div class="d-grid" v-if="quick">
    <div
      class="btn btn-secondary"
      v-if="!showAction"
      @click="showAction = true"
    >
      {{ qty }}
    </div>

    <button class="btn btn-primary" @click="decreaseQty()" v-else>
      <span>{{ $t("cellar.drink") }}</span>
    </button>
  </div>
  <div v-else>
    <div
      class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none flex"
      @click="decreaseQty()"
    >
      <ClientOnly>
        <font-awesome-icon
          :icon="['fas', 'minus']"
          class="m-auto"
        ></font-awesome-icon>
      </ClientOnly>
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
      <ClientOnly>
        <font-awesome-icon
          :icon="['fas', 'plus']"
          class="m-auto"
        ></font-awesome-icon>
      </ClientOnly>
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
