import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/home.vue'
import LoginPage from '../views/login.vue'
import RegisterPage from '../views/register.vue'
import ListPage from '../views/listSong.vue'
import FavoritePage from '../views/favorite.vue'
import DetailSong from "../views/detail-song.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: "dashboard"
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/list-songs',
      name: 'list-songs',
      component: ListPage
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: FavoritePage
    },
    {
      path: '/detailSong/:id',
      name: 'detail-song',
      component: DetailSong
    },

  ]
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.access_token
  if (isAuthenticated && to.name === 'login') next('/dashboard') // jika sudah login dan mengakses halaman login, redirect ke dashboard
  if (isAuthenticated && to.name === "register") next('/dashboard')
  if (!isAuthenticated && to.name === "favorite") next('/dashboard')
  else next() // lanjutkan ke halaman yang diminta
})


export default router
