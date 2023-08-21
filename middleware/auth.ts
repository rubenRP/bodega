import { useSupabase } from "~/composables/useSupabase";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const client = useSupabase();
  const { data } = await client.auth.getUser();
  const router = useRouter();

  if (!data.user) {
    return router.push("/login");
  }
});
