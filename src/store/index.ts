import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      loggedIn: false,
      data: <any>{},
    },
    darkMode: false,
    sidebar: false,
    cellar: <any>[],
  },
  getters: {
    user(state) {
      return state.user
    },
    userInitials() {
      return 'RR'
    },
    isLoggedIn(state) {
      return state.user.loggedIn
    },
    isDarkMode(state) {
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
    fetchUser({ commit }, user) {
      commit('SET_LOGGED_IN', user != null)
      if (user) {
        commit('SET_USER', user)
      } else {
        commit('SET_USER', null)
      }
    },
  },
  modules: {},
})
