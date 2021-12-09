<template>
  <div
    class="relative flex lg:w-64 lg:px-4 flex-wrap items-stretch lg:ml-auto"
    @click="toggleSearch()"
  >
    <div class="flex">
      <span
        class="
          font-normal
          leading-snug
          flex
          text-center
          white-space-no-wrap
          lg:border
          border-solid border-white
          rounded-full
          text-sm
          items-center
          rounded-r-none
          pl-2
          py-1
          text-white
          lg:border-r-0
          placeholder-white
        "
      >
        <font-awesome-icon icon="search" />
      </span>
    </div>
    <div
      class="
        px-2
        py-1
        h-8
        border border-solid border-white
        rounded-full
        text-sm
        leading-snug
        text-white
        shadow-none
        outline-none
        focus:outline-none
        w-full
        font-normal
        rounded-l-none
        flex-1
        border-l-0
        placeholder-white
        hidden
        lg:block
      "
    >
      {{ $t('general.search') }}
    </div>
  </div>
  <teleport to="#beforeBodyEnd">
    <Modal v-on:closeModal="toggleSearch()" v-show="openedSearch">
      <template v-slot:header>{{ $t('general.search') }}</template>
      <template v-slot:body>
        <div class="h-72">
          <div class="mb-3 pt-0">
            <input
              type="text"
              :placeholder="$t('general.search')"
              class="
                px-3
                py-4
                placeholder-blueGray-300
                text-blueGray-600
                relative
                bg-white
                rounded
                text-base
                shadow
                outline-none
                focus:outline-none focus:shadow-outline
                w-full
                focus:border-pink-900 focus:ring-0
              "
              v-model="search"
              ref="quickSearch"
            />
          </div>
          <ul v-if="search.length" class="" aria-label="submenu">
            <li
              class="flex items-center text-sm mb-2"
              v-for="item in filteredBottles.slice(0, 5)"
              :key="item.id"
            >
              <router-link class="cursor-pointer" :to="'/bottle/' + item.id">
                <p class="font-semibold">{{ item.name }}</p>
                <p class="text-xs text-gray-600 dark:text-gray-400">
                  {{ item.cellar }} <span>- {{ item.vintage }}</span>
                </p>
              </router-link>
            </li>
            <li
              v-if="!filteredBottles.length"
              class="flex items-center text-sm"
            >
              <p class="font-semibold">{{ $t('general.noResults') }}</p>
            </li>
          </ul>
        </div>
      </template>
    </Modal>
  </teleport>
</template>

<script lang="ts">
  import useFilteredBottles from '@/hooks/useFilteredBottles'
  import { defineComponent } from 'vue'
  import { mapGetters } from 'vuex'
  import Modal from '@/components/General/Modal.vue'

  export default defineComponent({
    components: {
      Modal,
    },
    data() {
      return {
        search: '',
        openedSearch: false,
      }
    },
    computed: {
      ...mapGetters({
        getBottles: 'bottles/bottles',
      }),
      filteredBottles() {
        return useFilteredBottles(this.getBottles, this.search)
      },
    },
    methods: {
      toggleSearch() {
        this.openedSearch = !this.openedSearch
        if (!this.openedSearch) {
          this.search = ''
        } else {
          this.$refs.quickSearch.focus()
        }
      },
    },
  })
</script>
