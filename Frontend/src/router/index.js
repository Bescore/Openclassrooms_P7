import { createRouter, createWebHistory } from 'vue-router'
import connecter from '../views/MaConnecter.vue'
import poster from '../views/MaPoster.vue'
import compte from '../views/MaCompte.vue'
const routes = [
  {
    path: '/',
    name: 'MaConnection',
    component: connecter
  },
  {
    path: '/inscrire',
    name: 'MaInscription',
    component: () => import(/* webpackChunkName: "about" */ '../views/MaInscrire.vue' )
  },
  {
    path: '/feed',
    name: ' MaPost',
    component: poster
  },
  {
    path: '/compte',
    name: 'MyCompte',
    component: compte
  }
]

const router = createRouter( {
  history: createWebHistory( process.env.BASE_URL ),
  routes
} )

export default router
