<template>
  <div class="w-full overflow-hidden text-center text-3xl">
    <font-awesome-icon :icon="['fas', 'wine-bottle']" spin />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'Spinner',
  })
</script>
