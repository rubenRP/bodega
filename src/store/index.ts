import { createStore } from 'vuex'
import general from './module/general'
import user from './module/user'
import cellar from './module/cellar'
import reviews from './module/reviews'

export default createStore({
  modules: { general, user, cellar, reviews },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
})
