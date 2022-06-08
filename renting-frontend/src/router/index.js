import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InfoView from "@/views/InfoView"
import ListView from "@/views/ListView"
import DetailsView from "@/views/DetailsView"
import confirmOrder from "@/views/ConfirmOrder"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/info',
    name: 'info',
    component: InfoView,
  },
  {
    path: '/list',
    name: "list",
    component: ListView,
  },
  {
    path: '/details',
    name: "details",
    component: DetailsView,
  },
  {
    path: '/confirm',
    component: confirmOrder,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
