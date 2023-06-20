import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware((to, _from) => {
  const store = useUserStore();
  const user = useSupabaseUser();

  if (!store.loggedIn && !store.data && !user.value) {
    console.log("No user");
    return navigateTo("/login");
  }
});
