<template>
  <span class="badge rounded-pill py-2 px-3" :class="getTypeColor">
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
      return "bg-red ";
    case "White":
      return "bg-white-wine";
    case "Rose":
      return "bg-rose";
    case "Sparkling":
      return "bg-sparkling";
    default:
      return "bg-other";
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
