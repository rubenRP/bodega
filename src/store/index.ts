import { createStore } from 'vuex'
import general from './module/general'
import user from './module/user'
import cellar from './module/cellar'

export default createStore({
  modules: { general, user, cellar },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
})
