import { supabase } from "~~/assets/supabase";

const getReviews = async () => {
  return await supabase
    .from("reviews")
    .select(
      `
        *,
        bottles(name, cellar, vintage, country, region, apellation, type, mycellar),
        profiles(username, initials)
      `
    )
    .order("date_added", { ascending: false });
};

const getReviewById = async (id: number) => {
  return await supabase
    .from("reviews")
    .select(
      `
        *,
        bottles(name, cellar, vintage, country, region, apellation, type, mycellar),
        profiles(username, initials)
      `
    )
    .eq("id", id);
};

const addReview = async (
  cellarBottle: number,
  rating: number,
  user: any,
  comment?: string
) => {
  await supabase.from("reviews").insert([
    {
      bottle_id: cellarBottle,
      rating: rating,
      comment: comment,
      profile_id: user,
    },
  ]);
  await supabase
    .from("bottles")
    .update([
      {
        reviewed: true,
      },
    ])
    .eq("id", cellarBottle);
};

const getBottleReview = async (bottleId: number) => {
  return await supabase
    .from("reviews")
    .select(`*, profiles(username, initials)`)
    .eq("bottle_id", bottleId);
};

const getReviewsSubscription = async () => {
  return await supabase
    .channel("any")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "reviews" },
      (payload) => {
        console.log("Change received!", payload);
        return payload;
      }
    )
    .subscribe();
};

export {
  getReviews,
  addReview,
  getBottleReview,
  getReviewsSubscription,
  getReviewById,
};
