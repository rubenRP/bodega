<template>
  <h2
    class="
      my-8
      text-xl
      lg:text-3xl
      font-semibold
      flex
      items-center
      justify-between
    "
  >
    <div>
      <div
        class="
          p-2
          text-center
          inline-flex
          items-center
          justify-center
          w-8
          lg:w-16
          h-8
          lg:h-16
          mr-2
          lg:mr-6
          shadow-lg
          rounded-full
          bg-pink-900
          text-white
        "
      >
        <font-awesome-icon :icon="['fas', 'star']" class="text-sm lg:text-xl" />
      </div>
      <span>Reviews</span>
    </div>
  </h2>

  <Spinner v-if="!getReviews.length" />

  <div class="w-full overflow-hidden rounded-lg shadow-xs" v-else>
    <div class="w-full overflow-x-auto">
      <table class="w-full whitespace-no-wrap">
        <thead>
          <tr
            class="
              text-xs
              font-semibold
              tracking-wide
              text-left text-gray-500
              uppercase
              border-b
              dark:border-gray-700
              bg-gray-50
              dark:text-gray-400 dark:bg-gray-800
              hidden
              md:table-row
            "
          >
            <th class="px-4 py-3">{{ $t('cellar.name') }}</th>
            <th class="px-4 py-3">{{ $t('cellar.vintage') }}</th>
            <th class="px-4 py-3">{{ $t('cellar.apellation') }}</th>
            <th class="px-4 py-3">{{ $t('cellar.type') }}</th>
            <th class="px-4 py-3 text-center">{{ $t('reviews.rating') }}</th>
            <th class="px-4 py-3 text-right"></th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
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
  <ReviewForm
    v-if="openedNewReview"
    @closeModalForm="toggleNewReview()"
    :bottle="activeReview"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import {
    CurrencyEuroIcon,
    HomeIcon,
    CalculatorIcon,
    PencilAltIcon,
    SearchIcon,
  } from '@heroicons/vue/solid'

  import TableItem from '@/components/Reviews/TableItem.vue'
  import Modal from '@/components/General/Modal.vue'
  import ReviewForm from '@/components/Reviews/ReviewForm.vue'
  import { mapActions, mapGetters } from 'vuex'
  import Spinner from '@/components/General/Spinner.vue'

  export default defineComponent({
    name: 'Reviews',
    components: {
      PencilAltIcon,
      CurrencyEuroIcon,
      HomeIcon,
      SearchIcon,
      CalculatorIcon,
      TableItem,
      Modal,
      ReviewForm,
      Spinner,
    },
    data() {
      return {
        openedNewReview: false,
        activeReview: <any>null,
        search: '',
      }
    },
    created() {
      if (this.getCellar.length === 0) {
        this.fetchCellar()
      }
      if (this.getReviews.length === 0) {
        this.fetchReviews()
      }
    },
    computed: {
      ...mapGetters({
        getCellar: 'cellar/cellar',
        getReviews: 'reviews/reviews',
      }),
    },
    methods: {
      ...mapActions({
        fetchCellar: 'cellar/fetchCellar',
        unsuscribeCellar: 'cellar/unsuscribeCellar',
        destroyCellar: 'cellar/destroyCellar',
        fetchReviews: 'reviews/fetchReviews',
      }),
      toggleNewReview() {
        if (this.openedNewReview) {
          this.activeReview = null
        }
        this.openedNewReview = !this.openedNewReview
      },
      editReview(review: {}) {
        this.activeReview = review
        this.toggleNewReview()
      },
    },
  })
</script>
