<template>
  <Modal v-on:closeModal="$emit('closeModalForm')">
    <template v-slot:header>{{
      bottle ? $t('cellar.editBottle') : $t('cellar.addBottle')
    }}</template>
    <template v-slot:body>
      <ProgressBar
        v-if="showProgressBar"
        :text="$t('reviews.step1')"
        :value="50"
      />
      <form id="bottleForm">
        <label class="block text-sm">
          <span class="text-gray-700">{{ $t('cellar.name') }}</span>
          <input
            class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
            :class="v$.newBottle.name.$error && 'border-red-600'"
            placeholder="Name"
            v-model="newBottle.name"
            @blur="v$.newBottle.name.$touch()"
          />
          <span class="text-xs text-red-600" v-if="v$.newBottle.name.$error">
            {{ $t('forms.required') }}
          </span>
        </label>

        <label class="block mt-4 text-sm">
          <span class="text-gray-700">{{ $t('cellar.cellar') }}</span>
          <input
            class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
            :class="v$.newBottle.cellar.$error && 'border-red-600'"
            placeholder="Cellar"
            v-model="newBottle.cellar"
            @blur="v$.newBottle.cellar.$touch()"
          />
          <span class="text-xs text-red-600" v-if="v$.newBottle.cellar.$error">
            {{ $t('forms.required') }}
          </span>
        </label>
        <label class="block mt-4 text-sm">
          <span class="text-gray-700">{{ $t('cellar.vintage') }}</span>
          <input
            class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
            :class="v$.newBottle.cellar.$error && 'border-red-600'"
            placeholder="Vintage"
            v-model="newBottle.vintage"
            @blur="v$.newBottle.vintage.$touch()"
          />
          <span class="text-xs text-red-600" v-if="v$.newBottle.vintage.$error">
            {{ $t('forms.required') }}
          </span>
        </label>
        <label class="block mt-4 text-sm">
          <span class="text-gray-700">{{ $t('cellar.country') }}</span>
          <input
            class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
            :class="v$.newBottle.country.$error && 'border-red-600'"
            placeholder="Country"
            v-model="newBottle.country"
            @blur="v$.newBottle.country.$touch()"
          />
          <span class="text-xs text-red-600" v-if="v$.newBottle.country.$error">
            {{ $t('forms.required') }}
          </span>
        </label>
        <label class="block mt-4 text-sm">
          <span class="text-gray-700">{{ $t('cellar.region') }}</span>
          <input
            class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
            placeholder="Region"
            v-model="newBottle.region"
          />
        </label>
        <label class="block mt-4 text-sm">
          <span class="text-gray-700">{{ $t('cellar.apellation') }}</span>
          <input
            class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
            placeholder="Apellation"
            v-model="newBottle.apellation"
          />
        </label>
        <label class="block mt-4 text-sm">
          <span class="text-gray-700">{{ $t('cellar.type') }}</span>
          <select
            class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
            :class="v$.newBottle.type.$error && 'border-red-600'"
            v-model="newBottle.type"
            @blur="v$.newBottle.type.$touch()"
          >
            <option value="Red">{{ $t('cellar.red') }}</option>
            <option value="White">{{ $t('cellar.white') }}</option>
            <option value="Rose">{{ $t('cellar.rose') }}</option>
            <option value="Orange">{{ $t('cellar.orange') }}</option>
            <option value="Frizzante">{{ $t('cellar.frizzante') }}</option>
            <option value="Other">{{ $t('cellar.other') }}</option>
          </select>
          <span class="text-xs text-red-600" v-if="v$.newBottle.type.$error">
            {{ $t('forms.required') }}
          </span>
        </label>
        <div v-if="bottle">
          <label class="block mt-4 text-sm">
            <span class="text-gray-700">{{ $t('cellar.alcoholContent') }}</span>
            <input
              class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
              placeholder="Alcohol Content"
              v-model="newBottle.alcohol_content"
            />
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700">{{ $t('cellar.climateSoil') }}</span>
            <input
              class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
              placeholder="Climate/Soil"
              v-model="newBottle.climate_soil"
            />
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700">{{ $t('cellar.aging') }}</span>
            <input
              class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
              placeholder="Aging"
              v-model="newBottle.aging"
            />
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700">{{ $t('cellar.consumption') }}</span>
            <input
              class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
              placeholder="Consumption"
              v-model="newBottle.consumption"
            />
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700">{{ $t('cellar.stayBarrel') }}</span>
            <input
              class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
              placeholder="Stay Barrel"
              v-model="newBottle.stay_barrel"
            />
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700">{{ $t('cellar.description') }}</span>
            <input
              type="text"
              class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
              placeholder="Description"
              v-model="newBottle.description"
            />
          </label>
        </div>
        <label class="block mt-4 mb-4 text-sm" v-if="showQty">
          <span class="text-gray-700">{{ $t('general.qty') }}</span>
          <div class="flex align-middle justify-between items-center">
            <div class="w-1/3">
              <input
                type="number"
                class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
                v-model="newBottle.qty"
              />
            </div>
            <div class="w-auto text-pink-900">
              <button @click="removeBottle()" v-if="bottle">
                {{ $t('cellar.removeBottle') }}
              </button>
            </div>
          </div>
        </label>
      </form>
      <div class="mx-auto w-full container mt-6" v-if="existingBottle">
        <div
          class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-orange-500"
        >
          <span class="text-xl inline-block mr-5 align-middle">
            <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
          </span>
          <span class="inline-block align-middle mr-8">
            {{ $t('cellar.existingBottle') }}
          </span>
        </div>
      </div>
    </template>
    <template v-slot:footer
      ><button
        @click="$emit('closeModalForm')"
        class="w-full px-5 py-3 text-sm font-medium leading-5 text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
      >
        {{ $t('general.cancel') }}
      </button>
      <button
        class="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-pink-900 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-pink-600 hover:bg-pink-700 focus:outline-none focus:shadow-outline-purple"
        v-if="bottle || existingBottle"
        @click="updateBottle()"
      >
        {{ $t('general.update') }}
      </button>
      <button
        class="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-pink-900 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-pink-600 hover:bg-pink-700 focus:outline-none focus:shadow-outline-purple"
        v-else
        @click="createBottle()"
      >
        {{ $t('general.save') }}
      </button></template
    >
  </Modal>
