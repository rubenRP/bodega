<template>
  <h2
    class="mt-6 text-2xl font-semibold text-gray-700 items-center justify-between pb-6 md:pb-2 flex md:hidden"
  >
    <span
      >{{ bottle?.name }}
      <p class="text-sm text-gray-500 hidden md:block">
        {{ bottle?.cellar }}
      </p>
    </span>
  </h2>
  <div class="grid gap-6 mb-6 md:my-6 md:grid-cols-3">
    <div class="min-w-0 p-4 bg-white shadow-lg rounded">
      <img
        aria-hidden="true"
        class="w-auto max-h-80 m-auto"
        :src="bottle.image"
        v-if="bottle?.image"
      />
      <img
        aria-hidden="true"
        class="w-auto max-h-80 m-auto"
        src="@/assets/img/bottle-empty.jpg"
        v-else
      />
    </div>
    <div
      class="min-w-0 p-6 bg-white shadow-lg rounded md:col-span-2 flex flex-col justify-between"
    >
      <h2
        class="mb-4 text-2xl font-semibold text-gray-700 items-center justify-between pb-4 border-b-2 flex md:flex"
      >
        <span
          >{{ bottle?.name }}
          <p class="text-sm text-gray-500 hidden md:block">
            {{ bottle?.cellar }}
          </p>
        </span>
      </h2>
      <div class="md:hidden">
        <p class="text-gray-500">
          {{ bottle?.cellar }}
        </p>
      </div>
      <div class="mb-4">
        <div class="text-md text-gray-500">
          <span v-if="bottle?.apellation">{{ bottle?.apellation }} - </span
          ><span class="font-bold">{{ bottle?.vintage }}</span>
        </div>
        <p class="text-sm text-gray-500 mt-4">
          {{ bottle?.grapes?.join(", ") }}
        </p>
        <div class="text-xs mt-6">
          <WineTag :type="bottle?.type" />
        </div>

        <div class="mt-6">
          <span
            class="p-2 w-10 h-10 border-pink-900 text-gray-800 rounded-md flex items-center justify-center border"
          >
            {{ bottle?.qty }}
          </span>
        </div>
      </div>

      <div class="flex justify-between items-center pt-4 border-t-2">
        <div class="flex">
          <button
            class=""
            type="button"
            @click="toggleEditBottle()"
            v-if="isAdmin"
          >
            <span
              class="p-2 w-10 h-10 bg-pink-100 hover:bg-pink-900 text-gray-600 hover:text-white transition-all rounded-md flex items-center justify-center m-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                class="fill-current"
              >
                <path
                  d="M16.51 1.16L19.34 4a2 2 0 010 2.83l-10.6 10.6a2 2 0 01-.37.3l.02.01-.16.06c-.14.07-.29.13-.44.16l-3.84 1.42a2 2 0 01-2.62-2.42l1.3-4.59.03.02a2 2 0 01.42-.61l10.6-10.6a2 2 0 012.83 0zM3.67 16.06l-.41 1.43 1.4-.51-1-.92zm8.96-11.02l-8.14 8.14 2.83 2.83 8.14-8.14-2.83-2.83zm2.47-2.46l-1.06 1.05 2.83 2.83 1.05-1.06-2.82-2.82z"
                ></path>
              </svg>
            </span>
            <span class="mt-3 text-xs">Edit</span>
          </button>
          <button
            class="ml-4"
            type="button"
            @click="toggleEditBottle()"
            v-if="isAdmin"
          >
            <span
              class="p-2 w-10 h-10 bg-pink-100 hover:bg-pink-900 text-gray-600 hover:text-white transition-all rounded-md flex items-center justify-center m-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                class="fill-current"
              >
                <path
                  d="M16.625,1 C17.9366763,1 19,2.00735931 19,3.25 L19,3.25 L19.0009752,11.500811 C18.485361,10.8140699 17.7970599,10.2644049 17.0005324,9.91627634 L17,6.72 L11.5683958,9.53363561 C11.8787783,9.72974764 12.2010832,9.93461394 12.5356328,10.1483794 C11.9225066,10.4964379 11.390024,10.9703902 10.9735012,11.5351089 C7.36965551,9.25212309 5.12210955,7.9626603 4.88962842,7.9626603 L4.65576095,8.12481111 C4.55165957,8.19941242 4.41729931,8.3014151 4.26167022,8.43419821 C3.79406338,8.83316144 3.21509447,9.43266289 2.53276052,10.2281591 L2,10.859 L2,17 L10.6696616,17.0012971 C11.1692205,17.864288 11.9193504,18.5641124 12.8205484,19.0012675 L2.375,19 C1.06332372,19 0,17.9926407 0,16.75 L0,16.75 L0,3.25 C0,2.00735931 1.06332372,1 2.375,1 L2.375,1 Z M15,11 C15.4487314,11 15.8185688,11.3377852 15.8691132,11.7729565 L15.875,11.875 L15.875,13.625 L17.625,13.625 C18.1082492,13.625 18.5,14.0167508 18.5,14.5 C18.5,14.9487314 18.1622148,15.3185688 17.7270435,15.3691132 L17.625,15.375 L15.875,15.375 L15.875,17.125 C15.875,17.6082492 15.4832492,18 15,18 C14.5512686,18 14.1814312,17.6622148 14.1308868,17.2270435 L14.125,17.125 L14.125,15.375 L12.375,15.375 C11.8917508,15.375 11.5,14.9832492 11.5,14.5 C11.5,14.0512686 11.8377852,13.6814312 12.2729565,13.6308868 L12.375,13.625 L14.125,13.625 L14.125,11.875 C14.125,11.3917508 14.5167508,11 15,11 Z M17,3 L2,3 L2.00088142,7.77594251 C3.16397552,6.58028446 4.06152092,6 4.88962842,6 C5.50631387,6 6.88443503,6.66963101 9.32918035,8.14609891 L17,4.17 L17,3 Z"
                ></path>
              </svg>
            </span>
            <span class="mt-3 text-xs">Scrape</span>
          </button>
          <button class="ml-4" type="button" @click="decreaseQty(bottle?.id!)">
            <span
              class="p-2 w-10 h-10 bg-pink-100 hover:bg-pink-900 text-gray-600 hover:text-white transition-all rounded-md flex items-center justify-center m-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                class="fill-current"
              >
                <path
                  d="M9.56 0c1.22 0 2.22.9 2.22 2v3C13 5 14 5.9 14 7v1c-.8 0-1.54.17-2.22.47V7H9.56V2H8.44v5H6.22v11h4.62c.82.58 1.8.94 2.87 1-.39.6-1.1 1-1.93 1H6.22C5 20 4 19.1 4 18V7c0-1.1 1-2 2.22-2V2c0-1.1 1-2 2.22-2h1.12zm7.06 12.5c.49 0 .88.45.88 1 0 .51-.34.94-.77 1h-5.35c-.49 0-.88-.45-.88-1 0-.51.34-.94.77-1H16.63z"
                ></path>
              </svg>
            </span>
            <span class="mt-3 text-xs">Decrease</span>
          </button>
          <button class="ml-4" type="button" @click="increaseQty(bottle?.id!)">
            <span
              class="p-2 w-10 h-10 bg-pink-100 hover:bg-pink-900 text-gray-600 hover:text-white transition-all rounded-md flex items-center justify-center m-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                class="fill-current"
              >
                <path
                  d="M10 1a1 1 0 0 1 1 1v7h7a1 1 0 0 1 1 .88V10a1 1 0 0 1-1 1h-7v7a1 1 0 0 1-.88 1H10a1 1 0 0 1-1-1v-7H2a1 1 0 0 1-1-.88V10a1 1 0 0 1 1-1h7V2a1 1 0 0 1 .88-1Z"
                ></path>
              </svg>
            </span>
            <span class="mt-3 text-xs">Increase</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <BottleEditor
    v-if="editBottle && isAdmin"
    v-on:updateBottle="updateBottle"
    v-on:cancelEdit="toggleEditBottle"
    :bottle="bottle || {}"
  />

  <div
    v-if="bottle?.description"
    class="min-w-0 p-4 bg-white shadow-lg rounded"
  >
    <p class="text-gray-600 text-sm">
      {{ bottle?.description }}
    </p>
  </div>

  <div class="grid gap-6 mb-6 md:my-6 md:grid-cols-3">
    <div class="">
      <h2
        class="my-4 mt-12 text-xl font-semibold flex items-center justify-between"
      >
        <span>{{ $t("cellar.details") }}</span>
      </h2>

      <div class="min-w-0 p-4 mt-4 bg-white shadow-lg rounded">
        <table class="w-full whitespace-no-wrap">
          <tbody class="bg-white divide-y">
            <tr class="text-gray-700 border-b" v-if="bottle?.type">
              <td class="pr-4 py-3 flex align-middle">
                <span class="mr-2 text-pink-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    class="fill-current w-4"
                  >
                    <path
                      d="M9 13c-3.1 0-5.5-3.03-5.5-6.66V1h13v5.34C16.5 9.97 14.1 13 11 13v5h2a1 1 0 010 2H7a1 1 0 010-2h2zm5.5-10h-9v3.34c0 2.54 1.53 4.54 3.33 4.65L9 11h2c1.88 0 3.5-2.04 3.5-4.66V3z"
                    ></path>
                  </svg>
                </span>
                <div class="flex items-center text-sm font-semibold">
                  {{ $t("cellar.type") }}
                </div>
              </td>
              <td class="px-4 py-3 text-sm">
                {{ $t(`cellar.${bottle?.type.toLowerCase()}`) }}
              </td>
            </tr>
            <tr class="text-gray-700 border-b" v-if="bottle?.grapes">
              <td class="pr-4 py-3 flex align-middle">
                <span class="mr-2 text-pink-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    class="fill-current w-4"
                  >
                    <path
                      d="M15.047 9.803a3.5 3.5 0 01-6.122 3.394l1.364-4.758a3.5 3.5 0 014.758 1.364zm-3.788.385a1.5 1.5 0 101.454 2.624 1.5 1.5 0 00-1.454-2.624zM6.5 1a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm0 2a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-2.474.248L3.493 6.61l.218-1.463c-.819-.13-1.584.505-1.714 1.323-.122.77.412 1.275 1.157 1.44l.129.024-.012.073a3.5 3.5 0 011.016.083A3.519 3.519 0 017.5 6a3.5 3.5 0 012.851 5.53 3.5 3.5 0 01-3.521 6.046A3.5 3.5 0 111.05 14a3.496 3.496 0 01-.11-4.886 3.5 3.5 0 013.086-5.865zM3.506 15H3.49 3.5a1.5 1.5 0 10.006 0zM8.5 13a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-5.562-2.89l-.007.051-.077-.015a1.5 1.5 0 102.094 1.746 3.473 3.473 0 01-.896-1.785 1.493 1.493 0 00-1.115.002zM7.5 8a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm7.745-8.205l.039.167.551.146c1.83.48 3.033 1.153 3.587 2.137.51.906.67 2.489.568 4.873l-.06 1.418-1.315-.534c-.988-.402-2.065-1.024-3.237-1.865-1.242-.89-1.608-2.274-1.199-4.01a7.72 7.72 0 00-2.906 1.626 3.5 3.5 0 012.111 5.65l-1.555-1.259.091-.123A1.5 1.5 0 009.6 6.142l-.102.114-1.554-1.258c.315-.389.696-.693 1.115-.908l-.472-.44.682-.732C10.625 1.465 12.3.498 14.272.028l.973-.233zM3.493 6.61l-.196 1.327-.014-.003.21-1.324zm12.7-4.303l-.057.208c-.262 1.012-.095 1.636.407 1.997.518.37 1.008.691 1.472.96-.023-1.144-.145-1.908-.336-2.245-.155-.276-.581-.572-1.286-.846l-.2-.074z"
                    ></path>
                  </svg>
                </span>
                <div class="flex items-center text-sm font-semibold">
                  {{ $t("cellar.grapes") }}
                </div>
              </td>
              <td class="px-4 py-3 text-sm">
                {{ bottle?.grapes.join(", ") }}
              </td>
            </tr>

            <tr class="text-gray-700 border-b" v-if="bottle?.alcohol_content">
              <td class="pr-4 py-3 flex align-middle">
                <span class="mr-2 text-pink-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    class="fill-current w-4"
                  >
                    <path
                      d="M14.5 10c2.49 0 4.5 2.24 4.5 5s-2.01 5-4.5 5-4.5-2.24-4.5-5 2.01-5 4.5-5Zm1.97-9a.55.55 0 0 1 .45.87L4.94 18.58a1 1 0 0 1-.8.42h-.6a.56.56 0 0 1-.45-.9l12-16.68a1 1 0 0 1 .82-.42h.56ZM14.5 12c-1.33 0-2.5 1.3-2.5 3s1.17 3 2.5 3 2.5-1.3 2.5-3-1.17-3-2.5-3Zm-9-12C7.99 0 10 2.24 10 5s-2.01 5-4.5 5S1 7.76 1 5s2.01-5 4.5-5Zm0 2C4.17 2 3 3.3 3 5s1.17 3 2.5 3S8 6.7 8 5 6.83 2 5.5 2Z"
                    ></path>
                  </svg>
                </span>
                <div class="flex items-center text-sm font-semibold">
                  {{ $t("cellar.alcoholContent") }}
                </div>
              </td>
              <td class="px-4 py-3 text-sm">{{ bottle?.alcohol_content }}</td>
            </tr>
            <tr class="text-gray-700 border-b" v-if="bottle?.climate_soil">
              <td class="pr-4 py-3 flex align middle">
                <span class="mr-2 text-pink-800"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    class="fill-current w-4"
                  >
                    <path
                      d="M15.84 0a2 2 0 0 1 1.76 1.05C19.2 4.04 20 7.02 20 10c0 2.98-.8 5.96-2.4 8.95A2 2 0 0 1 15.84 20H4.16a2 2 0 0 1-1.76-1.05A18.77 18.77 0 0 1 0 10c0-2.98.8-5.96 2.4-8.95A2 2 0 0 1 4.16 0h11.68Zm.73 16.5H3.43c.15.35.32.7.5 1.05l.23.45h11.68l.23-.45c.18-.35.35-.7.5-1.05ZM4.9 5.5H2.7C2.23 7 2 8.5 2 10s.23 3 .69 4.5h2.2a26.33 26.33 0 0 1 .01-9Zm4.1 0H6.93l-.05.3a24.34 24.34 0 0 0 0 8.41l.05.29H9v-9Zm4.07 0H11v9h2.06l.06-.3a24.34 24.34 0 0 0 0-8.41l-.05-.29Zm4.24 0h-2.2a26.33 26.33 0 0 1-.01 9h2.21c.46-1.5.69-3 .69-4.5s-.23-3-.69-4.5ZM15.84 2H4.16c-.27.5-.51 1-.73 1.5h13.14c-.22-.5-.46-1-.73-1.5Z"
                    ></path></svg
                ></span>
                <div class="flex items-center text-sm font-semibold">
                  {{ $t("cellar.climateSoil") }}
                </div>
              </td>
              <td class="px-4 py-3 text-sm">{{ bottle?.climate_soil }}</td>
            </tr>
            <tr class="text-gray-700 border-b" v-if="bottle?.consumption">
              <td class="pr-4 py-3 flex align-middle">
                <span class="mr-2 text-pink-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    class="fill-current w-4"
                  >
                    <path
                      d="M17 0a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-6v2.25l1.37 1.03c.62.47.78 1.33.38 1.98l-.08.12a1.5 1.5 0 0 1-.52.43l-.15.07-1.65.62 1.25.47a1.5 1.5 0 0 1 .92 1.8l-.04.13c-.13.36-.4.66-.75.82l-.13.06-1.25.47 1.65.62a1.5 1.5 0 0 1 .92 1.8l-.05.13c-.08.21-.2.4-.37.56l-.13.11-1.77 1.33a1 1 0 0 1-1.3-1.52l.1-.08 1.04-.78-2.04-.77a1.5 1.5 0 0 1-.82-.74l-.06-.13a1.5 1.5 0 0 1 .74-1.88l.14-.05 1.25-.47-1.25-.48a1.5 1.5 0 0 1-.82-.74l-.06-.13a1.5 1.5 0 0 1 .74-1.88l.14-.05 2.04-.77-1.04-.78a1 1 0 0 1-.4-.68V5H3a2 2 0 0 1-2-2V2c0-1.1.9-2 2-2h14Zm0 2H3v1h14V2Z"
                    ></path>
                  </svg>
                </span>
                <div class="flex items-center text-sm font-semibold">
                  {{ $t("cellar.consumption") }}
                </div>
              </td>
              <td class="px-4 py-3 text-sm">{{ bottle?.consumption }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="">
      <h2
        class="my-4 mt-12 text-xl font-semibold flex items-center justify-between"
      >
        <span>Location</span>
      </h2>

      <div class="min-w-0 p-4 mt-4 bg-white shadow-lg rounded">
        <table class="w-full whitespace-no-wrap">
          <tbody class="bg-white divide-y">
            <tr class="text-gray-700 border-b" v-if="bottle?.country">
              <td class="pr-4 py-3 flex align-middle">
                <span class="mr-2 text-pink-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    class="fill-current w-4"
                  >
                    <path
                      d="M1 0a1 1 0 0 1 1 1v18a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1Zm14 1.6c1.55 0 3.1.66 4.65 1.97a1 1 0 0 1 .35.76v10.24a1 1 0 0 1-1.53.85 6.45 6.45 0 0 0-3.47-1.1c-1.53 0-2.9.26-4.09.77l-.32.14A13.98 13.98 0 0 1 5 16.6a9.8 9.8 0 0 1-3.76-.78A2 2 0 0 1 0 13.98v-8.5a2 2 0 0 1 2.52-1.94c.83.23 1.65.34 2.48.34 1.51 0 3.02-.3 4.53-.87l.47-.19.05-.02C11.7 2 13.35 1.6 15 1.6Zm0 2c-1.23 0-2.47.28-3.74.84l-.48.22-.09.04-.44.18c-1.74.66-3.49 1-5.25 1-.86 0-1.72-.1-2.57-.3L2 5.48v8.5l.34.13c.9.33 1.78.49 2.66.49 1.27 0 2.73-.34 4.38-1.03l.39-.16.36-.17c1.46-.61 3.08-.92 4.87-.92 1 0 1.98.2 2.95.59l.05.02V4.81l-.12-.1a5.03 5.03 0 0 0-2.67-1.1L15 3.6Z"
                    ></path>
                  </svg>
                </span>
                <div class="flex items-center text-sm font-semibold">
                  {{ $t("cellar.country") }}
                </div>
              </td>
              <td class="px-4 py-3 text-sm">{{ bottle?.country }}</td>
            </tr>
            <tr class="text-gray-700 border-b" v-if="bottle?.region">
              <td class="pr-4 py-3 flex align-middle">
                <span class="mr-2 text-pink-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    class="fill-current w-4"
                  >
                    <path
                      d="M5.65.94A1 1 0 0 1 6.6.42l.12.01 12.47 2.4a1 1 0 0 1 .8.86l.01.12v3.33a1 1 0 0 1-.16.54l-.08.12-2.14 2.47a1 1 0 0 0 0 1.3l.08.09 1.98 1.86a1 1 0 0 1 .31.61l.01.12v3.13a1 1 0 0 1-.88 1h-2.45a1 1 0 0 1-.47-.12l-.1-.06-1.37-.95a1 1 0 0 0-1.4.28l-.07.1-.9 1.81a1 1 0 0 1-.77.55h-.13l-9.93-.04a1 1 0 0 1-.94-1.3l.04-.11 3.12-6.99a1 1 0 0 0-.06-.92l-.07-.1-3.4-4.3A1 1 0 0 1 0 5.74L0 5.61V4.27a1 1 0 0 1 1.13-1l.11.03 2 .5a1 1 0 0 0 1.06-.4l.07-.1L5.65.94Zm1.41 1.6-.93 1.72a3 3 0 0 1-3.19 1.52l-.18-.04-.48-.12L5.2 9.28a3 3 0 0 1 .47 2.9l-.08.2-2.5 5.57 7.77.04.63-1.25a3 3 0 0 1 3.85-1.42l.17.07.19.1.17.12 1.12.77H18v-1.7l-1.67-1.57a3 3 0 0 1-.34-4l.12-.14L18 6.77V4.64L7.06 2.54Z"
                    ></path>
                  </svg>
                </span>
                <div class="flex items-center text-sm font-semibold">
                  {{ $t("cellar.region") }}
                </div>
              </td>
              <td class="px-4 py-3 text-sm">{{ bottle?.region }}</td>
            </tr>
            <tr class="text-gray-700 border-b" v-if="bottle?.apellation">
              <td class="pr-4 py-3 flex align-middle">
                <span class="mr-2 text-pink-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    class="fill-current w-4"
                  >
                    <path
                      d="m6.6.42.12.01 12.47 2.4a1 1 0 0 1 .8.86l.01.12v3.33a1 1 0 0 1-.16.54l-.08.12-2.14 2.47a1 1 0 0 0 0 1.3l.08.09 1.98 1.86a1 1 0 0 1 .31.61l.01.12v3.13a1 1 0 0 1-.88 1h-2.45a1 1 0 0 1-.47-.12l-.1-.06-1.37-.95a1 1 0 0 0-1.09-.03.96.96 0 0 1-.11.09.92.92 0 0 0-.2.22l-.07.1-.9 1.81a1 1 0 0 1-.77.55h-.13l-9.93-.04a1 1 0 0 1-.94-1.3l.04-.11 3.12-6.99a1 1 0 0 0-.06-.92l-.07-.1-3.4-4.3A1 1 0 0 1 0 5.74L0 5.61V4.27a1 1 0 0 1 1.13-1l.11.03 2 .5a1 1 0 0 0 1.06-.4l.07-.1L5.65.94A1 1 0 0 1 6.6.42Zm-.99 11.86-.03.1-2.5 5.57 7.77.04.63-1.25a3 3 0 0 1 .41-.63l-.8-3.35-5.48-.48Zm7.28-8.63v8.06l.82 3.4c.53-.08 1.1-.02 1.62.2l.17.08.19.1.17.12 1.12.77H18v-1.7l-1.67-1.57a3 3 0 0 1-.34-4l.12-.14L18 6.77V4.64l-5.1-.99ZM7.06 2.53l-.93 1.73a3 3 0 0 1-3.19 1.52l-.18-.04-.48-.12L5.2 9.28a3 3 0 0 1 .52 1l5.18.45V3.27l-3.83-.74Z"
                    ></path>
                  </svg>
                </span>
                <div class="flex items-center text-sm font-semibold">
                  {{ $t("cellar.apellation") }}
                </div>
              </td>
              <td class="px-4 py-3 text-sm">{{ bottle?.apellation }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <h2
    class="my-4 mt-12 text-xl font-semibold flex items-center justify-between"
    v-if="cellarBottles.length"
  >
    <span>{{ $t("cellar.moreFromCellar") }}</span>
  </h2>

  <div
    class="w-full overflow-hidden shadow-lg rounded"
    v-if="cellarBottles.length"
  >
    <div class="w-full overflow-x-auto">
      <table class="w-full whitespace-no-wrap">
        <thead>
          <tr
            class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50 hidden md:table-row"
          >
            <th class="px-4 py-3">{{ $t("cellar.name") }}</th>
            <th class="px-4 py-3">{{ $t("cellar.vintage") }}</th>
            <th class="px-4 py-3">{{ $t("cellar.apellation") }}</th>
            <th class="px-4 py-3">{{ $t("cellar.type") }}</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y">
          <CellarTableItem
            v-for="bottle in cellarBottles"
            :key="bottle.id"
            :item="bottle"
            :actions="false"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBottlesStore } from "@/stores/bottles";
import { Bottle } from "~~/types/bottle";

definePageMeta({
  middleware: "auth",
});

const store = useBottlesStore();
const route = useRoute();

const id = ref(0);
const editBottle = ref(false);
const isAdmin = ref(true);

onMounted(() => {
  id.value = parseInt(route.params.id as string);
});

watch(
  () => route.params.id,
  () => {
    id.value = parseInt(route.params.id as string);
  }
);

const bottle = computed(() => {
  return store.allBottles.find((bottle) => bottle.id === id.value);
});

const cellarBottles = computed(() => {
  if (bottle.value) {
    return store.bottlesFromCellar(bottle.value);
  } else {
    return [];
  }
});

const apellationBottles = computed(() => {
  if (bottle.value) {
    return store.bottlesFromApellation(bottle.value).slice(0, 5);
  } else {
    return [];
  }
});

const increaseQty = (id: number) => {
  bottle && store.increaseBottleQty({ bottleId: id, qty: bottle.value!.qty! });
};

const decreaseQty = (id: number) => {
  bottle && store.decreaseBottleQty({ bottleId: id, qty: bottle.value!.qty! });
};
const toggleEditBottle = () => {
  editBottle.value = !editBottle.value;
};
const updateBottle = async (bottle: Bottle) => {
  await $fetch("/api/bottles/update", {
    method: "POST",
    body: {
      id: bottle.id,
      bottle: bottle,
    },
  });
  editBottle.value = false;
};
</script>
