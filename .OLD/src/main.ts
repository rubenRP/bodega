import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import messages from './i18n/es'
import './index.css'
import router from './pages/routes'

/* auth.onAuthStateChanged((user) => {
  store.dispatch('fetchUser', user)
}) */

library.add(fas)

const i18n = createI18n({
  locale: 'es',
  fallbackLocale: 'en',
  messages,
})

createApp(App)
  .use(createPinia())
  .use(router)
  .use(i18n)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
