import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = ()=>import('../views/home/Home')
const Category = ()=>import('../views/category/CateGory')
const Cart =()=>import('../views/cart/Cart')
const Profile = ()=>import('../views/profile/Profile')
const Detaill =()=>import('../views/detaill/Detaill')
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path :'',
      redirect :'/home'
    },
    {
      path: '/home',
      component:Home
    },
    {
      path :'/cart',
      component:Cart
    },
    {
      path :'/profile',
      component:Profile
    },
    {
      path :'/category',
      component:Category
    },
    {
      path : '/detaill/:iid',
      component : Detaill
    }
  ],
  mode:'history'
})
