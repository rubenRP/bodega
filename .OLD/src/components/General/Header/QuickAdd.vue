<template>
  <li class="relative">
    <button
      class="align-middle focus:outline-none"
      @click="toggleQuickAdd"
      @keydown.escape="closeQuickAdd"
      aria-haspopup="true"
    >
      <div class="relative w-8 h-8">
        <div
          class="group w-full h-full overflow-hidden text-center flex justify-center items-center cursor-pointer"
        >
          <font-awesome-icon
            :icon="['fas', 'plus']"
            class="text-white font-light align-middle"
          />
        </div>
      </div>
    </button>
    <ul
      @keydown.escape="closeQuickAdd"
      v-if="isQuickAddOpen"
      class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md transition duration-100 ease-in"
      aria-label="submenu"
    >
      <li class="flex">
        <button
          class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800"
          @click="toggleNewBottle()"
        >
          <font-awesome-icon
            :icon="['fas', 'wine-bottle']"
            class="w-4 h-4 mr-3"
          />
          <span>{{ $t('cellar.addBottle') }}</span>
        </button>
      </li>
      <li class="flex">
        <button
          class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800"
          @click="toggleNewReview()"
        >
          <font-awesome-icon :icon="['fas', 'star']" class="w-4 h-4 mr-3" />
          <span>{{ $t('reviews.addReview') }}</span>
        </button>
      </li>
    </ul>
  </li>
  <teleport to="#beforeBodyEnd">
    <ReviewForm v-if="openedNewReview" @closeModalReview="toggleNewReview()" />
    <BottleForm v-if="openedNewBottle" @closeModalForm="toggleNewBottle()" />
  </teleport>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import ReviewForm from '@/components/Reviews/ReviewForm.vue'
  import BottleForm from '@/components/Cellar/BottleForm.vue'

  export default defineComponent({
    name: 'QuickAdd',
    components: {
      ReviewForm,
      BottleForm,
    },
    data() {
      return {
        isQuickAddOpen: false,
        openedNewBottle: false,
        openedNewReview: false,
      }
    },
    methods: {
      toggleQuickAdd() {
        this.isQuickAddOpen = !this.isQuickAddOpen
      },
      closeQuickAdd() {
        this.isQuickAddOpen = false
      },
      toggleNewBottle() {
        this.openedNewBottle = !this.openedNewBottle
        this.closeQuickAdd()
      },
      toggleNewReview() {
        this.openedNewReview = !this.openedNewReview
        this.closeQuickAdd()
      },
    },
  })
</script>
