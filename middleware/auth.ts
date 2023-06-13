import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware((to, _from) => {
  const store = useUserStore();

  if (!store.loggedIn) {
    console.log("No user");
    return navigateTo("/login");
  }
});
