import { supabase } from '../supabase'

export default {
  async getProfileInfo(id: any) {
    return await supabase
      .from('profiles')
      .select('initials, cellar_id')
      .eq('id', id)
      .single()
  },
  async getCellarBottles() {
    return await supabase
      .from('mycellar')
      .select()
      .gt('qty', 0)
      .order('last_added', { ascending: false })
  },
  async addBottle(
    name: string,
    cellar: string,
    vintage: number,
    country: string,
    region: string,
    apellation: string,
    type: string,
    qty: number
  ) {
    return await supabase.from('mycellar').insert([
      {
        name: name,
        cellar: cellar,
        vintage: vintage,
        country: country,
        region: region,
        apellation: apellation,
        type: type,
        qty: qty,
      },
    ])
  },
  async updateBottle(
    name: string,
    cellar: string,
    vintage: number,
    country: string,
    region: string,
    apellation: string,
    type: string,
    qty: number,
    id: number
  ) {
    return await supabase
      .from('mycellar')
      .update([
        {
          name: name,
          cellar: cellar,
          vintage: vintage,
          country: country,
          region: region,
          apellation: apellation,
          type: type,
          qty: qty,
        },
      ])
      .eq('id', id)
  },
}
