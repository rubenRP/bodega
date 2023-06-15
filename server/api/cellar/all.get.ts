import { serverSupabaseClient } from "#supabase/server";
export default eventHandler(async (event) => {
  const client = serverSupabaseClient(event);
  const { data } = await client
    .from("bottles")
    .select()
    .is("mycellar", true)
    .gt("qty", 0)
    .order("last_added", { ascending: false });
  return data;
});
