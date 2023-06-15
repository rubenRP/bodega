import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async (event) => {
  const client = serverSupabaseClient(event);

  const body = await readBody(event);

  const { id, qty } = body;

  await client
    .from("bottles")
    .update({ qty: qty ? qty - 1 : 0 })
    .eq("id", id);

  const { data } = await client.from("opened_bottles").insert({
    bottle_id: id,
    date_opened: new Date(),
  });

  return { data };
});
