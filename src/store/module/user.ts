import { getProfileInfo } from '@/api/user'

const state = () => ({
  loggedIn: false,
  data: <any>{},
  initials: '',
  cellarId: 0,
})

const getters = {
  data: (state: { data: {} }) => state.data,
  initials: (state: { initials: string }) => state.initials,
  loggedIn: (state: { loggedIn: boolean }) => state.loggedIn,
  cellarId: (state: { cellarId: any }) => state.cellarId,
}

const actions = {
  async fetchUser({ commit }: any, user: { id: any } | null) {
    commit('SET_LOGGED_IN', user != null)
    if (user) {
      commit('SET_USER', user)
      try {
        let { data, error, status } = await getProfileInfo(user.id)
        if (error && status !== 406) throw error

        if (data) {
          commit('SET_INITIALS', data.initials)
          commit('SET_CELLAR_ID', data.cellar_id)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      commit('SET_USER', null)
    }
  },
}

const mutations = {
  SET_LOGGED_IN(state: { loggedIn: boolean }, value: boolean) {
    state.loggedIn = value
  },
  SET_USER(state: { data: {} }, data: {}) {
    state.data = data
  },
  SET_INITIALS(state: { initials: string }, value: string) {
    state.initials = value
  },
  SET_CELLAR_ID(state: { cellarId: any }, value: any) {
    state.cellarId = value
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
