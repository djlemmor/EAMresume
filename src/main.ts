import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VueCookieNext } from 'vue-cookie-next'

VueCookieNext.config({
  expire: '2h',
  path: '/',
  sameSite: 'Strict'
});

createApp(App).use(store).use(router).use(VueCookieNext).mount('#app')
