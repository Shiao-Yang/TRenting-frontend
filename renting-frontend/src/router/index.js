import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import Register from "@/views/Register.vue";
import InfoView from "@/views/InfoView";
import OrderView from "@/views/OrderView";
import CartView from "@/views/CartView";
import TicketView from "@/views/TicketView";
import test from "@/views/test";
import TicketTestView from "@/views/TicketTestView";
import ComplainView from "@/views/ComplainView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/info',
    name: 'info',
    component: InfoView
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/ticket',
    name: 'ticket',
    component: TicketView
  },
  {
    path: '/test',
    name: 'test',
    component: test
  },
  {
    path: '/ticket_test',
    name: 'ticket_test',
    component: TicketTestView
  },
  {
    path: '/complain',
    name: 'complain',
    component: ComplainView
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
