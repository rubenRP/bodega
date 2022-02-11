<template>
  <h4 class="font-semibold text-md text-slate-700 mt-12 lg:mt-0">
    {{ $t('reviews.addReview') }}
  </h4>
  <div class="">
    <label class="block mt-4 text-sm">
      <span class="text-gray-700">{{ $t('reviews.rating') }}</span>
      <input
        class="block w-full mt-1 text-sm focus:border-purple-400 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md py-2"
        type="range"
        min="1"
        max="10"
        v-model="rating"
        required
      />
      <div class="text-gray-700 mt-4 flex justify-between items-center">
        <span
          class="block w-auto text-sm focus:border-purple-400 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
          >{{ rating }}</span
        >
        <StarRating :value="rating" />
      </div>
    </label>

    <label class="block mt-4 mb-4 text-sm">
      <span class="text-gray-700">{{ $t('reviews.comment') }}</span>
      <textarea
        class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
        placeholder="Comment"
        v-model="comment"
      />
    </label>
    <div class="flex justify-end">
      <button
        class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-pink-900 bg-pink-900 hover:bg-transparent hover:text-pink-800 mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        @click="createReview()"
      >
        {{ $t('general.save') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import StarRating from '@/components/Reviews/StarRating.vue'
  import { addReview } from '@/api/reviews'
  import { mapGetters } from 'vuex'
  export default defineComponent({
    name: 'ReviewForm',
    components: {
      StarRating,
    },
    props: {
      bottleId: Number,
    },
    data() {
      return {
        comment: '',
        rating: 0,
      }
    },
    computed: {
      ...mapGetters({
        getUser: 'user/data',
      }),
    },
    methods: {
      async createReview() {
        try {
          if (this.rating > 0) {
            await addReview(
              this.bottleId!,
              this.rating,
              this.getUser.id,
              this.comment
            )
          }
        } catch (e) {
          console.log(e)
        } finally {
          this.clearForm()
        }
      },
      clearForm() {
        this.rating = 0
        this.comment = ''
      },
    },
  })
</script>
