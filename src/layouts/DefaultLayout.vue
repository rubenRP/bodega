<template>
  <div :class="showSidebar && 'overflow-hidden'">
    <Header />
    <main class="px-4 md:px-10 mx-auto w-full container">
      <div
        class="
          fixed
          inset-0
          z-10
          flex
          items-end
          bg-black bg-opacity-50
          sm:items-center sm:justify-center
        "
        @click="toggleSidebar"
        :class="!showSidebar && 'hidden'"
      ></div>
      <div>
        <router-view />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapGetters, mapMutations } from 'vuex'

  import Sidebar from '@/components/General/Sidebar.vue'
  import Topbar from '@/components/General/Topbar.vue'
  import Header from '@/components/General/Header.vue'
  import Footer from '@/components/General/Footer.vue'

  export default defineComponent({
    name: 'DefaultLayout',
    components: {
      Sidebar,
      Topbar,
      Header,
      Footer,
    },
    computed: { ...mapGetters({ showSidebar: 'general/sidebar' }) },
    methods: {
      ...mapMutations({
        toggleSidebar: 'general/TOGGLE_SIDEBAR',
      }),
    },
  })
</script>
