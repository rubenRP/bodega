<template>
  <div :class="{ dark: dark || false }">
    <ReloadPWA />
    <component :is="layout" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapGetters } from 'vuex'

  import { supabase } from './supabase'
  import store from './store'

  import AuthLayout from './layouts/AuthLayout.vue'
  import DefaultLayout from './layouts/DefaultLayout.vue'
  import ReloadPWA from './components/ReloadPWA.vue'
  import router from './router'

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
      store.dispatch('fetchUser', supabase.auth.user())
      supabase.auth.onAuthStateChange((_, session) => {
        store.dispatch('fetchUser', session?.user)
      })
    },
    computed: { ...mapGetters({ dark: 'darkMode' }) },
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
