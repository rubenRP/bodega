import { serverSupabaseClient } from "#supabase/server";
export default eventHandler(async (event) => {
  const client = serverSupabaseClient(event);
  const body = await readBody(event);

  const { data } = await client.from("bottles").select().eq("id", body.id);
  return { data };
});
