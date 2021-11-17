import { Bottle } from '@/models/cellar'
import { supabase } from '@/supabase'

const getCellarBottles = async () => {
  return await supabase
    .from('bottles')
    .select()
    .is('mycellar', true)
    .gt('qty', 0)
    .order('last_added', { ascending: false })
}
const getBottles = async () => {
  try {
    const res = await supabase
      .from('bottles')
      .select()
      .order('last_added', { ascending: false })

    return res.data!
  } catch (error: any) {
    console.log(error)
  }
}

const findBottleById = async (id: number) => {
  try {
    const res = await supabase.from('bottles').select().eq('id', id)
    return res.data![0]
  } catch (error: any) {
    console.log(error)
  }
}

const findBottle = async (
  name: string,
  cellar: string,
  vintage: number,
  type: string
) => {
  try {
    const res = await supabase
      .from('bottles')
      .select()
      .like('name', name)
      .like('cellar', cellar)
      .eq('vintage', vintage)
      .eq('type', type)

    return res.data![0]
  } catch (error: any) {
    console.log(error)
  }
}

const addBottle = async (
  bottle: Bottle,
  mycellar?: boolean,
  reviewed?: boolean
) => {
  try {
    let res = await supabase.from('bottles').insert([
      {
        ...bottle,
        mycellar: mycellar || false,
        reviewed: reviewed || false,
      },
    ])
    for (let i = 0; i < bottle.qty!; i++) {
      await supabase.from('added_bottles').insert([
        {
          bottle_id: res.data![0].id,
          date_added: new Date(),
        },
      ])
    }
    return res.data![0]
  } catch (error: any) {
    console.log(error)
  }
}
const updateBottle = async (id: number, bottle: {}) => {
  try {
    await supabase
      .from('bottles')
      .update([
        {
          date_scrapped: new Date(),
          ...bottle,
        },
      ])
      .eq('id', id)
  } catch (error: any) {
    alert(error.message)
  }
}
const updateBottleMetadata = async (id: number, bottle: {}) => {
  try {
    await supabase
      .from('bottles')
      .update([
        {
          date_scrapped: new Date(),
          ...bottle,
        },
      ])
      .eq('id', id)
  } catch (error: any) {
    alert(error.message)
  }
}
const removeBottle = async (id: string) => {
  try {
    await supabase.from('bottles').update({ qty: 0 }).eq('id', id)
  } catch (error: any) {
    alert(error.message)
  }
}
const increaseBottleQty = async (id: number, qty: number) => {
  try {
    await supabase
      .from('bottles')
      .update({ qty: qty + 1, last_added: new Date() })
      .eq('id', id)
    await supabase.from('added_bottles').insert([
      {
        bottle_id: id,
        date_added: new Date(),
      },
    ])
  } catch (error: any) {
    alert(error.message)
  }
}
const decreaseBottleQty = async (id: number, qty: number) => {
  try {
    await supabase
      .from('bottles')
      .update({ qty: qty ? qty - 1 : 0 })
      .eq('id', id)
    await supabase.from('opened_bottles').insert([
      {
        bottle_id: id,
        date_opened: new Date(),
      },
    ])
  } catch (error: any) {
    alert(error.message)
  }
}
const getOpenedBottles = async () => {
  return await supabase
    .from('opened_bottles')
    .select()
    .order('date_opened', { ascending: true })
}
const getAddedBottles = async () => {
  return await supabase
    .from('added_bottles')
    .select()
    .order('date_added', { ascending: true })
}

const getBottlesCount = async () => {
  return await supabase.from('bottles').select('name')
}

export {
  getCellarBottles,
  getBottles,
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
}
