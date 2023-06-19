<template>
  HOLAHOLA
  <Modal v-on:closeModal="$emit('closeModalForm')">
    <template v-slot:header>{{ $t("cellar.addBottle") }}</template>
    <template v-slot:body>
      <form id="bottleForm">
        <label class="block text-sm">
          <span class="text-gray-700">{{ $t("cellar.name") }}</span>
          <input
            class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
            :class="v$.name.$error && 'border-red-600'"
            placeholder="Name"
            v-model="newBottle.name"
            @blur="v$.name.$touch()"
          />
          <span class="text-xs text-red-600" v-if="v$.name.$error">
            {{ $t("forms.required") }}
          </span>
        </label>

        <label class="block mt-4 text-sm">
          <span class="text-gray-700">{{ $t("cellar.cellar") }}</span>
          <input
            class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
            :class="v$.cellar.$error && 'border-red-600'"
            placeholder="Cellar"
            v-model="newBottle.cellar"
            @blur="v$.cellar.$touch()"
          />
          <span class="text-xs text-red-600" v-if="v$.cellar.$error">
            {{ $t("forms.required") }}
          </span>
        </label>
        <label class="block mt-4 text-sm">
          <span class="text-gray-700">{{ $t("cellar.vintage") }}</span>
          <input
            class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
            :class="v$.cellar.$error && 'border-red-600'"
            placeholder="Vintage"
            v-model="newBottle.vintage"
            @blur="v$.vintage.$touch()"
          />
          <span class="text-xs text-red-600" v-if="v$.vintage.$error">
            {{ $t("forms.required") }}
          </span>
        </label>
        <label class="block mt-4 text-sm">
          <span class="text-gray-700">{{ $t("cellar.country") }}</span>
          <input
            class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
            :class="v$.country.$error && 'border-red-600'"
            placeholder="Country"
            v-model="newBottle.country"
            @blur="v$.country.$touch()"
          />
          <span class="text-xs text-red-600" v-if="v$.country.$error">
            {{ $t("forms.required") }}
          </span>
        </label>
        <label class="block mt-4 text-sm">
          <span class="text-gray-700">{{ $t("cellar.region") }}</span>
          <input
            class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
            placeholder="Region"
            v-model="newBottle.region"
          />
        </label>
        <label class="block mt-4 text-sm">
          <span class="text-gray-700">{{ $t("cellar.apellation") }}</span>
          <input
            class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
            placeholder="Apellation"
            v-model="newBottle.apellation"
          />
        </label>
        <label class="block mt-4 text-sm">
          <span class="text-gray-700">{{ $t("cellar.type") }}</span>
          <select
            class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
            :class="v$.type.$error && 'border-red-600'"
            v-model="newBottle.type"
            @blur="v$.type.$touch()"
          >
            <option value="Red">{{ $t("cellar.red") }}</option>
            <option value="White">{{ $t("cellar.white") }}</option>
            <option value="Rose">{{ $t("cellar.rose") }}</option>
            <option value="Orange">{{ $t("cellar.orange") }}</option>
            <option value="Sparkling">{{ $t("cellar.sparkling") }}</option>
            <option value="Other">{{ $t("cellar.other") }}</option>
          </select>
          <span class="text-xs text-red-600" v-if="v$.type.$error">
            {{ $t("forms.required") }}
          </span>
        </label>
        <label class="block mt-4 mb-4 text-sm" v-if="showQty">
          <span class="text-gray-700">{{ $t("general.qty") }}</span>
          <div class="flex align-middle justify-between items-center">
            <div class="w-1/3">
              <input
                type="number"
                class="block w-full mt-1 text-sm focus:border-red-800 focus:outline-none focus:shadow-outline-purple border-gray-200 border rounded-md px-3 py-2"
                v-model="newBottle.qty"
              />
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
            {{ $t("cellar.existingBottle") }}
          </span>
        </div>
      </div>
    </template>
    <template v-slot:footer
      ><button
        @click="$emit('closeModalForm')"
        class="w-full px-5 py-3 text-sm font-medium leading-5 text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
      >
        {{ $t("general.cancel") }}
      </button>
      <button
        class="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-pink-900 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-pink-600 hover:bg-pink-700 focus:outline-none focus:shadow-outline-purple"
        v-if="existingBottle"
        @click="updateBottle()"
      >
        {{ $t("general.update") }}
      </button>
      <button
        class="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-pink-900 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-pink-600 hover:bg-pink-700 focus:outline-none focus:shadow-outline-purple"
        v-else
        @click="createBottle()"
      >
        {{ $t("general.save") }}
      </button></template
    >
  </Modal>
</template>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useGeneralStore } from "~~/stores/general";
import { Bottle } from "~~/types/bottle";

const store = useGeneralStore();

const props = defineProps({
  opened: Boolean,
  showQty: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["closeModalForm"]);
const bottleFormVisible = ref(false);
const newBottle = ref({
  name: "",
  cellar: "",
  vintage: 0,
  country: "",
  type: "Red",
  qty: 1,
}) as Ref<Bottle>;

const existingBottle = ref(false);
const rules = {
  name: { required },
  cellar: { required },
  qty: { required, min: 1 },
  vintage: { required, min: 1900, max: new Date().getFullYear() },
  country: { required },
  type: { required },
};

const v$ = useVuelidate(rules, newBottle as any);

watch(
  () => props.opened,
  (opened) => {
    if (opened) {
      bottleFormVisible.value = true;
    }
  }
);

const createBottle = async () => {
  const { findBottle, addBottle } = useBottles();
  try {
    v$.value.$touch();
    if (v$.value.$invalid) {
      return;
    }

    const { data } = await findBottle(newBottle.value);

    const bottleFinded = data![0];

    if (!bottleFinded) {
      if (props.showQty && newBottle.value.qty! > 0) {
        await addBottle(newBottle.value, true);
      } else {
        await addBottle(newBottle.value, false);
      }
      store.addMessage({
        type: "success",
        text: "Botella añadida correctamente",
      });
      clearForm();
      closeModal();
    } else {
      existingBottle.value = true;
      newBottle.value = bottleFinded as Bottle;
      console.log("Bottle already exists " + bottleFinded);
    }
  } catch (e: any) {
    console.log(e);
    store.addMessage({ type: "error", text: e.message });
  }
  closeModal();
};

const clearForm = () => {
  newBottle.value = <Bottle>{ qty: props.showQty ? 1 : 0 };
};

const closeModal = () => {
  bottleFormVisible.value = false;
  emit("closeModalForm");
};

function updateBottle() {
  console.log("updateBottle");
  console.log(newBottle);
  closeModal();
}
</script>
