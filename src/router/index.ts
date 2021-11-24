import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/pages/Home.vue'
import Contact from '@/views/pages/Contact.vue'
import Login from '@/views/pages/Login.vue'
import Register from '@/views/pages/Register.vue'
import Format from '@/views/pages/Format.vue'
import NotFound from '@/views/pages/NotFound.vue'
import Basic from '@/views/resume/Basic.vue'
import Dashboard from '@/views/pages/Dashboard.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/format',
    name: 'Format',
    component: Format
  },
  {
    path: '/basic',
    name: 'Basic',
    component: Basic
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
