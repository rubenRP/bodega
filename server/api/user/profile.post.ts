import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async (event) => {
  const client = serverSupabaseClient(event);

  const body = await readBody(event);

  const { id } = body;

  const { data } = await client
    .from("profiles")
    .select("initials, cellar_id, username, avatar_url, role")
    .eq("id", id)
    .single();

  return { data };
});
