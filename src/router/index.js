import { createRouter, createWebHistory } from 'vue-router'
import connecter from '../views/connecter.vue'

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
  ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
