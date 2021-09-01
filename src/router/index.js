import Vue from 'vue'
import VueRouter from 'vue-router'
import Detail from "../views/detail/Detail";

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
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: ()=> import('../views/detail/Detail')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
