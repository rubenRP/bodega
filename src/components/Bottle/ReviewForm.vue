<template>
  <label class="block mt-4 text-sm">
    <span class="text-gray-700 dark:text-gray-400">{{
      $t('reviews.rating')
    }}</span>
    <input
      class="
        block
        w-full
        mt-1
        text-sm
        dark:border-gray-600 dark:bg-gray-700
        focus:border-purple-400 focus:outline-none focus:shadow-outline-purple
        dark:text-gray-300 dark:focus:shadow-outline-gray
        border-gray-200 border
        rounded-md
        py-2
      "
      type="range"
      min="1"
      max="10"
      v-model="rating"
      required
    />
    <div
      class="
        text-gray-700
        dark:text-gray-400
        mt-4
        flex
        justify-between
        items-center
      "
    >
      <span
        class="
          block
          w-auto
          text-sm
          dark:border-gray-600 dark:bg-gray-700
          focus:border-purple-400 focus:outline-none focus:shadow-outline-purple
          dark:text-gray-300 dark:focus:shadow-outline-gray
          border-gray-200 border
          rounded-md
          px-3
          py-2
        "
        >{{ rating }}</span
      >
      <StarRating :value="rating" />
    </div>
  </label>
  <label class="block mt-4 mb-4 text-sm">
    <span class="text-gray-700 dark:text-gray-400">{{
      $t('reviews.comment')
    }}</span>
    <textarea
      class="
        block
        w-full
        mt-1
        text-sm
        dark:border-gray-600 dark:bg-gray-700
        focus:border-red-800 focus:outline-none focus:shadow-outline-purple
        dark:text-gray-300 dark:focus:shadow-outline-gray
        border-gray-200 border
        rounded-md
        px-3
        py-2
      "
      placeholder="Comment"
      v-model="comment"
    />
  </label>
  <button
    class="
      w-full
      px-5
      py-3
      text-sm
      font-medium
      leading-5
      text-white
      transition-colors
      duration-150
      bg-pink-900
      border border-transparent
      rounded-lg
      sm:w-auto sm:px-4 sm:py-2
      active:bg-pink-600
      hover:bg-pink-700
      focus:outline-none focus:shadow-outline-purple
    "
    @click="createReview()"
  >
    {{ $t('general.save') }}
  </button>
</template>

<script lang="ts">
  import { addReview } from '@/api/reviews'
  import StarRating from './StarRating.vue'
  import { ref, toRefs } from 'vue'
  import { useGetters } from 'vuex-composition-helpers'

  export default {
    name: 'ReviewForm',
    components: { StarRating },
    props: {
      bottleId: { type: Number, required: true },
    },
    setup(props) {
      const { user } = useGetters({ getUser: 'user/data' })
      const bottleId = toRefs(props)
      const rating = ref(0)
      const comment = ref('')
      const createReview = () => {
        try {
          addReview(bottleId.value, rating.value, comment.value, user.id)
        } catch (e) {
          console.error(e)
        }
      }

      return {
        bottleId,
        rating,
        comment,
        createReview,
      }
    },
  }
</script>
