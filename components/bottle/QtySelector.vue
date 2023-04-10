<template>
  <div v-if="quick">
    <div
      class="btn btn-secondary"
      v-if="!showAction"
      @click="showAction = true"
    >
      {{ qty }}
    </div>
    <div v-else>
      <button class="" @click="decreaseQty()">
        <span class="">{{ $t("cellar.drink") }}</span>
      </button>
    </div>
  </div>
  <div class="btn-group" v-else>
    <div class="btn btn-secondary" @click="decreaseQty()">
      <ClientOnly>
        <font-awesome-icon
          :icon="['fas', 'minus']"
          class="m-auto"
        ></font-awesome-icon>
      </ClientOnly>
    </div>
    <div class="btn btn-secondary">
      {{ qty }}
    </div>
    <div class="btn btn-secondary" @click="increaseQty()">
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
  qty: {
    type: Number,
    default: 1,
  },
  quick: {
    type: Boolean,
    default: false,
  },
});

const showAction = ref(false);
const emit = defineEmits(["incrementQty", "decrementQty"]);

const increaseQty = () => {
  emit("incrementQty", props.qty + 1);
};

const decreaseQty = () => {
  if (props.qty != 0) {
    emit("decrementQty", props.qty - 1);
  }
  showAction.value = false;
};
</script>
