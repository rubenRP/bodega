import { useGeneralStore } from '@/stores/general'
import { useUserStore } from '@/stores/user'
import Bottle from '@/views/Bottle.vue'
import Bottles from '@/views/Bottles.vue'
import Cellar from '@/views/Cellar.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import NotFound from '@/views/NotFound.vue'
import Profile from '@/views/Profile.vue'
import Reviews from '@/views/Reviews.vue'
import Stats from '@/views/Stats.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
    path: '/bottle/:id',
    name: 'Bottle',
    component: Bottle,
    meta: {
      requiresAuth: true,
      layout: 'DefaultLayout',
    },
  },
  {
    path: '/bottles',
    name: 'Bottles',
    component: Bottles,
    meta: {
      requiresAuth: true,
      layout: 'DefaultLayout',
    },
  },
  {
    path: '/reviews',
    name: 'Reviews',
    component: Reviews,
    meta: {
      requiresAuth: true,
      layout: 'DefaultLayout',
    },
  },
  {
    path: '/stats',
    name: 'Stats',
    component: Stats,
    meta: {
      requiresAuth: true,
      layout: 'DefaultLayout',
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
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
  const userStore = useUserStore()
  const generalStore = useGeneralStore()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!userStore.loggedIn) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
  generalStore.closeSidebar()
})

export default router
