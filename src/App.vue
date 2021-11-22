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
  import { mapActions, mapGetters } from 'vuex'

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
    created() {
      if (this.getBottles.length === 0) {
        this.fetchBottles()
      }
      if (this.getReviews.length === 0) {
        this.fetchReviews()
      }
      if (this.openedBottles.length === 0) {
        this.fetchOpenedBottles()
      }
      if (this.addedBottles.length === 0) {
        this.fetchAddedBottles()
      }
    },
    setup() {
      store.dispatch('user/fetchUser', supabase.auth.user())
      supabase.auth.onAuthStateChange((_, session) => {
        store.dispatch('user/fetchUser', session?.user)
      })
    },
    computed: {
      ...mapGetters({
        showSidebar: 'general/sidebar',
        getBottles: 'bottles/bottles',
        getReviews: 'reviews/reviews',
        openedBottles: 'bottles/getOpenedBottles',
        addedBottles: 'bottles/getAddedBottles',
      }),
    },
    watch: {
      $route(to) {
        if (to.meta.layout !== undefined) {
          this.layout = to.meta.layout
        } else {
          this.layout = 'DefaultLayout'
        }
      },
    },
    methods: {
      ...mapActions({
        fetchBottles: 'bottles/fetchBottles',
        fetchReviews: 'reviews/fetchReviews',
        fetchOpenedBottles: 'bottles/fetchOpenedBottles',
        fetchAddedBottles: 'bottles/fetchAddedBottles',
      }),
    },
  })
</script>
