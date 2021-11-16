import { getCellarBottles } from '@/api/bottles'
import { Bottle } from '@/models/cellar'
import { supabase } from '@/supabase'

const state = () => ({
  cellar: [] as Bottle[],
  cellarSubscriber: <any>{},
})

const getters = {
  cellar: (state: { cellar: [] }) => state.cellar,
  totalApellations: (state: { cellar: [] }) => {
    return state.cellar.reduce(
      (
        acc: { [x: string]: any },
        curr: { apellation: string | number; qty: any }
      ) => {
        if (curr.apellation)
          acc[curr.apellation] = (acc[curr.apellation] || 0) + curr.qty
        return acc
      },
      {}
    )
  },
  totalVintages: (state: { cellar: [] }) => {
    return state.cellar.reduce(
      (
        acc: { [x: string]: any },
        curr: { vintage: string | number; qty: any }
      ) => {
        acc[curr.vintage] = (acc[curr.vintage] || 0) + curr.qty
        return acc
      },
      {}
    )
  },
  totalCountries: (state: { cellar: [] }) => {
    return state.cellar.reduce(
      (acc: { [x: string]: any }, curr: { country: string; qty: any }) => {
        if (curr.country)
          acc[curr.country] = (acc[curr.country] || 0) + curr.qty
        return acc
      },
      {}
    )
  },
  totalBottles: (state: { cellar: [] }) => {
    return state.cellar.reduce(
      (acc: number, curr: { qty: number }) => acc + curr.qty,
      0
    )
  },
}

const actions = {
  fetchCellar: async ({ state, commit }: any) => {
    try {
      let { data, error, status } = await getCellarBottles()
      if (error && status !== 406) throw error
      if (data) {
        commit('SET_CELLAR', data)
        state.cellarSubscriber = supabase
          .from('bottles')
          .on('*', (payload) => {
            // console.log('Change received!', payload)
            switch (payload.eventType) {
              case 'INSERT':
                commit('ADD_BOTTLE', payload.new)
                break
              case 'UPDATE':
                commit('MODIFY_BOTTLE', payload.new)
                return
              case 'DELETE':
                commit('DELETE_BOTTLE', payload.new.id)
                break
            }
          })
          .subscribe()
      }
    } catch (error: any) {
      alert(error.message)
    }
  },
  unsuscribeCellar: ({ state }: any) => {
    supabase.removeSubscription(state.cellarSubscriber)
  },
  destroyCellar: async ({ dispatch, commit }: any) => {
    dispatch('unsuscribeCellar')
    commit('RESET_CELLAR')
  },
}

const mutations = {
  SET_CELLAR: (state: { cellar: any[] }, cellar: any[]) => {
    state.cellar = cellar
  },
  RESET_CELLAR: (state: { cellar: never[] }) => {
    state.cellar = []
  },
  ADD_BOTTLE: (state: { cellar: any[] }, bottle: Bottle) => {
    state.cellar.push(bottle)
  },
  MODIFY_BOTTLE: (state: { cellar: any[] }, bottle: Bottle) => {
    let bottleFinded = state.cellar.find((item: any) => {
      return bottle.id === item.id
    })
    if (bottleFinded) {
      Object.assign(bottleFinded, bottle)
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
