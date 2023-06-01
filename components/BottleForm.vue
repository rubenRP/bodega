<template>
  <ClientOnly>
    <Modal v-model="bottleFormVisible" :title="$t('cellar.addBottle')">
      <form id="bottleForm">
        <!-- Name -->
        <div class="form-floating mb-2">
          <input
            class="form-control"
            :class="{ 'is-invalid': v$.name.$error }"
            placeholder="{{ $t('cellar.name') }}"
            id="name"
            v-model="newBottle.name"
          />
          <label for="name">{{ $t("cellar.name") }}</label>
          <div class="invalid-feedback" v-if="v$.name.$error">
            {{ $t("forms.required") }}
          </div>
        </div>
        <!-- Cellar -->
        <div class="form-floating mb-2">
          <input
            class="form-control"
            :class="{ 'is-invalid': v$.cellar.$error }"
            placeholder="{{ $t('cellar.cellar') }}"
            id="cellar"
            v-model="newBottle.cellar"
          />
          <label for="cellar">{{ $t("cellar.cellar") }}</label>
          <div class="invalid-feedback" v-if="v$.cellar.$error">
            {{ $t("forms.required") }}
          </div>
        </div>
        <!-- Vintage-->
        <div class="form-floating mb-2">
          <input
            class="form-control"
            :class="{ 'is-invalid': v$.vintage.$error }"
            placeholder="{{ $t('cellar.vintage') }}"
            id="vintage"
            v-model="newBottle.vintage"
          />
          <label for="vintage">{{ $t("cellar.vintage") }}</label>
          <div class="invalid-feedback" v-if="v$.vintage.$error">
            {{ $t("forms.required") }}
          </div>
        </div>
        <!-- Country-->
        <div class="form-floating mb-2">
          <input
            class="form-control"
            :class="{ 'is-invalid': v$.country.$error }"
            placeholder="{{ $t('cellar.country') }}"
            id="country"
            v-model="newBottle.country"
          />
          <label for="country">{{ $t("cellar.country") }}</label>
          <div class="invalid-feedback" v-if="v$.country.$error">
            {{ $t("forms.required") }}
          </div>
        </div>
        <!-- Region-->
        <div class="form-floating mb-2">
          <input
            class="form-control"
            placeholder="{{ $t('cellar.region') }}"
            id="region"
            v-model="newBottle.region"
          />
          <label for="region">{{ $t("cellar.region") }}</label>
        </div>
        <!-- Apellation-->
        <div class="form-floating mb-4">
          <input
            class="form-control"
            placeholder="{{ $t('cellar.apellation') }}"
            id="apellation"
            v-model="newBottle.apellation"
          />
          <label for="apellation">{{ $t("cellar.apellation") }}</label>
        </div>
        <div class="row">
          <!-- Type -->
          <div class="col-8">
            <div class="form-floating mb-2">
              <select class="form-select" id="type" v-model="newBottle.type">
                <option value="Red" selected>{{ $t("cellar.red") }}</option>
                <option value="White">{{ $t("cellar.white") }}</option>
                <option value="Rose">{{ $t("cellar.rose") }}</option>
                <option value="Orange">{{ $t("cellar.orange") }}</option>
                <option value="Sparkling">{{ $t("cellar.sparkling") }}</option>
                <option value="Other">{{ $t("cellar.other") }}</option>
              </select>
              <label for="type">{{ $t("cellar.type") }}</label>
            </div>
          </div>
          <!-- Qty -->
          <div class="col-4">
            <div class="form-floating mb-2" v-if="showQty">
              <input
                type="number"
                class="form-control"
                :class="{ 'is-invalid': v$.qty.$error }"
                placeholder="{{ $t('general.qty') }}"
                id="qty"
                v-model="newBottle.qty"
              />
              <label for="qty">{{ $t("general.qty") }}</label>
              <div class="invalid-feedback" v-if="v$.qty.$error">
                {{ $t("forms.required") }}
              </div>
            </div>
          </div>
        </div>
      </form>
      <template #footer
        ><button @click="closeModal()" class="btn btn-secondary">
          {{ $t("general.cancel") }}
        </button>
        <button
          class="btn btn-primary"
          v-if="existingBottle"
          @click="updateBottle()"
        >
          {{ $t("general.update") }}
        </button>
        <button class="btn btn-primary" v-else @click="createBottle()">
          {{ $t("general.save") }}
        </button></template
      >
    </Modal>
  </ClientOnly>
</template>

<script setup lang="ts">
import { Bottle } from "~~/types/bottle";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { findBottle, addBottle } from "~~/api/bottles";
import { useGeneralStore } from "~~/stores/general";

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
  try {
    v$.value.$touch();
    if (v$.value.$invalid) {
      return;
    }
    const { data } = await findBottle(
      newBottle.value.name,
      newBottle.value.cellar,
      newBottle.value.vintage,
      ""
    );
    const bottleFinded = data![0];

    if (!bottleFinded) {
      let res;
      if (props.showQty && newBottle.value.qty! > 0) {
        res = await addBottle(newBottle.value, true);
      } else {
        res = await addBottle(newBottle.value, false);
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
