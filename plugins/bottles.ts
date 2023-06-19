export default defineNuxtPlugin((nuxtApp) => {
  const client = useSupabaseClient();

  const all = async () => {
    const { data } = await client
      .from("bottles")
      .select()
      .order("last_added", { ascending: false });
    return { data };
  };

  return {
    provide: {
      all: all,
    },
  };
});
