<template>
  <header class="z-10 py-2 md:py-4 bg-white shadow-md dark:bg-gray-800">
    <div
      class="
        container
        flex
        items-center
        justify-between
        h-full
        px-6
        mx-auto
        text-pink-900
        dark:text-red-300
      "
    >
      <!-- Mobile hamburger -->
      <button
        class="
          p-1
          mr-5
          -ml-1
          rounded-md
          md:hidden
          focus:outline-none focus:shadow-outline-red
        "
        @click="toggleSidebar"
        aria-label="Menu"
      >
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <!-- Logo -->
      <div class="flex justify-center w-32">
        <img src="../assets/logo.svg" class="md:hidden" />
      </div>
      <ul class="flex items-center flex-shrink-0 space-x-6">
        <!-- Theme toggler -->
        <li class="flex">
          <button
            class="rounded-md focus:outline-none focus:shadow-outline-red"
            @click="toggleTheme"
            aria-label="Toggle color mode"
          >
            <MoonIcon class="w-5 h-5" v-if="!darkMode" />
            <SunIcon class="w-5 h-5" v-else />
          </button>
        </li>

        <!-- Profile menu -->
        <ProfileMenu />
      </ul>
    </div>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import { MoonIcon, SunIcon } from '@heroicons/vue/solid'
  import ProfileMenu from './Topbar/ProfileMenu.vue'
  import Logo from './Logo.vue'

  export default defineComponent({
    name: 'Topbar',
    components: {
      MoonIcon,
      SunIcon,
      ProfileMenu,
      Logo,
    },
    computed: { ...mapGetters({ darkMode: 'darkMode' }) },
    methods: {
      ...mapMutations({
        toggleTheme: 'TOGGLE_DARK_MODE',
        toggleSidebar: 'TOGGLE_SIDEBAR',
      }),
      closeNotificationsMenu() {},
    },
  })
</script>
