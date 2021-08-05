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
    <td class="px-4 py-3 text-sm w-1/3">{{ item.apellation }}</td>

    <td class="px-4 py-3 text-xs w-1/3 text-right md:text-center">
      <span
        class="px-2 py-1 font-semibold leading-tight rounded-full"
        :class="getTypeColor"
      >
        {{ $t(getTypeTranslated) }}
      </span>
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
    <td class="px-4 py-3 pb-4 md:pb-3 w-1/2">
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
  import api from '../../api'

  export default defineComponent({
    name: 'TableItem',
    props: {
      item: <any>{},
    },
    components: {
      PencilAltIcon,
      QtySelector,
    },
    computed: {
      getTypeColor(): string {
        switch (this.item.type) {
          case 'Red':
            return 'text-red-700 bg-red-100'
          case 'White':
            return 'text-green-700 bg-green-100'
          case 'Rose':
            return 'text-pink-700 bg-pink-100'
          default:
            return 'text-yellow-700 bg-yellow-100'
        }
      },
      getTypeTranslated(): string {
        switch (this.item.type) {
          case 'Red':
            return 'cellar.red'
          case 'White':
            return 'cellar.white'
          case 'Rose':
            return 'cellar.rose'
        }
        return this.item.type
      },
    },
    methods: {
      increaseQty(id: string) {
        api.increaseBottleQty(id, this.item.qty)
      },
      decreaseQty(id: string) {
        api.decreaseBottleQty(id, this.item.qty)
      },
    },
  })
</script>
