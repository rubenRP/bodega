import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async (event) => {
  const client = serverSupabaseClient(event);

  const body = await readBody(event);

  const { id } = body;

  await client
    .from("bottles")
    .update({ qty: qty + 1, last_added: new Date() })
    .eq("id", id);

  const { data } = await client.from("added_bottles").insert({
    bottle_id: id,
    date_added: new Date(),
  });

  return { data };
});
