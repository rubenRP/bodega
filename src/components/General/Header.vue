<template>
  <nav
    class="
      bg-gradient-to-b
      from-pink-900
      to-pink-800
      z-50
      w-full
      flex flex-wrap
      items-center
      justify-between
      py-3
      navbar-expand-lg
      relative
      h-20
      lg:px-4 lg:h-auto
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
            pr-3
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
          <font-awesome-icon :icon="['fas', 'bars']" />
        </button>
        <router-link
          to="/"
          class="
            text-white text-sm
            font-bold
            leading-relaxed
            inline-block
            lg:mr-8 lg:pt-2
            whitespace-nowrap
            uppercase
            w-1/2
            lg:w-32
          "
        >
          <div class="w-32 lg:w-full ml-auto mr-auto max-w-full">
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
            w-3/4
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
                px-5
                lg:px-3
                py-4
                lg:py-2
                flex
                items-center
                uppercase
                lg:font-bold
                w-full
                lg:w-auto
                border-b-2
                lg:border-b-0 lg:text-xs
              "
              to="/cellar"
            >
              <font-awesome-icon icon="border-all" class="mr-4 lg:hidden" />
              <span>{{ $t('cellar.myCellar') }}</span>
            </router-link>
          </li>
          <li class="flex items-center">
            <router-link
              class="
                lg:text-white lg:hover:text-blueGray-200
                text-blueGray-700
                px-5
                lg:px-3
                py-4
                lg:py-2
                flex
                items-center
                uppercase
                lg:font-bold
                w-full
                lg:w-auto
                border-b-2
                lg:border-b-0 lg:text-xs
              "
              to="/bottles"
            >
              <font-awesome-icon icon="wine-bottle" class="mr-4 lg:hidden" />
              <span>{{ $t('bottles.bottles') }}</span>
            </router-link>
          </li>
          <li class="flex items-center">
            <router-link
              class="
                lg:text-white lg:hover:text-blueGray-200
                text-blueGray-700
                px-5
                lg:px-3
                py-4
                lg:py-2
                flex
                items-center
                uppercase
                lg:font-bold
                w-full
                lg:w-auto
                border-b-2
                lg:border-b-0 lg:text-xs
              "
              to="/reviews"
            >
              <font-awesome-icon icon="star" class="mr-4 lg:hidden" />
              <span>Reviews</span>
            </router-link>
          </li>
          <li class="flex items-center">
            <router-link
              class="
                lg:text-white lg:hover:text-blueGray-200
                text-blueGray-700
                px-5
                lg:px-3
                py-4
                lg:py-2
                flex
                items-center
                uppercase
                lg:font-bold
                w-full
                lg:w-auto
                border-b-2
                lg:border-b-0 lg:text-xs
              "
              to="/stats"
            >
              <font-awesome-icon icon="chart-line" class="mr-4 lg:hidden" />
              <span>{{ $t('stats.stats') }}</span>
            </router-link>
          </li>
        </ul>
        <ul class="flex flex-row justify-end list-none lg:ml-auto items-end">
          <li class="items-center mr-4 hidden lg:flex">
            <QuickSearch />
          </li>
          <li class="flex items-center mr-4">
            <QuickAdd />
          </li>
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
  import ProfileMenu from '@/components/General/Header/ProfileMenu.vue'
  import { mapGetters, mapMutations } from 'vuex'
  import QuickAdd from '@/components/General/Header/QuickAdd.vue'
  import QuickSearch from '@/components/General/Header/QuickSearch.vue'
  export default defineComponent({
    name: 'Header',
    components: {
      Logo,
      ProfileMenu,
      QuickAdd,
      QuickSearch,
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
