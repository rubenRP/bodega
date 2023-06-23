import { useSupabase } from "~/composables/useSupabase";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const client = useSupabase();
  const { data } = await client.auth.getUser();

  if (!data.user) {
    navigateTo("/login");
  }
});
