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
  } catch (error) {
    alert(error.message)
  }
}

export { getReviews, addReview }
