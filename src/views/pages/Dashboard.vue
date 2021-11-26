<template>
  <section class="eam-dashboard">
    <div class="container">
      <h1>Dashboard</h1>
      <img :src="documentData?.photoURL" alt="Profile Pic" v-if="documentData?.photoURL">
      <p>Display Name: {{ documentData?.name }}</p>
      <p class="email">Email: {{ documentData?.email }} </p>
      <p class="mobile">Mobile: {{ documentData?.mobile }} </p>
      <p class="address">Address: {{ documentData?.address }} </p>
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
import fireUser from '@/helpers/fireUser'

export default defineComponent({
  name: 'Dashboard',
  components: {},
  setup() {
    const router = useRouter()
    const { error, signout } = fireSignout()
    const { user } = fireUser()
    const { documentData, getCollection } = fireGetCollection()

    error.value = null
    const eamSignout = async () => {
      await signout()
      if(!error.value) {
        router.push({ name: 'Home' })
      }
    }

    if(!user.value) {
      router.push({ name: 'Login' })
    } else {
      getCollection()
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

img {
  width: 10rem;
}
</style>
