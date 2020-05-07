import { RouteConfig } from 'vue-router'
import store from 'src/store'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/PocLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/Notifications.vue') }
    ],
    beforeEnter: (to, from, next) => next(!store.state.auth.username ? { name: 'login' } : undefined)
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'login', component: () => import('pages/Login.vue') }
    ],
    beforeEnter: (to, from, next) => next(store.state.auth.username ? { name: 'home' } : undefined)
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
