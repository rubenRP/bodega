<template>
  <div
    v-for="(review, index) in reviews"
    :key="review?.id"
    :class="index ?? 'border-t-2'"
  >
    <div class="flex">
      <div class="relative w-8 h-8 rounded-full mr-4">
        <div
          class="
            group
            w-full
            h-full
            rounded-full
            overflow-hidden
            shadow-inner
            text-center
            bg-pink-900
            table
            cursor-pointer
          "
        >
          <span class="table-cell text-white align-middle">
            {{ review.rating }}
          </span>
        </div>
      </div>
      <div class="mt-1 font-semibold">{{ review.profiles.username }}</div>
    </div>
    <div class="mt-4 flex">
      <StarRating :value="review.rating" class="mr-6 mt-1" />
      {{ review.comment }}
    </div>
    <div class="mt-2 text-xs">
      {{ new Date(review.date_added).toLocaleDateString() }}
    </div>
  </div>
  <div v-if="reviews.length === 0" class="text-center text-gray-600">
    {{ $t('reviews.noReviews') }}
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import StarRating from '@/components/Reviews/StarRating.vue'
  import { getBottleReview } from '@/api/reviews'
  export default defineComponent({
    name: 'ReviewList',
    components: {
      StarRating,
    },
    props: {
      bottleId: Number,
    },
    data() {
      return {
        reviews: [],
      }
    },
    watch: {
      bottleId() {
        this.fetchReviews()
      },
    },
    methods: {
      async fetchReviews() {
        this.reviews = await getBottleReview(this.bottleId)
      },
    },
  })
</script>
