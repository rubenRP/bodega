import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async (event) => {
  const client = serverSupabaseClient(event);

  const body = await readBody(event);

  const { id } = body;

  const { data } = await client.from("bottles").update({ qty: 0 }).eq("id", id);

  return { data };
});
