<template>
  <tr
    class="text-gray-700 flex flex-wrap md:table-row"
    :class="!item.qty && 'bg-gray-100'"
  >
    <td class="px-4 py-3 pb-0 md:pb-3 w-full">
      <div class="flex items-center text-sm">
        <NuxtLink class="cursor-pointer" :to="'/bottle/' + item.id">
          <p class="font-semibold">{{ item.name }}</p>
          <p class="text-xs text-gray-600">
            {{ item.cellar }}
          </p>
        </NuxtLink>
      </div>
    </td>
    <td class="px-4 py-3 text-sm w-1/3">{{ item.vintage }}</td>
    <td class="px-4 py-3 text-sm w-1/3 text-center md:text-left">
      {{ item.apellation }}
    </td>

    <td class="px-4 py-3 text-xs w-1/3 text-right md:text-center">
      <WineTag :type="item.type" />
    </td>
    <td class="px-4 md:pt-3 pb-4 md:pb-3 text-sm w-1/2" v-if="actions">
      <div class="h-8 w-24 md:m-auto">
        <QtySelector
          :qty="item.qty"
          v-on:decrementQty="decreaseQty(item.id)"
          quick
        />
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { useBottlesStore } from "~~/stores/bottles";
import QtySelector from "./QtySelector.vue";

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
