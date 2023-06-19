export const useUser = () => {
  const client = useSupabaseClient();

  const getProfile = async (id: any) => {
    const { data } = await client
      .from("profiles")
      .select("initials, cellar_id, username, avatar_url, role")
      .eq("id", id)
      .single();

    return { data };
  };

  return {
    getProfile,
  };
};
