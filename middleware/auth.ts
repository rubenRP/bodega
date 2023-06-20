import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware((to, _from) => {
  const store = useUserStore();

  console.log(store.loggedIn, store.data);
  if (!store.loggedIn && !store.data) {
    console.log("No user");
    return navigateTo("/login");
  }
});
