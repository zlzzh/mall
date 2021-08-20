import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Home = () => import('../views/home/Home.vue')
const Categary = () => import('../views/categary/Categary.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Profile = () => import('../views/profile/Profile.vue')

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    components:Home()
  }
  ,
  {
    path: '/categary',
    components:Categary()
  }
  ,
  {
    path: '/cart',
    components:Cart()
  }
  ,
  {
    path: '/profile',
    components:Profile()
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
