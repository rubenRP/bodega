<template>
  <h2
    class="my-8 text-xl lg:text-3xl font-semibold flex items-center justify-between"
  >
    <div>
      <div
        class="p-2 text-center inline-flex items-center justify-center w-8 lg:w-16 h-8 lg:h-16 mr-2 lg:mr-6 shadow-lg rounded-full bg-pink-900 text-white"
      >
        <font-awesome-icon :icon="['fas', 'star']" class="text-sm lg:text-xl" />
      </div>
      <span>Reviews</span>
    </div>
    <button
      class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-pink-900 bg-pink-900 hover:bg-transparent hover:text-pink-800 ml-4 lg:mt-0 ease-linear transition-all duration-150"
      @click="toggleNewReview()"
    >
      {{ $t('general.add') }}
    </button>
  </h2>

  <Spinner v-if="!getReviews.length" />

  <div class="w-full overflow-hidden shadow-lg rounded" v-else>
    <div class="w-full overflow-x-auto">
      <table class="w-full whitespace-no-wrap">
        <thead>
          <tr
            class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50 hidden md:table-row"
          >
            <th class="px-4 py-3">{{ $t('cellar.name') }}</th>
            <th class="px-4 py-3">{{ $t('cellar.vintage') }}</th>
            <th class="px-4 py-3">{{ $t('cellar.apellation') }}</th>
            <th class="px-4 py-3">{{ $t('cellar.type') }}</th>
            <th class="px-4 py-3 text-center">{{ $t('reviews.rating') }}</th>
            <th class="px-4 py-3 text-right"></th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y">
          <TableItem
            v-for="review in getReviews"
            :key="review.id"
            :item="review"
            @editItem="editReview(review)"
          />
        </tbody>
      </table>
    </div>
  </div>
  <teleport to="#beforeBodyEnd">
    <ReviewForm
      v-if="openedNewReview"
      @closeModalReview="toggleNewReview()"
      :review="activeReview"
    />
  </teleport>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue'
  import TableItem from '@/components/Reviews/TableItem.vue'
  import Modal from '@/components/General/Modal.vue'
  import ReviewForm from '@/components/Reviews/ReviewForm.vue'
  import { mapGetters, useStore } from 'vuex'
  import Spinner from '@/components/General/Spinner.vue'

  export default defineComponent({
    components: {
      TableItem,
      Modal,
      ReviewForm,
      Spinner,
    },
    setup() {
      const store = useStore()
      const openedNewReview = ref(false)
      const activeReview = ref({})

      const toggleNewReview = () => {
        openedNewReview.value = !openedNewReview.value
      }

      const editReview = (review: any) => {
        activeReview.value = review
        toggleNewReview()
      }

      const getReviews = computed(() => {
        return store.getters['reviews/reviews']
      })

      return {
        openedNewReview,
        activeReview,
        toggleNewReview,
        editReview,
        getReviews,
      }
    },
  })
</script>
