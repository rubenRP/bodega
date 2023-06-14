<template>
  <ReloadPWA />
  <component
    :is="layout == 'AuthLayout' ? AuthLayout : DefaultLayout"
    :class="showSidebar ? 'overflow-hidden' : ''"
  />
</template>

<script setup lang="ts">
  import { watch, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import ReloadPWA from './components/General/ReloadPWA.vue'
  import AuthLayout from './layouts/AuthLayout.vue'
  import DefaultLayout from './layouts/DefaultLayout.vue'
  import { useBottlesStore } from './stores/bottles'
  import { useGeneralStore } from './stores/general'
  import { useReviewsStore } from './stores/reviews'
  import { useUserStore } from './stores/user'
  import { supabase } from './supabase'

  const layout = ref()
  const generalStore = useGeneralStore()
  const showSidebar = generalStore.sidebar
  const bottleStore = useBottlesStore()
  const bottles = bottleStore.bottles
  const openedBottles = bottleStore.openedBottles
  const addedBottles = bottleStore.addedBottles
  const reviewsStore = useReviewsStore()
  const reviews = reviewsStore.reviews
  const userStore = useUserStore()
  const route = useRoute()

  userStore.fetchUser(supabase.auth.user())
  supabase.auth.onAuthStateChange((_, session) => {
    userStore.fetchUser(session!.user)
  })
  if (bottles.length === 0) {
    bottleStore.fetchBottles()
  }
  if (reviews.length === 0) {
    reviewsStore.fetchReviews()
  }
  if (openedBottles.length === 0) {
    bottleStore.fetchOpenedBottles()
  }
  if (addedBottles.length === 0) {
    bottleStore.fetchAddedBottles()
  }

  watch(
    () => route.meta.layout,
    async (newLayout) => {
      if (newLayout !== undefined) {
        layout.value = newLayout
      } else {
        layout.value = 'DefaultLayout'
      }
    }
  )
</script>
