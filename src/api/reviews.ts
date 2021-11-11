import { supabase } from '@/supabase'

const getReviews = async () => {
  return await supabase
    .from('reviews')
    .select(
      `
        *,
        bottles(name, cellar, vintage, country, region, apellation, type, mycellar)
      `
    )
    .order('date_added', { ascending: false })
}

const addReview = async (
  cellarBottle: number,
  rating: number,
  comment: string,
  user: any
) => {
  try {
    await supabase.from('reviews').insert([
      {
        bottle_id: cellarBottle,
        rating: rating,
        comment: comment,
        profile_id: user,
      },
    ])
    await supabase
      .from('bottles')
      .update([
        {
          reviewed: true,
        },
      ])
      .eq('id', cellarBottle)
  } catch (error: any) {
    alert(error.message)
  }
}

const getBottleReview = async (bottleId: number) => {
  try {
    const res = await supabase
      .from('reviews')
      .select(`*, profiles(username, avatar_url)`)
      .eq('bottle_id', bottleId)

    return res.data
  } catch (error: any) {
    console.log(error.message)
  }
}

export { getReviews, addReview, getBottleReview }
