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
    qty: number,
    date?: any
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
        last_added: date ? date : new Date(),
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
    id: number,
    date?: any
  ) {
    try {
      await supabase
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
            last_added: date,
          },
        ])
        .eq('id', id)
    } catch (error) {
      alert(error.message)
    }
  },
  async removeBottle(id: string) {
    try {
      await supabase.from('mycellar').update({ qty: 0 }).eq('id', id)
    } catch (error) {
      alert(error.message)
    }
  },
  async increaseBottleQty(id: string, qty: number) {
    try {
      await supabase
        .from('mycellar')
        .update({ qty: qty + 1, last_added: new Date() })
        .eq('id', id)
    } catch (error) {
      alert(error.message)
    }
  },
  async decreaseBottleQty(id: string, qty: number) {
    try {
      await supabase
        .from('mycellar')
        .update({ qty: qty ? qty - 1 : 0 })
        .eq('id', id)
      await supabase.from('opened_bottles').insert([
        {
          bottle_id: id,
          date_opened: new Date(),
        },
      ])
    } catch (error) {
      alert(error.message)
    }
  },
}
