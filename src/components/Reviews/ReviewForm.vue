<template>
  <BottleForm
    :showQty="false"
    showProgressBar
    v-if="step == 1"
    v-on:bottleFounded="setBottle"
    v-on:bottleAdded="setBottle"
    v-on:closeModalForm="closeModalForm"
  />
  <Modal v-else v-on:closeModal="$emit('closeReviewForm')">
    <template v-slot:header>{{ $t('reviews.addReview') }}</template>
    <template v-slot:body>
      <ProgressBar :text="$t('reviews.step2')" :value="90" />
      <div class="my-4">
        <div class="font-semibold">{{ bottle.name }} {{ bottle.vintage }}</div>
        <div class="text-xs text-gray-600">{{ bottle.cellar }}</div>
      </div>
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
            focus:border-purple-400
            focus:outline-none
            focus:shadow-outline-purple
            dark:text-gray-300 dark:focus:shadow-outline-gray
            border-gray-200 border
            rounded-md
            py-2
          "
          type="range"
          min="1"
          max="10"
          v-model="newReview.rating"
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
              focus:border-purple-400
              focus:outline-none
              focus:shadow-outline-purple
              dark:text-gray-300 dark:focus:shadow-outline-gray
              border-gray-200 border
              rounded-md
              px-3
              py-2
            "
            >{{ newReview.rating }}</span
          >
          <StarRating :value="newReview.rating" />
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
          v-model="newReview.comment"
        />
      </label>
    </template>
    <template v-slot:footer
      ><button
        @click="$emit('closeReviewForm')"
        class="
          w-full
          px-5
          py-3
          text-sm
          font-medium
          leading-5
          text-gray-700
          transition-colors
          duration-150
          border border-gray-300
          rounded-lg
          dark:text-gray-400
          sm:px-4 sm:py-2 sm:w-auto
          active:bg-transparent
          hover:border-gray-500
          focus:border-gray-500
          active:text-gray-500
          focus:outline-none focus:shadow-outline-gray
        "
      >
        {{ $t('general.cancel') }}
      </button>
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
        v-if="review"
      >
        {{ $t('general.update') }}
      </button>
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
        v-else
        @click="createReview()"
      >
        {{ $t('general.save') }}
      </button></template
    >
  </Modal>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Modal from '../General/Modal.vue'
  import { addReview } from '@/api/reviews'
  import { mapActions, mapGetters } from 'vuex'
  import StarRating from './StarRating.vue'
  import BottleForm from '../Cellar/BottleForm.vue'
  import { Review } from '@/models/review'
  import { Bottle } from '@/models/cellar'
  import ProgressBar from '../General/ProgressBar.vue'

  export default defineComponent({
    name: 'ReviewForm',
    components: { Modal, StarRating, BottleForm, ProgressBar },
    props: {
      review: {
        type: Object,
        required: false,
      },
    },
    data() {
      return {
        newReview: <Review>this.review || <Review>{ rating: 0 },
        bottle: <Bottle>{},
        step: 1,
      }
    },
    computed: {
      ...mapGetters({
        getUser: 'user/data',
      }),
    },
    methods: {
      ...mapActions({
        addMessage: 'general/addMessage',
      }),
      async createReview() {
        try {
          await addReview(
            this.bottle.id!,
            this.newReview.rating,
            this.getUser.id,
            this.newReview.comment
          )
        } catch (e) {
          console.log(e)
        } finally {
          this.clearForm()
          this.$emit('closeReviewForm')
          this.addMessage({
            type: 'success',
            text: this.$t('reviews.success'),
          })
        }
      },
      clearForm() {
        this.newReview = <Review>{}
      },
      setBottle(bottle: Bottle) {
        this.bottle = bottle
        this.step++
      },
      closeModalForm() {},
    },
  })
</script>
