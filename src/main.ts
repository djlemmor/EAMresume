import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { firebaseAuth } from '@/firebase/config'
import { onAuthStateChanged } from "firebase/auth";

/* createApp(App).use(store).use(router).mount('#app') */
let app: any

onAuthStateChanged(firebaseAuth, () => {
  if (!app) {
    app = createApp(App).use(store).use(router).mount('#app')
  }
})
