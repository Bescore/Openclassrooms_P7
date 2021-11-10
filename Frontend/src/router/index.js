import { createRouter, createWebHistory } from 'vue-router'
import connecter from '../views/connecter.vue'
import poster from '../views/poster.vue'
import compte from '../views/compte.vue'
const routes = [
  {
    path: '/',
    name: 'connection',
    component: connecter
  },
  {
    path: '/inscrire',
    name: 'inscription',
    component: () => import(/* webpackChunkName: "about" */ '../views/inscrire.vue')
  },
  {
    path: '/feed',
    name:' post',
    component: poster
  },
  {
    path: '/compte',
    name: 'compte',
    component:compte
  }
  ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
