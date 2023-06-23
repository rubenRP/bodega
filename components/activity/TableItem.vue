<template>
  <tr class="text-gray-700 flex flex-wrap md:table-row">
    <td class="px-4 py-3">
      <span
        class="w-8 h-8 flex items-center justify-center rounded-full bg-green-200 text-slate-600"
        v-if="item.action === 'bottle_added'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          focusable="false"
          class="fill-current"
        >
          <path
            d="M9.317 0c1.228 0 2.223.895 2.223 2v3c1.227 0 2.222.895 2.222 2v1.005a5.47 5.47 0 00-2.223.575V7H9.318V2h-1.11v5H5.983v11h4.853a5.47 5.47 0 002.642.976C13.1 19.586 12.374 20 11.54 20H5.985c-1.227 0-2.222-.895-2.222-2V7c0-1.105.995-2 2.222-2V2c0-1.105.995-2 2.222-2h1.111zM14 9.5a1 1 0 01.993.883L15 10.5v2h2a1 1 0 01.117 1.993L17 14.5h-2v2a1 1 0 01-1.993.117L13 16.5v-2h-2a1 1 0 01-.117-1.993L11 12.5h2v-2a1 1 0 011-1z"
          ></path>
        </svg>
      </span>
      <span
        class="w-8 h-8 flex items-center justify-center rounded-full bg-red-200 text-slate-600"
        v-else-if="item.action === 'bottle_opened'"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          focusable="false"
          class="fill-current"
        >
          <path
            d="M14 1a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V3a2 2 0 012-2h8zm0 2H6v2h3a1 1 0 01.117 1.993L9 7H6v6h3a1 1 0 01.117 1.993L9 15H6v2h8v-6h-2a1 1 0 01-.117-1.993L12 9h2V3zm-2 10a1 1 0 110 2 1 1 0 010-2zM8 9a1 1 0 110 2 1 1 0 010-2zm4-4a1 1 0 110 2 1 1 0 010-2z"
          ></path>
          <circle cx="12" cy="6" r="1"></circle>
          <circle cx="12" cy="14" r="1"></circle>
          <circle cx="8" cy="10" r="1"></circle>
        </svg>
      </span>
    </td>
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
    <td class="px-4 py-3 text-xs w-1/3 text-right md:text-center">
      {{ new Date(item.date_used).toLocaleDateString() }}
    </td>
  </tr>
</template>

<script setup lang="ts">
defineProps({
  item: <any>{},
});
</script>
