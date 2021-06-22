<template>
  <aside
    class="
      z-20
      flex-shrink-0
      hidden
      w-64
      overflow-y-auto
      bg-white
      dark:bg-gray-800
      md:block
    "
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
          block
          w-6/12
        "
      >
        <Logo />
      </router-link>
      <ul class="mt-6">
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
            <ArchiveIcon class="w-5 h-5" />

            <span class="ml-4">{{ $t('cellar.myCellar') }}</span>
          </router-link>
        </li>
        <li class="relative px-6 py-3 hidden">
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
        <li class="relative px-6 py-3 hidden">
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
            to="/settings"
          >
            <CogIcon class="w-5 h-5" />
            <span class="ml-4">Settings</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import Logo from '../components/Logo.vue'
  import {
    HomeIcon,
    CogIcon,
    ArchiveIcon,
    StarIcon,
  } from '@heroicons/vue/solid'
  import { mapGetters } from 'vuex'

  export default defineComponent({
    name: 'Sidebar',
    components: {
      Logo,
      HomeIcon,
      CogIcon,
      ArchiveIcon,
      StarIcon,
    },
    data() {
      return {
        sideBar: null,
      }
    },
    computed: { ...mapGetters({ showSidebar: 'sidebar' }) },
  })
</script>
