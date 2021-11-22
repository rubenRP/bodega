<template>
  <tr class="text-gray-700 dark:text-gray-400 flex flex-wrap md:table-row">
    <td class="px-4 py-3 pb-0 md:pb-3 w-full">
      <div class="flex items-center text-sm">
        <router-link class="cursor-pointer" :to="'/bottle/' + item.id">
          <p class="font-semibold">{{ item.name }}</p>
          <p class="text-xs text-gray-600 dark:text-gray-400">
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
    <td class="px-4 py-3 pb-4 md:pb-3 text-sm w-1/2">
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

<script lang="ts">
  import { defineComponent } from 'vue'
  import QtySelector from '../Bottle/QtySelector.vue'
  import WineTag from '../Bottle/WineTag.vue'
  import { mapActions } from 'vuex'

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
      QtySelector,
      WineTag,
    },
    computed: {},
    methods: {
      ...mapActions({
        decreaseBottleQty: 'bottles/decreaseBottleQty',
      }),
      decreaseQty(id: number) {
        this.decreaseBottleQty({ bottleId: id, qty: this.item.qty })
      },
    },
  })
</script>
