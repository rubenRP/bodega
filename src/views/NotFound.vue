<template>
  <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
    {{ $t('general.404') }}
  </h2>
  <div class="">
    <img src="../assets/img/404.gif" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'NotFound',
  })
</script>
