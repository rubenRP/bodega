import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async (event) => {
  const client = serverSupabaseClient(event);

  const body = await readBody(event);

  const { bottle, id } = body;

  const { data } = await client
    .from("bottles")
    .update({
      date_scrapped: new Date(),
      ...bottle,
    })
    .eq("id", id);

  return { data };
});
