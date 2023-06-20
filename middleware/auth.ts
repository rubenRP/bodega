import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware((to, _from) => {
  const store = useUserStore();
  const user = useSupabaseUser();

  console.log("Auth middleware");
  console.log(store.loggedIn, store.data, user.value);

  if (!store.loggedIn && !store.data && !user.value) {
    console.log("No user");
    return navigateTo("/login");
  }
  if (!store.loggedIn && !store.data && user.value) {
    store.fetchUser(user.value);
  }
});
