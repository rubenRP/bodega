<template>
  <tr class="text-gray-700 flex flex-wrap md:table-row">
    <td class="px-4 py-3 pb-0 md:pb-3 w-full">
      <div class="flex items-center text-sm">
        <router-link class="cursor-pointer" :to="'/bottle/' + item.bottleId">
          <p class="font-semibold">{{ item.name }}</p>
          <p class="text-xs text-gray-600">
            {{ item.cellar }}
          </p>
        </router-link>
      </div>
    </td>
    <td class="px-4 py-3 text-sm w-1/3">{{ item.vintage }}</td>
    <td class="px-4 py-3 text-sm w-1/3 text-center md:text-left">
      {{ item.apellation }}
    </td>

    <td class="px-4 py-3 text-xs w-1/3 text-right md:text-center">
      <WineTag :type="item.type" />
    </td>
    <td class="px-4 md:pt-3 pb-4 md:pb-3 text-sm w-1/2 flex md:table-cell">
      <StarRating :value="item.rating" />
    </td>
    <td class="px-4 py-3 pb-4 md:pb-3 w-1/2" v-if="actions">
      <div class="flex items-end md:items-center space-x-4 text-sm justify-end">
        <button
          class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-pink-900 rounded-lg focus:outline-none focus:shadow-outline-gray"
          @click="$emit('editItem', item)"
        >
          <font-awesome-icon :icon="['fas', 'edit']" class="w-5 h-5" />
        </button>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import QtySelector from '../Bottle/QtySelector.vue'
  import WineTag from '../Bottle/WineTag.vue'
  import StarRating from './StarRating.vue'

  export default defineComponent({
    name: 'TableItem',
    props: {
      item: <any>{},
      actions: {
        type: Boolean,
        default: false,
      },
    },
    components: {
      QtySelector,
      WineTag,
      StarRating,
    },
  })
</script>
