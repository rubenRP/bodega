import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware((to, _from) => {
  const store = useUserStore();

  if (!store.loggedIn && !store.data) {
    console.log("No user");
    return navigateTo("/login");
  }
});
