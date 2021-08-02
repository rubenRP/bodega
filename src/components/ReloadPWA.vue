<template>
  <div
    v-if="offlineReady || needRefresh"
    class="flex bg-pink-900 white text-sm px-6 pt-2"
    role="alert"
  >
    <div class="message">
      <span v-if="offlineReady"> App ready to work offline </span>
      <span v-else>
        New content available, click on reload button to update.
      </span>
    </div>
    <div class="buttons">
      <button
        v-if="needRefresh"
        @click="updateServiceWorker()"
        class="
          w-full
          px-4
          py-3
          text-sm
          font-medium
          leading-5
          text-white
          transition-colors
          duration-150
          bg-pink-900
          border border-transparent
          rounded-lg
          sm:w-auto sm:px-4 sm:py-2
          active:bg-pink-600
          hover:bg-pink-700
          focus:outline-none focus:shadow-outline-purple
        "
      >
        Reload
      </button>
      <button
        @click="close"
        class="
          flex
          items-center
          justify-between
          px-4
          py-2
          mt-8
          text-sm
          border-pink-900
          bg-pink-100
          rounded-lg
          focus:border-pink-800
          dark:text-gray-300
          border
        "
      >
        Close
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useRegisterSW } from 'virtual:pwa-register/vue'
  const { updateServiceWorker } = useRegisterSW()

  export default defineComponent({
    name: 'ReloadPWA',
    setup() {
      const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()
      const close = async () => {
        offlineReady.value = false
        needRefresh.value = false
      }
      return { offlineReady, needRefresh, updateServiceWorker, close }
    },
    methods: {
      async close() {
        this.offlineReady.value = false
        this.needRefresh.value = false
      },
      async updateServiceWorker() {
        await updateServiceWorker()
      },
    },
  })
</script>
