import { serverSupabaseClient } from "#supabase/server";
export default eventHandler(async (event) => {
  const client = serverSupabaseClient(event);
  const body = await readBody(event);

  const { data } = await client
    .from("bottles")
    .select()
    .like("name", body.name)
    .like("cellar", body.cellar)
    .eq("vintage", body.vintage)
    .eq("type", body.type);
  return { data };
});
