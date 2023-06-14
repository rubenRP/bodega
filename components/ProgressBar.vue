<template>
  <div
    class="progress mb-4"
    role="progressbar"
    :aria-valuenow="progress"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div class="progress-bar" :style="`width: ${progress}%`">
      {{ progress }}%
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  progress: Number,
});
</script>
