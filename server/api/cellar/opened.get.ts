import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async (event) => {
  const client = serverSupabaseClient(event);
  const { data } = await client
    .from("opened_bottles")
    .select()
    .order("date_opened", { ascending: true });
  return { data };
});
