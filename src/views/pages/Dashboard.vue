<template>
  <section class="eam-dashboard">
    <div class="container">
      <h1>Dashboard</h1>
      <p>Display Name: {{ user?.displayName }}</p>
      <p class="email">Email: {{ user?.email }} </p>
      <div>
        <button @click="eamSignout" class="logout">Logout</button>
      </div>
      <div class="error">{{ error }}</div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import fireUser from '@/helpers/fireUser'
import fireSignout from '@/helpers/fireSignout'
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Dashboard',
  components: {},
  setup() {
    const { user } = fireUser()
    const { error, signout } = fireSignout()
    const router = useRouter()

    error.value = null
    const eamSignout = async () => {
      await signout()
      if(!error.value) {
        router.push({ name: 'Home' })
      }
    }

    return { user, error, eamSignout }
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
