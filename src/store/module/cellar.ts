import api from '../../api'

const state = () => ({
  cellar: <any>[],
})

const getters = {
  cellar: (state: { cellar: [] }) => state.cellar,
}

const actions = {
  fetchCellar: async ({ commit }: any) => {
    try {
      let { data, error, status } = await api.getCellarBottles()
      if (error && status !== 406) throw error
      if (data) {
        commit('SET_CELLAR', data)
      }
    } catch (error) {
      alert(error.message)
    }
  },
}

const mutations = {
  SET_CELLAR: (state: { cellar: any[] }, cellar: any[]) => {
    state.cellar = cellar
  },
  RESET_CELLAR: (state: { cellar: never[] }) => {
    state.cellar = []
  },
  ADD_BOTTLE: (state: { cellar: any[] }, bottle: {}) => {
    state.cellar.push(bottle)
  },
  MODIFY_BOTTLE: (
    state: { cellar: any[] },
    bottle: { id: number; name: string; cellar: string; qty: number }
  ) => {
    let bottleFinded = state.cellar.find((item: any) => {
      return bottle.id === item.id
    })
    bottleFinded.name = bottle.name
    bottleFinded.cellar = bottle.cellar
    bottleFinded.qty = bottle.qty
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
