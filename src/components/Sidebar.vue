<template>
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
    :class="!showSidebar ? 'hidden' : ''"
  ></div>
  <aside
    class="
      z-20
      flex-shrink-0
      fixed
      md:relative
      inset-y-0
      w-64
      mt-12
      md:mt-0
      overflow-y-auto
      bg-white
      dark:bg-gray-800
      md:block
    "
    :class="!showSidebar ? 'hidden' : ''"
  >
    <div class="py-4 text-gray-500 dark:text-gray-400">
      <router-link
        to="/"
        class="
          ml-6
          text-lg
          font-bold
          text-gray-800
          dark:text-gray-200
          color-white
          hidden
          md:block
          w-6/12
        "
      >
        <Logo />
      </router-link>
      <ul class="md:mt-6">
        <li class="relative px-6 py-3">
          <router-link
            class="
              inline-flex
              items-center
              w-full
              text-sm
              font-semibold
              transition-colors
              duration-150
              hover:text-gray-800
              dark:hover:text-gray-200
            "
            to="/"
          >
            <HomeIcon class="w-5 h-5" />
            <span class="ml-4">Home</span>
          </router-link>
        </li>
        <li class="relative px-6 py-3">
          <router-link
            class="
              inline-flex
              items-center
              w-full
              text-sm
              font-semibold
              transition-colors
              duration-150
              hover:text-gray-800
              dark:hover:text-gray-200
            "
            to="/cellar"
          >
            <CubeIcon class="w-5 h-5" />

            <span class="ml-4">{{ $t('cellar.myCellar') }}</span>
          </router-link>
        </li>
        <li class="relative px-6 py-3">
          <router-link
            class="
              inline-flex
              items-center
              w-full
              text-sm
              font-semibold
              transition-colors
              duration-150
              hover:text-gray-800
              dark:hover:text-gray-200
            "
            to="/bottles"
          >
            <SupportIcon class="w-5 h-5" />

            <span class="ml-4">{{ $t('bottles.bottles') }}</span>
          </router-link>
        </li>
        <li class="relative px-6 py-3">
          <router-link
            class="
              inline-flex
              items-center
              w-full
              text-sm
              font-semibold
              transition-colors
              duration-150
              hover:text-gray-800
              dark:hover:text-gray-200
            "
            to="/reviews"
          >
            <StarIcon class="w-5 h-5" />

            <span class="ml-4">Reviews</span>
          </router-link>
        </li>
        <li class="relative px-6 py-3">
          <router-link
            class="
              inline-flex
              items-center
              w-full
              text-sm
              font-semibold
              transition-colors
              duration-150
              hover:text-gray-800
              dark:hover:text-gray-200
            "
            to="/stats"
          >
            <ChartBarIcon class="w-5 h-5" />
            <span class="ml-4">{{ $t('stats.stats') }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import Logo from '@/components/Logo.vue'
  import {
    HomeIcon,
    SupportIcon,
    StarIcon,
    ChartBarIcon,
    CubeIcon,
  } from '@heroicons/vue/solid'
  import { mapGetters, mapMutations } from 'vuex'

  export default defineComponent({
    name: 'Sidebar',
    components: {
      Logo,
      HomeIcon,
      CubeIcon,
      ChartBarIcon,
      SupportIcon,
      StarIcon,
    },
    data() {
      return {
        sideBar: null,
      }
    },
    computed: {
      ...mapGetters({ showSidebar: 'general/sidebar' }),
    },
    methods: {
      ...mapMutations({
        toggleSidebar: 'general/TOGGLE_SIDEBAR',
      }),
    },
  })
</script>
