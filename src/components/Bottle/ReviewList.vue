<template>
  <div v-if="bottleId">
    <div
      v-for="review in getReviewsById(bottleId)"
      :key="review?.id"
      class="mb-6"
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
        <div class="mt-1 font-semibold">{{ review.username }}</div>
      </div>
      <div class="mt-4 flex flex-col lg:flex-row">
        <StarRating :value="review.rating" class="mr-6 mt-1" />
        <span class="mt-2 lg:mt-0" v-if="review.comment">
          {{ review.comment }}
        </span>
      </div>
      <div class="mt-2 text-xs">
        {{ new Date(review.date).toLocaleDateString() }}
      </div>
    </div>
    <div
      v-if="getReviewsById(bottleId).length == 0"
      class="text-center text-gray-600"
    >
      {{ $t('reviews.noReviews') }}
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import StarRating from '@/components/Reviews/StarRating.vue'
  import { mapGetters } from 'vuex'
  export default defineComponent({
    name: 'ReviewList',
    components: {
      StarRating,
    },
    props: {
      bottleId: Number,
    },
    computed: {
      ...mapGetters({
        getReviewsById: 'reviews/getReviewsById',
      }),
    },
  })
</script>
