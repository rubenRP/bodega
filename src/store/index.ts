import { createStore } from 'vuex'
import general from './module/general'
import user from './module/user'
import bottles from './module/bottles'
import reviews from './module/reviews'

export default createStore({
  modules: { general, user, bottles, reviews },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
})
