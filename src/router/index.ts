import { createWebHistory, createRouter } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Cellar from '../views/Cellar.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Cellar,
    meta: {
      requiresAuth: true,
      layout: 'DefaultLayout',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      layout: 'AuthLayout',
    },
  },
  {
    path: '/cellar',
    name: 'Cellar',
    component: Cellar,
    meta: {
      requiresAuth: true,
      layout: 'DefaultLayout',
    },
  },
  {
    path: '/reviews',
    name: 'Reviews',
    component: Home,
    meta: {
      requiresAuth: true,
      layout: 'DefaultLayout',
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Home,
    meta: {
      requiresAuth: true,
      layout: 'DefaultLayout',
    },
  },
  { path: '/404', component: NotFound },
  { path: '/:pathMatch(.*)*', redirect: '/404' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
