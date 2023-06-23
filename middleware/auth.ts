import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const store = useUserStore();
  const user = useSupabaseUser();

  await new Promise((res) => setTimeout(res, 200));

  if (!store.loggedIn && !store.data && !user.value) {
    console.log("No user");
    return navigateTo("/login");
  }
  if (!store.loggedIn && !store.data && user.value) {
    store.fetchUser(user.value);
  }
});
