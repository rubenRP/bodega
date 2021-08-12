<template>
  <tr class="text-gray-700 dark:text-gray-400 flex flex-wrap md:table-row">
    <td class="px-4 py-3 pb-0 md:pb-3 w-full">
      <div class="flex items-center text-sm">
        <div>
          <p class="font-semibold">{{ item.name }}</p>
          <p class="text-xs text-gray-600 dark:text-gray-400">
            {{ item.cellar }}
          </p>
        </div>
      </div>
    </td>
    <td class="px-4 py-3 text-sm w-1/3">{{ item.vintage }}</td>
    <td class="px-4 py-3 text-sm w-1/3 text-center md:text-left">
      {{ item.apellation }}
    </td>

    <td class="px-4 py-3 text-xs w-1/3 text-right md:text-center">
      <WineTag :type="item.type" />
    </td>
    <td class="px-4 py-3 pb-4 md:pb-3 text-sm w-1/2">
      <div class="h-8 w-24 md:m-auto">
        <QtySelector
          :qty="item.qty"
          v-on:incrementQty="increaseQty(item.id)"
          v-on:decrementQty="decreaseQty(item.id)"
        />
      </div>
    </td>
    <td class="px-4 py-3 pb-4 md:pb-3 w-1/2" v-if="actions">
      <div class="flex items-end md:items-center space-x-4 text-sm justify-end">
        <button
          class="
            flex
            items-center
            justify-between
            px-2
            py-2
            text-sm
            font-medium
            leading-5
            text-pink-900
            rounded-lg
            dark:text-gray-400
            focus:outline-none focus:shadow-outline-gray
          "
          @click="$emit('editItem', item)"
        >
          <PencilAltIcon class="w-5 h-5" />
        </button>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { PencilAltIcon } from '@heroicons/vue/solid'
  import QtySelector from '../QtySelector.vue'
  import WineTag from '../WineTag.vue'
  import { increaseBottleQty, decreaseBottleQty } from '@/api/bottles'

  export default defineComponent({
    name: 'TableItem',
    props: {
      item: <any>{},
      actions: {
        type: Boolean,
        default: true,
      },
    },
    components: {
      PencilAltIcon,
      QtySelector,
      WineTag,
    },
    computed: {},
    methods: {
      increaseQty(id: string) {
        increaseBottleQty(id, this.item.qty)
      },
      decreaseQty(id: string) {
        decreaseBottleQty(id, this.item.qty)
      },
    },
  })
</script>
