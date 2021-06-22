<template>
  <div
    class="flex h-screen bg-gray-50 dark:bg-gray-900"
    :class="{ 'overflow-hidden': showSidebar || false }"
  >
    <Sidebar />
    <div class="flex flex-col flex-1 w-full">
      <Topbar />
      <main class="h-full pb-16 overflow-y-auto">
        <div class="container grid px-6 mx-auto">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapGetters } from 'vuex'

  import Sidebar from '../components/Sidebar.vue'
  import Topbar from '../components/Topbar.vue'

  export default defineComponent({
    name: 'DefaultLayout',
    components: {
      Sidebar,
      Topbar,
    },
    computed: { ...mapGetters({ showSidebar: 'sidebar' }) },
  })
</script>
