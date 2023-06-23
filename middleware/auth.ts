import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const store = useUserStore();
  // const user = useSupabaseUser();
  const client = useSupabaseClient();
  const user = await client.auth.getSession();

  if (!store.loggedIn && !store.data && !user) {
    console.log("No user");
    return navigateTo("/login");
  }
  /*  if (!store.loggedIn && !store.data && user) {
    store.fetchUser(user);
  } */
});
