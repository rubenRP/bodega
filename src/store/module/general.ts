const state = () => ({
  darkMode: false,
  sidebar: false,
  messages: [],
})

let messageId = 0

const getters = {
  darkMode: (state: { darkMode: boolean }) => state.darkMode,
  sidebar: (state: { sidebar: boolean }) => state.sidebar,
  messages: (state: { messages: any[] }) => state.messages,
}

const mutations = {
  TOGGLE_DARK_MODE(state: { darkMode: boolean }) {
    state.darkMode = !state.darkMode
  },
  TOGGLE_SIDEBAR(state: { sidebar: boolean }) {
    state.sidebar = !state.sidebar
  },
  CLOSE_SIDEBAR(state: { sidebar: boolean }) {
    state.sidebar = false
  },
  PUSH_MESSAGE(state: any, message: any) {
    state.messages.push(message)
  },
  DELETE_MESSAGE(state: any, messageId: any) {
    state.messages = state.messages.filter(
      (message: { id: number }) => message.id !== messageId
    )
  },
}

const actions = {
  addMessage({ commit }: any, message: {}) {
    commit('PUSH_MESSAGE', {
      ...message,
      id: messageId++,
    })
  },
  removeMessage({ commit }: any, messageId: number) {
    commit('DELETE_MESSAGE', messageId)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
