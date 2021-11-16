<template>
  <ReloadPWA />
  <component :is="layout" :class="showSidebar ? 'overflow-hidden' : ''" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { supabase } from './supabase'
  import store from './store'

  import AuthLayout from './layouts/AuthLayout.vue'
  import DefaultLayout from './layouts/DefaultLayout.vue'
  import ReloadPWA from './components/General/ReloadPWA.vue'
  import { mapGetters } from 'vuex'

  export default defineComponent({
    name: 'App',
    components: {
      AuthLayout,
      DefaultLayout,
      ReloadPWA,
    },
    data() {
      return {
        layout: '',
      }
    },
    setup() {
      store.dispatch('user/fetchUser', supabase.auth.user())
      supabase.auth.onAuthStateChange((_, session) => {
        store.dispatch('user/fetchUser', session?.user)
      })
    },
    computed: { ...mapGetters({ showSidebar: 'general/sidebar' }) },
    watch: {
      $route(to) {
        if (to.meta.layout !== undefined) {
          this.layout = to.meta.layout
        } else {
          this.layout = 'DefaultLayout'
        }
      },
    },
  })
</script>
