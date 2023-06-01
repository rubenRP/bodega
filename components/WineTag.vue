<template>
  <span
    class="px-2 py-1 font-semibold leading-tight rounded-full"
    :class="getTypeColor"
  >
    {{ $t(getTypeTranslated) }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps({
  type: String,
});

const getTypeColor = computed(() => {
  switch (props.type) {
    case "Red":
      return "text-red-700 bg-red-100 ";
    case "White":
      return "text-green-700 bg-green-100  ";
    case "Rose":
      return "text-pink-700 bg-pink-100";
    case "Sparkling":
      return "text-yellow-700 bg-yellow-100";
    default:
      return "text-yellow-700 bg-yellow-100";
  }
});

const getTypeTranslated = computed(() => {
  switch (props.type) {
    case "Red":
      return "cellar.red";
    case "White":
      return "cellar.white";
    case "Rose":
      return "cellar.rose";
    case "Sparkling":
      return "cellar.sparkling";
  }
  return "cellar.other";
});
</script>
