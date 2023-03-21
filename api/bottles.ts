import { supabase } from "~~/assets/supabase";
import { Bottle } from "~~/types/bottle";

const getCellarBottles = async () => {
  return await supabase
    .from("bottles")
    .select()
    .is("mycellar", true)
    .gt("qty", 0)
    .order("last_added", { ascending: false });
};
const getAllBottles = async () => {
  return await supabase
    .from("bottles")
    .select()
    .order("last_added", { ascending: false });
};

const findBottleById = async (id: number) => {
  return await supabase.from("bottles").select().eq("id", id);
};

const findBottle = async (
  name: string,
  cellar: string,
  vintage: number,
  type: string
) => {
  return await supabase
    .from("bottles")
    .select()
    .like("name", name)
    .like("cellar", cellar)
    .eq("vintage", vintage)
    .eq("type", type);
};

const addBottle = async (
  bottle: Bottle,
  mycellar?: boolean,
  reviewed?: boolean
) => {
  let res: any = await supabase.from("bottles").insert([
    {
      ...bottle,
      mycellar: mycellar || false,
      reviewed: reviewed || false,
    },
  ]);
  for (let i = 0; i < bottle.qty!; i++) {
    await supabase.from("added_bottles").insert([
      {
        bottle_id: res.data![0].id,
        date_added: new Date(),
      },
    ]);
  }
  return res.data![0];
};
const updateBottle = async (id: number, bottle: {}) => {
  await supabase
    .from("bottles")
    .update([
      {
        date_scrapped: new Date(),
        ...bottle,
      },
    ])
    .eq("id", id);
};
const updateBottleMetadata = async (id: number, bottle: {}) => {
  await supabase
    .from("bottles")
    .update([
      {
        date_scrapped: new Date(),
        ...bottle,
      },
    ])
    .eq("id", id);
};
const removeBottle = async (id: string) => {
  await supabase.from("bottles").update({ qty: 0 }).eq("id", id);
};
const increaseBottleQty = async (id: number, qty: number) => {
  await supabase
    .from("bottles")
    .update({ qty: qty + 1, last_added: new Date() })
    .eq("id", id);
  await supabase.from("added_bottles").insert([
    {
      bottle_id: id,
      date_added: new Date(),
    },
  ]);
};
const decreaseBottleQty = async (id: number, qty: number) => {
  await supabase
    .from("bottles")
    .update({ qty: qty ? qty - 1 : 0 })
    .eq("id", id);
  await supabase.from("opened_bottles").insert([
    {
      bottle_id: id,
      date_opened: new Date(),
    },
  ]);
};
const getOpenedBottles = async () => {
  return await supabase
    .from("opened_bottles")
    .select()
    .order("date_opened", { ascending: true });
};
const getAddedBottles = async () => {
  return await supabase
    .from("added_bottles")
    .select()
    .order("date_added", { ascending: true });
};

const getBottlesCount = async () => {
  return await supabase.from("bottles").select("name");
};

const getBottlesSubscription = async () => {
  return await supabase
    .channel("any")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "bottles" },
      (payload) => {
        console.log("Change received!", payload);
        return payload;
      }
    )
    .subscribe();
};
const getOpenedBottlesSubscription = async () => {
  return await supabase
    .channel("any")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "opened_bottles" },
      (payload) => {
        console.log("Change received!", payload);
        return payload;
      }
    )
    .subscribe();
};

const getAddedBottlesSubscription = async () => {
  return await supabase
    .channel("any")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "added_bottles" },
      (payload) => {
        console.log("Change received!", payload);
        return payload;
      }
    )
    .subscribe();
};

export {
  getCellarBottles,
  getAllBottles,
  addBottle,
  updateBottle,
  updateBottleMetadata,
  removeBottle,
  increaseBottleQty,
  decreaseBottleQty,
  getOpenedBottles,
  getAddedBottles,
  findBottle,
  findBottleById,
  getBottlesCount,
  getBottlesSubscription,
  getOpenedBottlesSubscription,
};
