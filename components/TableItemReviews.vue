<template>
  <tr class="bg-white">
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
    <td class="pe-3">
      <StarRating :value="item.rating" />
    </td>
  </tr>
</template>

<script setup lang="ts">
defineProps({
  item: <any>{},
});
</script>
