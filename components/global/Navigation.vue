<template>
  <div>
    <div
      class="fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 opacity-0 pointer-events-none"
    ></div>
    <div
      id="sidebar"
      class="flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-gradient-to-l from-pink-900 to-pink-800 p-4 transition-all duration-200 ease-in-out -translate-x-64"
    >
      <div class="flex justify-between mb-10 pr-3 sm:px-2">
        <button
          class="lg:hidden text-slate-500 hover:text-slate-400"
          aria-controls="sidebar"
        >
          <span class="sr-only">Close sidebar</span
          ><svg
            class="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"
            ></path>
          </svg></button
        ><a aria-current="page" class="block active" href="/">
          <Logo class="w-32 text-white" />
        </a>
      </div>
      <div class="space-y-8">
        <div>
          <h3 class="text-xs uppercase text-slate-400 font-semibold pl-3">
            <span
              class="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
              aria-hidden="true"
              >•••</span
            ><span class="lg:hidden lg:sidebar-expanded:block 2xl:block"
              >Pages</span
            >
          </h3>
          <ul class="mt-3">
            <li class="rounded-sm mb-0.5 last:mb-0 false">
              <NuxtLink
                class="block text-slate-200 truncate transition duration-150 hover:text-white px-3 py-2 nav-link"
                to="/"
                ><div class="flex items-center text-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    class="fill-current"
                  >
                    <path
                      d="M11.3 1.1l8 6.8a2 2 0 01.7 1.52V20h-8v-7a2 2 0 00-1.85-2H10a2 2 0 00-2 2v7H0V9.42A2 2 0 01.7 7.9l8-6.8a2 2 0 012.6 0zM18 9.42l-8-6.8-8 6.8V18h4v-5a4 4 0 013.87-4h.2l.23.01A4 4 0 0114 12.8V18h4V9.42z"
                    ></path>
                  </svg>
                  <span
                    class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                    >Home</span
                  >
                </div></NuxtLink
              >
            </li>
            <li class="rounded-sm mb-0.5 last:mb-0 false">
              <NuxtLink
                class="block text-slate-200 truncate transition duration-150 hover:text-white px-3 py-2 nav-link"
                to="/cellar"
                ><div class="flex items-center text-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    class="fill-current"
                  >
                    <path
                      d="M9.83 1.5c.84 0 1.57.43 1.96 1.08l.08.14.03.07h2.34c.73 0 1.37.42 1.64 1.04l.05.13.04.14c.1.38.12.77.08 1.15l-.02.23-.06.28-.04.16c.42.23.76.63.94 1.13l.05.17.04.16c.1.53.13 1.07.09 1.6L17 9.3l-.02.1h.55c1 0 1.88.62 2.22 1.52l.06.16.04.15c.19.87.19 1.77 0 2.64a2.36 2.36 0 01-2.32 1.83h-3.86l-.03.13a2.28 2.28 0 01-2.06 1.67H2.34c-.76 0-1.45-.47-1.71-1.17A9.35 9.35 0 010 13c0-1.11.21-2.22.63-3.33.23-.62.79-1.05 1.44-1.15V8.5c0-.9.14-1.78.42-2.67a2 2 0 01.6-.92 5.7 5.7 0 01.28-2.21c.22-.67.84-1.13 1.56-1.2h4.9zm-7.33 9l-.12.31a6.57 6.57 0 00.12 4.69h8.9c.25 0 .45-.19.45-.42v-1.25h5.54c.24 0 .46-.16.51-.38a3.8 3.8 0 000-1.73.52.52 0 00-.51-.39h-5.35l-.21-.55a.45.45 0 00-.42-.28H2.5zm8-4H4.16l-.08.29a6.53 6.53 0 00-.24 1.7l7.6.01c.68 0 1.32.3 1.74.8h1.91c.05 0 .1-.03.12-.06l.01-.03.04-.24.02-.22c.03-.3 0-.62-.05-.93a.15.15 0 00-.1-.11l-.04-.01h-4l-.15-.8a.47.47 0 00-.36-.4h-.08zm3.72-2H10.5c.66 0 1.27.33 1.68.86h2.04l.02-.14.02-.14c.01-.15 0-.3-.02-.46l-.02-.12zM9.83 3.21H5.1L5 3.47c-.1.35-.14.69-.14 1.03h5.41v-.86a.44.44 0 00-.37-.42h-.08z"
                    ></path></svg
                  ><span
                    class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                    >{{ $t("cellar.myCellar") }}</span
                  >
                </div></NuxtLink
              >
            </li>
            <li class="rounded-sm mb-0.5 last:mb-0 false">
              <NuxtLink
                class="block text-slate-200 truncate transition duration-150 hover:text-white px-3 py-2 nav-link"
                to="/cellar"
                ><div class="flex items-center text-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    class="fill-current"
                  >
                    <path
                      d="M11 1a9 9 0 010 18c-2.737 0-4.949-.804-6.572-2.428a1.059 1.059 0 011.497-1.497c1.2 1.2 2.87 1.807 5.075 1.807a6.882 6.882 0 10-6.87-7.294L5.263 8.33a.987.987 0 011.413-.062c.407.38.434 1.024.061 1.439L3.773 13 .328 9.817A1.032 1.032 0 01.26 8.38a.987.987 0 011.413-.07l.421.39A9.002 9.002 0 0111 1zm-.09 5c.465 0 .85.36.902.824l.006.11v2.922l2.68 1.376a.944.944 0 01.448 1.152l-.042.1a.9.9 0 01-1.122.46l-.098-.043-3.181-1.633a.933.933 0 01-.496-.718L10 10.433v-3.5c0-.515.407-.933.91-.933z"
                    ></path></svg
                  ><span
                    class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                    >History</span
                  >
                </div></NuxtLink
              >
            </li>
            <li class="rounded-sm mb-0.5 last:mb-0 false">
              <NuxtLink
                class="block text-slate-200 truncate transition duration-150 hover:text-white px-3 py-2 nav-link"
                href="/reviews"
                ><div class="flex items-center text-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    class="fill-current"
                  >
                    <path
                      d="M18 1a2 2 0 0 1 2 2v12.046V15a4.992 4.992 0 0 0-1.999-4L18 3H2v12h5.414L10 17.586l.469-.47c.29.62.703 1.171 1.209 1.62l-.264.264a2 2 0 0 1-2.828 0l-2-2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h16Zm-3 10.5c.449 0 .819.338.87.773l.005.102v1.75h1.75a.875.875 0 0 1 .102 1.744l-.102.006h-1.75v1.75a.875.875 0 0 1-1.744.102l-.006-.102v-1.75h-1.75a.875.875 0 0 1-.102-1.744l.102-.006h1.75v-1.75c0-.483.392-.875.875-.875Z"
                    ></path></svg
                  ><span
                    class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                    >Reviews</span
                  >
                </div></NuxtLink
              >
            </li>
            <li class="rounded-sm mb-0.5 last:mb-0 false">
              <NuxtLink
                class="block text-slate-200 truncate transition duration-150 hover:text-white px-3 py-2 nav-link"
                href="/reviews"
                ><div class="flex items-center text-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    class="fill-current"
                  >
                    <path
                      d="M13 0c.5128 0 .9355.386.9933.8834L14 1h3c.5523 0 1 .4477 1 1v17c0 .5523-.4477 1-1 1H3c-.5523 0-1-.4477-1-1V2c0-.5523.4477-1 1-1h3c0-.5523.4477-1 1-1 .5128 0 .9355.386.9933.8834L8 1h1c0-.5523.4477-1 1-1 .5128 0 .9355.386.9933.8834L11 1h1c0-.5523.4477-1 1-1zM6 3H4v15h12V3h-2v.5c0 .5523-.4477 1-1 1-.5128 0-.9355-.386-.9933-.8834L12 3.5V3h-1v.5c0 .5523-.4477 1-1 1-.5128 0-.9355-.386-.9933-.8834L9 3.5V3H8v.5c0 .5523-.4477 1-1 1-.5128 0-.9355-.386-.9933-.8834L6 3.5V3zm4 10.5c.5523 0 1 .4477 1 1 0 .5128-.386.9355-.8834.9933L10 15.5H7c-.5523 0-1-.4477-1-1 0-.5128.386-.9355.8834-.9933L7 13.5h3zm3-3.5c.5523 0 1 .4477 1 1 0 .5128-.386.9355-.8834.9933L13 12H7c-.5523 0-1-.4477-1-1 0-.5128.386-.9355.8834-.9933L7 10h6zm0-3.5c.5523 0 1 .4477 1 1 0 .5128-.386.9355-.8834.9933L13 8.5H7c-.5523 0-1-.4477-1-1 0-.5128.386-.9355.8834-.9933L7 6.5h6z"
                    ></path></svg
                  ><span
                    class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                    >Journal</span
                  >
                </div></NuxtLink
              >
            </li>
            <li class="rounded-sm mb-0.5 last:mb-0 false">
              <NuxtLink
                class="block text-slate-200 truncate transition duration-150 hover:text-white px-3 py-2 nav-link"
                href="/reviews"
                ><div class="flex items-center text-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    class="fill-current"
                  >
                    <path
                      d="M7.58 15.1a1.1 1.1 0 011.094.98l.006.12v1.1a1.1 1.1 0 01-2.193.12l-.007-.12v-1.1a1.1 1.1 0 011.1-1.1zm8.8-5.5a1.1 1.1 0 011.094.98l.006.12v6.6a1.1 1.1 0 01-2.193.12l-.007-.12v-6.6a1.1 1.1 0 011.1-1.1zm-4.4 4.4a1.1 1.1 0 011.094.98l.006.12v2.2a1.1 1.1 0 01-2.193.12l-.007-.12v-2.2a1.1 1.1 0 011.1-1.1zm-8.8 2.2a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2zM19.282 2.292c.024.092.04.186.049.28l.006.143v4.08a1.1 1.1 0 01-2.194.12l-.006-.12-.001-1.74-.159.227c-1.958 2.736-4.318 4.862-6.983 6.342-2.866 1.591-5.89 2.315-9.048 2.161a1.1 1.1 0 01.108-2.197c2.744.133 5.36-.493 7.872-1.888 2.398-1.331 4.53-3.26 6.31-5.766l-.774.204a1.1 1.1 0 01-1.308-.667l-.037-.115a1.1 1.1 0 01.667-1.308l.115-.037 3.365-.891a1.65 1.65 0 012.018 1.172z"
                    ></path></svg
                  ><span
                    class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                    >Stats</span
                  >
                </div></NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
        <div class="px-3 py-2">
          <button>
            <span class="sr-only">Expand / collapse sidebar</span
            ><svg
              class="w-6 h-6 fill-current sidebar-expanded:rotate-180"
              viewBox="0 0 24 24"
            >
              <path
                class="text-slate-200"
                d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
              ></path>
              <path class="text-slate-400" d="M3 23H1V1h2z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGeneralStore } from "~~/stores/general";

const store = useGeneralStore();
const showSidebar = computed(() => store.sidebar);
const toggleSidebar = () => store.toggleSidebar();
</script>

<style scoped>
.nav-link.router-link-active {
  @apply border-l-2 border-gray-200;
}
</style>
