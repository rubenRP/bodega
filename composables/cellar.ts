export const useCellar = () => {
  const client = useSupabase();

  const allCellarBottles = async () => {
    const { data } = await client
      .from("bottles")
      .select()
      .is("mycellar", true)
      .gt("qty", 0)
      .order("last_added", { ascending: false });
    return { data };
  };

  const addedCellarBottles = async () => {
    const { data } = await client
      .from("added_bottles")
      .select()
      .order("date_added", { ascending: true });
    return { data };
  };

  const decreaseBottleQty = async (id: any, qty: any) => {
    await client
      .from("bottles")
      .update({ qty: qty ? qty - 1 : 0 })
      .eq("id", id);

    const { data } = await client.from("opened_bottles").insert({
      bottle_id: id,
      date_opened: new Date(),
    });

    return { data };
  };
  const increaseBottleQty = async (id: any, qty: any) => {
    await client
      .from("bottles")
      .update({ qty: qty + 1, last_added: new Date() })
      .eq("id", id);

    const { data } = await client.from("added_bottles").insert({
      bottle_id: id,
      date_added: new Date(),
    });

    return { data };
  };
  const openedBottles = async () => {
    const { data } = await client
      .from("opened_bottles")
      .select()
      .order("date_opened", { ascending: true });
    return { data };
  };

  const removeBottle = async (id: any) => {
    const { data } = await client
      .from("bottles")
      .update({ qty: 0 })
      .eq("id", id);

    return { data };
  };

  return {
    allCellarBottles,
    addedCellarBottles,
    decreaseBottleQty,
    increaseBottleQty,
    openedBottles,
    removeBottle,
  };
};
