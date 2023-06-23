<template>
  <div class="relative inline-flex">
    <button
      class="inline-flex justify-center items-center group"
      @click="toggleProfileMenu"
      @keydown.escape="closeProfileMenu"
      aria-label="Account"
      aria-haspopup="true"
    >
      <div class="relative w-8 h-8 rounded-full">
        <div
          class="group w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-pink-900 table cursor-pointer border border-gray-300"
        >
          <span class="table-cell text-white font-light align-middle">{{
            userInitials
          }}</span>
        </div>
      </div>
      <div class="flex items-center truncate">
        <span
          class="truncate ml-2 text-sm font-medium group-hover:text-slate-800 hidden lg:block"
        >
          Rubén R.
        </span>
        <svg
          class="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
          viewBox="0 0 12 12"
        >
          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"></path>
        </svg>
      </div>
    </button>
    <div
      @keydown.escape="closeProfileMenu"
      v-if="isProfileMenuOpen"
      class="origin-top-right z-10 absolute top-full min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1 right-0"
      aria-label="submenu"
    >
      <div>
        <div class="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
          <div class="font-medium text-slate-800">Acme Inc.</div>
          <div class="text-xs text-slate-500 italic">Administrator</div>
        </div>
        <ul>
          <li>
            <NuxtLink
              to="/profile"
              class="font-medium text-sm flex items-center py-1 px-3 text-pink-900 hover:text-pink-800"
            >
              <span>{{ $t("user.profile") }}</span>
            </NuxtLink>
          </li>
          <li>
            <a
              class="font-medium text-sm flex items-center py-1 px-3 text-pink-900 hover:text-pink-800"
              href="#"
            >
              <span>{{ $t("user.settings") }}</span>
            </a>
          </li>
          <li>
            <button
              class="font-medium text-sm flex items-center py-1 px-3 text-pink-900 hover:text-pink-800"
              @click="logout"
            >
              <span>{{ $t("user.logout") }}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSupabase } from "~/composables/useSupabase";
import { useUserStore } from "~~/stores/user";
const client = useSupabase();

const userStore = useUserStore();

const userInitials = "RR";

const isProfileMenuOpen = ref(false);
const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
};
const closeProfileMenu = () => {
  isProfileMenuOpen.value = false;
};

const logout = () => {
  userStore.logout();
  client.auth.signOut();
  navigateTo("/login");
};
</script>
