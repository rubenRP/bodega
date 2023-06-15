import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async (event) => {
  const client = serverSupabaseClient(event);

  const body = await readBody(event);

  const { bottle, mycellar, reviewed } = body;

  const { data } = await client
    .from("bottles")
    .insert({
      ...bottle,
      mycellar: mycellar || false,
      reviewed: reviewed || false,
    })
    .select();

  for (let i = 0; i < bottle.qty!; i++) {
    await client
      .from("added_bottles")
      .insert({
        bottle_id: data![0].id,
        date_added: new Date(),
      })
      .select();
  }
  return { data: data![0] };
});
