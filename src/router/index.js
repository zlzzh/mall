import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    //components:Home(),愚蠢的写法！！！
    name: 'home',
    component:() => import('../views/home/Home')
  }
  ,
  {
    path: '/categary',
    name: 'categary',
    component:() => import('../views/categary/Categary')
  }
  ,
  {
    path: '/cart',
    name: 'cart',
    component:() => import('../views/cart/Cart')
  }
  ,
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/profile/Profile')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
