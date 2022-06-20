<template>
  <div class="flex">
    <div v-for="i in 5" :key="i" :class="{ 'mr-1': i < 5 }">
      <svg
        class="block h-4 w-4"
        :class="[9 - value >= i ? 'text-grey' : 'text-pink-900']"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    value: {
      type: Number,
      default: 0,
    },
  })
</script>
