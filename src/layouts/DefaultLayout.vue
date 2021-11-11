<template>
  <div :class="{ 'overflow-hidden': showSidebar || false }">
    <Header />
    <main class="px-4 md:px-10 mx-auto w-full container">
      <div>
        <router-view />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapGetters } from 'vuex'

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
  })
</script>
