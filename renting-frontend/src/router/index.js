import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import InfoView from "@/views/Home/InfoView"
import ListView from "@/views/BroseHouse/ListView"
import DetailsView from "@/views/BroseHouse/DetailsView"
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
