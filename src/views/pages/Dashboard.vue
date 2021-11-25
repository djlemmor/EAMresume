<template>
  <section class="eam-dashboard">
    <div class="container">
      <h1>Dashboard</h1>
      <p>Display Name: {{ documentData?.name }}</p>
      <p class="email">Email: {{ documentData?.email }} </p>
      <p class="email">Mobile: {{ documentData?.mobile }} </p>
      <p class="email">Address: {{ documentData?.address }} </p>
      <div>
        <button @click="eamSignout" class="logout">LOGOUT</button>
      </div>
      <div class="error">{{ error }}</div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import fireSignout from '@/helpers/fireSignout'
import fireGetCollection from '@/helpers/fireGetCollection'

export default defineComponent({
  name: 'Dashboard',
  components: {},
  setup() {
    const router = useRouter()
    const { error, signout } = fireSignout()
    const { documentData, getCollection } = fireGetCollection()
    getCollection()
  
    error.value = null
    const eamSignout = async () => {
      await signout()
      if(!error.value) {
        router.push({ name: 'Home' })
      }
    }

    return { error, documentData, eamSignout }
  }
});
</script>

<style scoped>
.container {
  flex-direction: column;
}
.container > * {
  margin-bottom: 1em;
}
.logout {
  padding: 1em 1.5em;
  border: none;
  cursor: pointer;
  background-color: var(--eam-blue-gray);
  color: #fff;
  font-weight: bold;
}
</style>