</template>

<script lang="ts">
  import {
    addBottle,
    findBottle,
    removeBottle,
    updateBottle,
  } from '@/api/bottles'
  import { Bottle } from '@/models/cellar'
  import { useGeneralStore } from '@/stores/general'
  import { useVuelidate } from '@vuelidate/core'
  import { required } from '@vuelidate/validators'
  import { mapActions } from 'pinia'
  import { defineComponent } from 'vue'
  import QtySelector from '../Bottle/QtySelector.vue'
  import Modal from '../General/Modal.vue'
  import ProgressBar from '../General/ProgressBar.vue'

  export default defineComponent({
    name: 'BottleForm',
    components: { Modal, QtySelector, ProgressBar },
    props: {
      bottle: {
        type: Object,
        required: false,
      },
      showQty: {
        type: Boolean,
        default: true,
      },
      showProgressBar: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        v$: useVuelidate(),
        newBottle: <Bottle>this.bottle || <Bottle>{ qty: this.showQty ? 1 : 0 },
        progress: 50,
        existingBottle: false,
      }
    },
    validations() {
      return {
        newBottle: {
          name: { required },
          cellar: { required },
          qty: { required },
          vintage: { required },
          country: { required },
          type: { required },
        },
      }
    },
    methods: {
      ...mapActions(useGeneralStore, ['addMessage']),
      async createBottle() {
        this.v$.$validate()
        if (this.v$.$error) return
        try {
          const { data } = await findBottle(
            this.newBottle.name,
            this.newBottle.cellar,
            this.newBottle.vintage,
            this.newBottle.type
          )

          const bottleFinded = data![0]

          if (!bottleFinded) {
            let res
            if (this.showQty || this.newBottle.qty! > 0) {
              res = await addBottle(this.newBottle, true)
            } else {
              res = await addBottle(this.newBottle, false)
            }
            this.addMessage({
              type: 'success',
              text: this.$t('cellar.success'),
            })
            this.clearForm()
            await this.$emit('bottleAdded', res)
            this.$emit('closeModalForm')
          } else {
            this.existingBottle = true
            this.newBottle = bottleFinded
            this.$emit('bottleFounded', bottleFinded)
            console.log('Bottle already exists ' + bottleFinded)
          }
        } catch (e: any) {
          console.log(e)
          this.addMessage({
            type: 'error',
            text: e.message,
          })
        }
      },
      async updateBottle() {
        try {
          await updateBottle(this.newBottle.id!, this.newBottle)
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
        this.newBottle = <Bottle>{ qty: 1 }
      },
      increaseFormQty(qty: number) {
        this.newBottle.qty = qty
      },
      decreaseFormQty(qty: number) {
        this.newBottle.qty = qty
      },
    },
  })
</script>
