import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import './index.css'
import router from './router'
import store from './store'
// import { auth } from './firebase'
import messages from './i18n/es'

/* auth.onAuthStateChanged((user) => {
  store.dispatch('fetchUser', user)
}) */

const i18n = createI18n({
  locale: 'es',
  fallbackLocale: 'en',
  messages,
})

createApp(App).use(store).use(router).use(i18n).mount('#app')
