<template>
  <Modal v-on:closeModal="$emit('closeModalForm')">
    <template v-slot:header>{{ $t('reviews.addReview') }}</template>
    <template v-slot:body>
      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">{{
          $t('cellar.bottle')
        }}</span>
        <select
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
          v-model="cellarBottle"
        >
          <option selected value="0">Not in Cellar</option>
          <option
            v-for="bottle in getCellar"
            :key="bottle.id"
            :value="bottle.id"
          >
            {{ `${bottle.name} ${bottle.vintage} - ${bottle.cellar}` }}
          </option>
        </select>
      </label>

      <div v-if="newBottle">
        <label class="block mt-4 text-sm">
          <span class="text-gray-700 dark:text-gray-400">{{
            $t('cellar.name')
          }}</span>
          <input
            class="
              block
              w-full
              mt-1
              text-sm
              dark:border-gray-600 dark:bg-gray-700
              focus:border-red-800
              focus:outline-none
              focus:shadow-outline-purple
              dark:text-gray-300 dark:focus:shadow-outline-gray
              border-gray-200 border
              rounded-md
              px-3
              py-2
            "
            placeholder="Name"
            v-model="name"
            required
          />
        </label>
        <label class="block mt-4 text-sm">
          <span class="text-gray-700 dark:text-gray-400">{{
            $t('cellar.cellar')
          }}</span>
          <input
            class="
              block
              w-full
              mt-1
              text-sm
              dark:border-gray-600 dark:bg-gray-700
              focus:border-red-800
              focus:outline-none
              focus:shadow-outline-purple
              dark:text-gray-300 dark:focus:shadow-outline-gray
              border-gray-200 border
              rounded-md
              px-3
              py-2
            "
            placeholder="Cellar"
            v-model="cellar"
            required
          />
        </label>
        <label class="block mt-4 text-sm">
          <span class="text-gray-700 dark:text-gray-400">{{
            $t('cellar.vintage')
          }}</span>
          <input
            class="
              block
              w-full
              mt-1
              text-sm
              dark:border-gray-600 dark:bg-gray-700
              focus:border-red-800
              focus:outline-none
              focus:shadow-outline-purple
              dark:text-gray-300 dark:focus:shadow-outline-gray
              border-gray-200 border
              rounded-md
              px-3
              py-2
            "
            placeholder="Vintage"
            v-model="vintage"
            required
          />
        </label>
        <label class="block mt-4 text-sm">
          <span class="text-gray-700 dark:text-gray-400">{{
            $t('cellar.country')
          }}</span>
          <input
            class="
              block
              w-full
              mt-1
              text-sm
              dark:border-gray-600 dark:bg-gray-700
              focus:border-red-800
              focus:outline-none
              focus:shadow-outline-purple
              dark:text-gray-300 dark:focus:shadow-outline-gray
              border-gray-200 border
              rounded-md
              px-3
              py-2
            "
            placeholder="Country"
            v-model="country"
          />
        </label>
        <label class="block mt-4 text-sm">
          <span class="text-gray-700 dark:text-gray-400">{{
            $t('cellar.region')
          }}</span>
          <input
            class="
              block
              w-full
              mt-1
              text-sm
              dark:border-gray-600 dark:bg-gray-700
              focus:border-red-800
              focus:outline-none
              focus:shadow-outline-purple
              dark:text-gray-300 dark:focus:shadow-outline-gray
              border-gray-200 border
              rounded-md
              px-3
              py-2
            "
            placeholder="Region"
            v-model="region"
          />
        </label>
        <label class="block mt-4 text-sm">
          <span class="text-gray-700 dark:text-gray-400">{{
            $t('cellar.apellation')
          }}</span>
          <input
            class="
              block
              w-full
              mt-1
              text-sm
              dark:border-gray-600 dark:bg-gray-700
              focus:border-red-800
              focus:outline-none
              focus:shadow-outline-purple
              dark:text-gray-300 dark:focus:shadow-outline-gray
              border-gray-200 border
              rounded-md
              px-3
              py-2
            "
            placeholder="Apellation"
            v-model="apellation"
          />
        </label>
        <label class="block mt-4 text-sm">
          <span class="text-gray-700 dark:text-gray-400">{{
            $t('cellar.type')
          }}</span>
          <select
            class="
              block
              w-full
              mt-1
              text-sm
              dark:border-gray-600 dark:bg-gray-700
              focus:border-red-800
              focus:outline-none
              focus:shadow-outline-purple
              dark:text-gray-300 dark:focus:shadow-outline-gray
              border-gray-200 border
              rounded-md
              px-3
              py-2
            "
            v-model="type"
          >
            <option>Red</option>
            <option>White</option>
            <option>Rose</option>
            <option>Orange</option>
            <option>Frizzante</option>
            <option>Other</option>
          </select>
        </label>
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
              focus:border-purple-400
              focus:outline-none
              focus:shadow-outline-purple
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
    </template>
    <template v-slot:footer
      ><button
        @click="$emit('closeModalForm')"
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
  import Modal from '../Modal.vue'
  import { addReview } from '@/api/reviews'
  import { mapGetters } from 'vuex'
  import StarRating from './StarRating.vue'

  export default defineComponent({
    name: 'ReviewForm',
    components: { Modal, StarRating },
    props: {
      review: Object,
    },
    data() {
      return {
        name: '',
        cellar: '',
        vintage: '',
        country: '',
        region: '',
        apellation: '',
        type: '',
        qty: 0,
        cellarBottle: 0,
        newBottle: false,
        comment: this.review?.comment || '',
        rating: 0,
      }
    },
    computed: {
      ...mapGetters({
        getCellar: 'cellar/cellar',
        getUser: 'user/data',
      }),
    },
    methods: {
      async createReview() {
        try {
          await addReview(
            this.cellarBottle,
            this.rating,
            this.comment,
            this.getUser.id
          )
        } catch (e) {
          console.log(e)
        } finally {
          this.clearForm()
          this.$emit('closeModalForm')
        }
      },
      removeReview() {},
      clearForm() {
        this.name = ''
        this.cellar = ''
        this.vintage = ''
        this.country = ''
        this.region = ''
        this.apellation = ''
        this.type = ''
        this.qty = 0
        this.cellarBottle = 0
        this.rating = 0
        this.comment = ''
      },
    },
  })
</script>
