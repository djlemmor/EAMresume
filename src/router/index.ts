import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/pages/Home.vue'
import Contact from '@/views/pages/Contact.vue'
import Login from '@/views/pages/Login.vue'
import Register from '@/views/pages/Register.vue'
import Format from '@/views/pages/Format.vue'
import NotFound from '@/views/pages/NotFound.vue'
import Dashboard from '@/views/pages/Dashboard.vue'
import ResumeForm from '@/views/resume/ResumeForm.vue'
import Test from '@/components/Test.vue'

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
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/resumeform/:section',
    name: 'ResumeForm',
    component: ResumeForm,
    props: true
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
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
