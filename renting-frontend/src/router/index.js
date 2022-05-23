import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

const Admin = () => import('../views/Admin.vue')
const AdminUser = () => import('../views/AdminUser.vue')
const AdminOrder = () => import('../views/AdminOrder.vue')
const AdminHouse = () => import('../views/AdminHouse.vue')
const AdminTicket = () => import('../views/AdminTicket.vue')
const AdminContract = () => import('../views/AdminContract.vue')

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
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    redirect: '/admin/user',
    children:[

      {
        path: 'user',
        name: 'adminUser',
        component: AdminUser,
      },
      {
        path: 'order',
        name: 'adminOder',
        component: AdminOrder,
      },
      {
        path: 'house',
        name: 'adminHouse',
        component: AdminHouse,
      },
      {
        path: 'ticket',
        name: 'adminTicket',
        component: AdminTicket,
      },
      {
        path: 'contract',
        name: 'adminContract',
        component: AdminContract,
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
