// Composables for Supabase calls

import { Bottle } from "~/types/bottle";

export const useBottles = () => {
  const client = useSupabase();

  const allBottles = async () => {
    const { data } = await client
      .from("bottles")
      .select()
      .order("last_added", { ascending: false });
    return { data };
  };

  const addBottle = async (
    bottle: Bottle,
    mycellar?: boolean,
    reviewed?: boolean
  ) => {
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
  };

  const countBottles = async () => {
    const { data } = await client.from("bottles").select("name");
    return { data };
  };

  const findBottle = async (bottle: Bottle) => {
    const { data } = await client
      .from("bottles")
      .select()
      .like("name", bottle.name)
      .like("cellar", bottle.cellar)
      .eq("vintage", bottle.vintage)
      .eq("type", bottle.type);
    return { data };
  };

  const findBottleById = async (id: string) => {
    const { data } = await client.from("bottles").select().eq("id", id);
    return { data };
  };

  const updateBottle = async (bottle: Bottle, id: unknown) => {
    const { data } = await client
      .from("bottles")
      .update({
        date_scrapped: new Date(),
        ...bottle,
      })
      .eq("id", id);

    return { data };
  };

  const updateBottleMetadata = async (bottle: Bottle, id: unknown) => {
    const { data } = await client
      .from("bottles")
      .update({
        date_scrapped: new Date(),
        ...bottle,
      })
      .eq("id", id);

    return { data };
  };

  return {
    allBottles,
    addBottle,
    countBottles,
    findBottle,
    findBottleById,
    updateBottle,
    updateBottleMetadata,
  };
};
