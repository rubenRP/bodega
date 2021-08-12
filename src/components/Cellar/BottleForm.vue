<template>
  <Modal v-on:closeModal="$emit('closeModalForm')">
    <template v-slot:header>{{ $t('cellar.addBottle') }}</template>
    <template v-slot:body>
      <label class="block text-sm">
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
            focus:border-red-800 focus:outline-none focus:shadow-outline-purple
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
            focus:border-red-800 focus:outline-none focus:shadow-outline-purple
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
            focus:border-red-800 focus:outline-none focus:shadow-outline-purple
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
            focus:border-red-800 focus:outline-none focus:shadow-outline-purple
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
            focus:border-red-800 focus:outline-none focus:shadow-outline-purple
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
            focus:border-red-800 focus:outline-none focus:shadow-outline-purple
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
            focus:border-red-800 focus:outline-none focus:shadow-outline-purple
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
      <label class="block mt-4 text-sm hidden">
        <span class="text-gray-700 dark:text-gray-400">{{
          $t('cellar.dateAdded')
        }}</span>
        <input
          type="date"
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
          v-model="date"
        />
      </label>
      <label class="block mt-4 mb-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">{{
          $t('general.qty')
        }}</span>
        <div class="flex align-middle justify-between items-center">
          <div class="w-1/3">
            <QtySelector
              :qty="qty"
              v-on:incrementQty="increaseQty"
              v-on:decrementQty="decreaseQty"
            />
          </div>
          <div class="w-auto text-pink-900">
            <button @click="removeBottle()" v-if="bottle">
              {{ $t('cellar.removeBottle') }}
            </button>
          </div>
        </div>
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
        v-if="bottle"
        @click="updateBottle()"
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
        @click="createBottle()"
      >
        {{ $t('general.save') }}
      </button></template
    >
  </Modal>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Modal from '../Modal.vue'
  import QtySelector from '../QtySelector.vue'
  import { addBottle, updateBottle, removeBottle } from '@/api/bottles'

  export default defineComponent({
    name: 'BottleForm',
    components: { Modal, QtySelector },
    props: {
      bottle: Object,
    },
    data() {
      return {
        name: this.bottle?.name || '',
        cellar: this.bottle?.cellar || '',
        vintage: this.bottle?.vintage || '',
        country: this.bottle?.country || '',
        region: this.bottle?.region || '',
        apellation: this.bottle?.apellation || '',
        type: this.bottle?.type || '',
        qty: this.bottle?.qty || 1,
        date: this.bottle?.['last_added'] || '',
      }
    },
    methods: {
      async createBottle() {
        try {
          await addBottle(
            this.name,
            this.cellar,
            this.vintage,
            this.country,
            this.region,
            this.apellation,
            this.type,
            this.qty,
            this.date
          )
        } catch (e) {
          console.log(e)
        } finally {
          this.clearForm()
          this.$emit('closeModalForm')
        }
      },
      async updateBottle() {
        try {
          await updateBottle(
            this.name,
            this.cellar,
            this.vintage,
            this.country,
            this.region,
            this.apellation,
            this.type,
            this.qty,
            this.bottle?.id,
            this.date
          )
        } catch (e) {
          console.log(e)
        } finally {
          this.clearForm()
          this.$emit('closeModalForm')
        }
      },
      removeBottle() {
        removeBottle(this.bottle?.id)
      },
      clearForm() {
        this.name = ''
        this.cellar = ''
        this.vintage = ''
        this.country = ''
        this.region = ''
        this.apellation = ''
        this.type = ''
        this.qty = 1
      },
      increaseQty(qty: number) {
        this.qty = qty
      },
      decreaseQty(qty: number) {
        this.qty = qty
      },
    },
  })
</script>
