import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser();
  const store = useUserStore();

  if (!store.loggedIn && user) {
    console.log("No user");
    return navigateTo("/login");
  }
});
