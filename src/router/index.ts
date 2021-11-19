import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/pages/Home.vue'
import About from '@/views/pages/About.vue'
import Contact from '@/views/pages/Contact.vue'
import Login from '@/views/pages/Login.vue'
import Create from '@/views/pages/Create.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
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
    path: '/create',
    name: 'Create',
    component: Create
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
