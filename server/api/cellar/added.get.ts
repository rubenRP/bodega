import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async (event) => {
  const client = serverSupabaseClient(event);
  const { data } = await client
    .from("added_bottles")
    .select()
    .order("date_added", { ascending: true });
  return { data };
});
