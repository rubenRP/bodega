<template>
  <div class="list">
    <div v-for="review in reviews" :key="review.id">
      {{ review.date_added }}
      {{ review.comment }}
      {{ review.username }}
      <StarRating :value="review.rating" />
    </div>
  </div>
</template>

<script>
  import { getBottleReview } from '@/api/reviews'
  import StarRating from '../Reviews/StarRating.vue'
  import Review from '../../models/review'
  import { onMounted, ref, watch } from 'vue'
  export default {
    name: 'ReviewList',
    components: {
      StarRating,
    },
    props: {
      bottleId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const bottleId = toRefs(props)
      const reviews = ref([Review])
      const fetchReviews = async () => {
        reviews.value = await getBottleReview(bottleId.value)
      }

      onMounted(fetchReviews)

      watch(fetchReviews)

      return {
        reviews,
        fetchReviews,
      }
    },
  }
</script>
