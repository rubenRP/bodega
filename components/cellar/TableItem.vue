<template>
  <tr class="bg-white" :class="!item.qty && 'table-secondary'">
    <th scope="row" class="ps-3">
      <div class="">
        <NuxtLink :to="'/bottle/' + item.id">
          <h5 class="mb-1">{{ item.name }}</h5>
          <span class="fw-light">
            {{ item.cellar }}
          </span>
        </NuxtLink>
      </div>
    </th>
    <td>{{ item.vintage }}</td>
    <td>
      {{ item.apellation }}
    </td>

    <td>
      <WineTag :type="item.type" />
    </td>
    <td v-if="actions" class="pe-3">
      <div>
        <CellarQtySelector
          :qty="item.qty"
          v-on:decrementQty="decreaseQty(item.id)"
          quick
          :actions="actions"
        />
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { useBottlesStore } from "~~/stores/bottles";

const props = defineProps({
  item: <any>{},
  actions: {
    type: Boolean,
    default: true,
    required: false,
  },
  markInCellar: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const store = useBottlesStore();

const decreaseQty = (id: number) => {
  store.decreaseBottleQty({ bottleId: id, qty: props.item.qty });
};
</script>
