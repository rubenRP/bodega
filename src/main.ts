import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import messages from './i18n/es'
import './index.css'
import router from './router'
import store from './store'

/* auth.onAuthStateChanged((user) => {
  store.dispatch('fetchUser', user)
}) */

library.add(fas)
library.add(far)

const i18n = createI18n({
  locale: 'es',
  fallbackLocale: 'en',
  messages,
})

createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .component('FAIcon', FontAwesomeIcon)
  .mount('#app')
