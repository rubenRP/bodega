<template>
  <ReloadPWA />
  <component :is="layout" :class="showSidebar ? 'overflow-hidden' : ''" />
</template>

<script lang="ts">
  import { mapActions, mapState } from 'pinia'
  import { defineComponent } from 'vue'
  import ReloadPWA from './components/General/ReloadPWA.vue'
  import AuthLayout from './layouts/AuthLayout.vue'
  import DefaultLayout from './layouts/DefaultLayout.vue'
  import { useBottlesStore } from './stores/bottles'
  import { useGeneralStore } from './stores/general'
  import { useReviewsStore } from './stores/reviews'
  import { useUserStore } from './stores/user'
  import { supabase } from './supabase'

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
      this.fetchUser(supabase.auth.user())
      supabase.auth.onAuthStateChange((_, session) => {
        this.fetchUser(session!.user)
      })
      if (this.bottles.length === 0) {
        this.fetchBottles()
      }
      if (this.reviews.length === 0) {
        this.fetchReviews()
      }
      if (this.openedBottles.length === 0) {
        this.fetchOpenedBottles()
      }
      if (this.addedBottles.length === 0) {
        this.fetchAddedBottles()
      }
    },
    computed: {
      ...mapState(useGeneralStore, {
        showSidebar: 'sidebar',
      }),
      ...mapState(useBottlesStore, [
        'bottles',
        'openedBottles',
        'addedBottles',
      ]),
      ...mapState(useReviewsStore, ['reviews']),
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
      ...mapActions(useBottlesStore, [
        'fetchBottles',
        'fetchOpenedBottles',
        'fetchAddedBottles',
      ]),
      ...mapActions(useReviewsStore, ['fetchReviews']),
      ...mapActions(useUserStore, ['fetchUser']),
    },
  })
</script>
