import {
  decreaseBottleQty,
  getAddedBottles,
  getAllBottles,
  getOpenedBottles,
  increaseBottleQty,
} from '@/api/bottles'
import { Bottle } from '@/models/cellar'
import { supabase } from '@/supabase'

const state = () => ({
  bottles: [] as Bottle[],
  bottlesSubscriber: <any>{},
  openedBottles: [],
  addedBottles: [],
})

const getters = {
  bottles: (state: { bottles: Bottle[] }) => state.bottles,
  cellarBottles: (state: { bottles: Bottle[] }) =>
    state.bottles.filter((bottle) => bottle.mycellar && bottle.qty! > 0),
  getBottleById: (state: { bottles: Bottle[] }) => (id: number) =>
    state.bottles.find((bottle) => bottle.id === id),
  getOpenedBottles: (state: { openedBottles: number[] }) => state.openedBottles,
  getAddedBottles: (state: { addedBottles: number[] }) => state.addedBottles,
  totalCellarApellations: (
    state: { bottles: [] },
    getters: { cellarBottles: any[] }
  ) => {
    return getters.cellarBottles.reduce(
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
  totalCellarVintages: (
    state: { bottles: [] },
    getters: { cellarBottles: any[] }
  ) => {
    return getters.cellarBottles.reduce(
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
  totalCellarCountries: (
    state: { bottles: [] },
    getters: { cellarBottles: any[] }
  ) => {
    return getters.cellarBottles.reduce(
      (acc: { [x: string]: any }, curr: { country: string; qty: any }) => {
        if (curr.country)
          acc[curr.country] = (acc[curr.country] || 0) + curr.qty
        return acc
      },
      {}
    )
  },
  totalCellarBottles: (
    state: { bottles: [] },
    getters: { cellarBottles: any[] }
  ) => {
    return getters.cellarBottles.reduce(
      (acc: number, curr: { qty: number }) => acc + curr.qty,
      0
    )
  },
  totalBottles: (state: { bottles: [] }) => {
    return state.bottles.length
  },
  latestCellarBottles: (
    state: { bottles: [] },
    getters: { cellarBottles: any[] }
  ) => {
    return getters.cellarBottles.slice(0, 5)
  },
  getCellarTypes: (
    state: { bottles: Bottle[] },
    getters: { cellarBottles: any[] }
  ) => {
    return getters.cellarBottles.reduce(
      (acc: { [x: string]: any }, curr: { type: string; qty: number }) => {
        acc[curr.type] = (acc[curr.type] || 0) + curr.qty
        return acc
      },
      {}
    )
  },
}

const actions = {
  fetchBottles: async ({ state, commit }: any) => {
    try {
      let { data, error, status } = await getAllBottles()
      if (error && status !== 406) throw error
      if (data) {
        commit('SET_BOTTLES', data)
        state.cellarSubscriber = supabase
          .from('bottles')
          .on('*', (payload) => {
            console.log('Change received!', payload)
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
  unsuscribeBottles: ({ state }: any) => {
    supabase.removeSubscription(state.bottlesSubscriber)
  },
  destroyBottles: async ({ dispatch, commit }: any) => {
    dispatch('unsuscribeBottles')
    commit('RESET_BOTTLES')
  },
  fetchOpenedBottles: async ({ state, commit }: any) => {
    try {
      let { data } = await getOpenedBottles()
      if (data) {
        commit('SET_OPENED_BOTTLES', data)
      }
    } catch (e) {
      console.error(e)
    }
  },
  fetchAddedBottles: async ({ state, commit }: any) => {
    try {
      let { data } = await getAddedBottles()
      if (data) {
        commit('SET_ADDED_BOTTLES', data)
      }
    } catch (e) {
      console.error(e)
    }
  },
  increaseBottleQty: async (
    { state, commit }: any,
    info: { bottleId: number; qty: number }
  ) => {
    try {
      increaseBottleQty(info.bottleId, info.qty)
    } catch (e) {
      console.error(e)
    }
  },
  decreaseBottleQty: async (
    { state, commit }: any,
    info: { bottleId: number; qty: number }
  ) => {
    try {
      decreaseBottleQty(info.bottleId, info.qty)
    } catch (e) {
      console.error(e)
    }
  },
}

const mutations = {
  SET_BOTTLES: (state: { bottles: any[] }, bottles: any[]) => {
    state.bottles = bottles
  },
  RESET_BOTTLES: (state: { bottles: never[] }) => {
    state.bottles = []
  },
  ADD_BOTTLE: (state: { bottles: any[] }, bottle: Bottle) => {
    state.bottles.unshift(bottle)
  },
  DELETE_BOTTLE: (state: { bottles: any[] }, bottle: Bottle) => {
    state.bottles = state.bottles.filter((b) => b.id !== bottle.id)
  },
  MODIFY_BOTTLE: (state: { bottles: any[] }, bottle: Bottle) => {
    let bottleFinded = state.bottles.find((item: any) => {
      return bottle.id === item.id
    })
    if (bottleFinded) {
      Object.assign(bottleFinded, bottle)
    }
  },
  SET_OPENED_BOTTLES: (state: { openedBottles: any[] }, bottles: any[]) => {
    state.openedBottles = bottles
  },
  SET_ADDED_BOTTLES: (state: { addedBottles: any[] }, bottles: any[]) => {
    state.addedBottles = bottles
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
