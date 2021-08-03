import { createStore } from 'vuex'
import { supabase } from '../supabase'

export default createStore({
  state: {
    user: {
      loggedIn: false,
      data: <any>{},
      initials: '',
      cellarId: 0,
    },
    darkMode: false,
    sidebar: false,
    cellar: <any>[],
  },
  getters: {
    user(state) {
      return state.user
    },
    userInitials(state) {
      return state.user.initials
    },
    loggedIn(state) {
      return state.user.loggedIn
    },
    darkMode(state) {
      return state.darkMode
    },
    sidebar(state) {
      return state.sidebar
    },
    cellar: (state) => state.cellar,
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value
    },
    SET_USER(state, data) {
      state.user.data = data
    },
    SET_INITIALS(state, value) {
      state.user.initials = value
    },
    SET_CELLAR_ID(state, value) {
      state.user.cellarId = value
    },
    TOGGLE_DARK_MODE(state) {
      state.darkMode = !state.darkMode
    },
    TOGGLE_SIDEBAR(state) {
      state.sidebar = !state.sidebar
    },
    SET_CELLAR: (state, cellar) => {
      state.cellar = cellar
    },
    RESET_CELLAR: (state) => {
      state.cellar = []
    },
    ADD_BOTTLE: (state, bottle) => {
      state.cellar.push(bottle)
    },
    MODIFY_BOTTLE: (state, bottle) => {
      let bottleFinded = state.cellar.find((item: any) => {
        return bottle.id === item.id
      })
      bottleFinded.name = bottle.name
      bottleFinded.cellar = bottle.cellar
      bottleFinded.qty = bottle.qty
    },
  },
  actions: {
    async fetchUser({ commit }, user) {
      commit('SET_LOGGED_IN', user != null)
      if (user) {
        commit('SET_USER', user)
        try {
          let { data, error, status } = await supabase
            .from('profiles')
            .select('initials, cellar_id')
            .eq('id', user.id)
            .single()
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
  },
  modules: {},
})
