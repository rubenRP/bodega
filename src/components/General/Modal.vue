<template>
  <div
    class="
      fixed
      inset-0
      z-50
      flex
      items-end
      bg-black bg-opacity-50
      sm:items-center sm:justify-center
    "
  >
    <div
      class="
        w-full
        px-6
        py-4
        overflow-hidden
        bg-white
        rounded-t-lg
        dark:bg-gray-800
        sm:rounded-lg sm:m-4
      "
      :class="wide ? 'sm:max-w-7xl' : 'sm:max-w-xl'"
    >
      <div class="modal-container">
        <div class="flex justify-between">
          <div
            class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300"
          >
            <slot name="header"> Header </slot>
          </div>
          <button
            class="
              inline-flex
              items-center
              justify-center
              w-6
              h-6
              text-gray-400
              transition-colors
              duration-150
              rounded
              dark:hover:text-gray-200
              hover: hover:text-gray-700
            "
            @click="$emit('closeModal')"
          >
            <svg
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              role="img"
              aria-hidden="true"
            >
              <path
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div
          class="modal-body pb-6"
          :class="!wide && 'md:max-h-96 md:overflow-y-auto'"
        >
          <div class="text-sm text-gray-700 dark:text-gray-400">
            <slot name="body"> Body </slot>
          </div>
        </div>

        <div class="modal-footer">
          <div
            class="
              flex flex-col
              items-center
              justify-end
              px-6
              py-3
              -mx-6
              -mb-4
              space-y-4
              sm:space-y-0 sm:space-x-6 sm:flex-row
              bg-gray-50
              dark:bg-gray-800
            "
          >
            <slot name="footer"> </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'Modal',
    props: {
      wide: {
        type: Boolean,
        default: false,
      },
    },
  })
</script>
