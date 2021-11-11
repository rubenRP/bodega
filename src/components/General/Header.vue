<template>
  <nav
    class="
      bg-gradient-to-r
      from-pink-900
      to-pink-800
      z-50
      w-full
      flex flex-wrap
      items-center
      justify-between
      px-2
      py-3
      navbar-expand-lg
      relative
    "
  >
    <div
      class="
        container
        px-4
        md:px-10
        mx-auto
        flex flex-wrap
        items-center
        justify-between
      "
    >
      <div
        class="
          w-2/3
          relative
          flex
          justify-between
          lg:w-auto lg:static lg:block lg:justify-start
        "
      >
        <button
          class="
            cursor-pointer
            text-xl
            leading-none
            px-3
            py-1
            border border-solid border-transparent
            rounded
            bg-transparent
            block
            lg:hidden
            outline-none
            focus:outline-none
            text-white
          "
          type="button"
          @click="toggleSidebar"
        >
          <font-awesome-icon icon="bars" />
        </button>
        <router-link
          to="/"
          class="
            text-white text-sm
            font-bold
            leading-relaxed
            inline-block
            lg:mr-8
            pt-2
            whitespace-nowrap
            uppercase
            w-1/2
            lg:w-32
          "
        >
          <div class="w-32 lg:w-full ml-auto mr-auto">
            <Logo />
          </div>
        </router-link>
      </div>
      <div class="lg:flex flex-grow items-center">
        <ul
          class="
            list-none
            mr-auto
            z-20
            flex-shrink-0
            fixed
            inset-y-0
            w-64
            mt-20
            left-0
            overflow-y-auto
            bg-white
            lg:relative
            lg:block
            lg:shadow-none
            lg:mt-0
            lg:flex
            lg:flex-row
            lg:w-auto
            lg:bg-transparent
          "
          :class="showSidebar ? 'shadow-lg' : 'hidden'"
        >
          <li class="flex items-center">
            <router-link
              class="
                lg:text-white lg:hover:text-blueGray-200
                text-blueGray-700
                px-3
                py-4
                lg:py-2
                flex
                items-center
                text-xs
                uppercase
                font-bold
              "
              to="/cellar"
            >
              <span>{{ $t('cellar.myCellar') }}</span>
            </router-link>
          </li>
          <li class="flex items-center">
            <router-link
              class="
                lg:text-white lg:hover:text-blueGray-200
                text-blueGray-700
                px-3
                py-4
                lg:py-2
                flex
                items-center
                text-xs
                uppercase
                font-bold
              "
              to="/bottles"
            >
              <span>{{ $t('bottles.bottles') }}</span>
            </router-link>
          </li>
          <li class="flex items-center">
            <router-link
              class="
                lg:text-white lg:hover:text-blueGray-200
                text-blueGray-700
                px-3
                py-4
                lg:py-2
                flex
                items-center
                text-xs
                uppercase
                font-bold
              "
              to="/reviews"
            >
              <span>Reviews</span>
            </router-link>
          </li>
          <li class="flex items-center">
            <router-link
              class="
                lg:text-white lg:hover:text-blueGray-200
                text-blueGray-700
                px-3
                py-4
                lg:py-2
                flex
                items-center
                text-xs
                uppercase
                font-bold
              "
              to="/stats"
            >
              <span>{{ $t('stats.stats') }}</span>
            </router-link>
          </li>
        </ul>
        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto items-end">
          <li class="flex items-center">
            <ProfileMenu />
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Logo from '@/components/General/Logo.vue'
  import ProfileMenu from '@/components/General/Topbar/ProfileMenu.vue'
  import { mapGetters, mapMutations } from 'vuex'
  export default defineComponent({
    name: 'Header',
    components: {
      Logo,
      ProfileMenu,
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
>
