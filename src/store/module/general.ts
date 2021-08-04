const state = () => ({
  darkMode: false,
  sidebar: false,
})

const getters = {
  darkMode: (state: { darkMode: boolean }) => state.darkMode,
  sidebar: (state: { sidebar: boolean }) => state.sidebar,
}

const mutations = {
  TOGGLE_DARK_MODE(state: { darkMode: boolean }) {
    state.darkMode = !state.darkMode
  },
  TOGGLE_SIDEBAR(state: { sidebar: boolean }) {
    state.sidebar = !state.sidebar
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
}
