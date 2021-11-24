<template>
  <section class="eam-login">
    <div class="container">
      <div class="eam-login-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" 
          stroke="#fff" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round">
          <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/>
          <circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/>
        </svg>
        <form @submit.prevent="eamLogin">
          <label>Email</label>
            <input v-model="email" type="email" required>
          <label>Password</label>
            <input v-model="password" type="password" required>
          <div class="eam-buttons">
            <button>Login</button>
            <router-link :to="{ name: 'Register' }">Register</router-link>
          </div>
        </form>
      </div>
      <div class="error">{{ error }}</div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import fireSignin from '@/helpers/fireSignin'
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Login',
  components: {},
  setup(){
    const email = ref('');
    const password = ref('');
    const { error, signin } = fireSignin()
    const router = useRouter()

    error.value = null
    const eamLogin = async () => {
      await signin(email.value, password.value)
      if(!error.value) {
        router.push({ name: 'Dashboard' })
      }
    }

    return { email, password, error, eamLogin }
  }
});
</script>

<style scoped>
  .eam-login {
    padding: 6em 0;
  }
  .eam-login .container {
    flex-direction: column;
  }
  .eam-login-container {
    margin: 0 10em;
    padding: 2em;
    background-color: var(--eam-blue-gray);
    color: #fff;
    text-align: center;
  }
  
  .eam-login-container svg {
    margin-top: -5em;
    background-color: #647C90;
    border-radius: 50%;
  }

  .eam-login-container form {
    text-align: left;
  }

  .eam-login-container input {
    width: 100%;
    padding: 1em;
    margin: 1em 0;
  }

  .eam-login-container label {
    font-size: 1.2rem;
  }

  .eam-login-container h2 {
    font-size: 2rem;
  }
      
  .eam-login-container button {
    font-size: 1.2rem;
    padding: 0.8em 2em;
    border: 1px solid var(--eam-cool-gray);
    border-radius: 100px;
    font-weight: bold;
    cursor: pointer;
  }

  .eam-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: underline;
    margin-top: 1em;
  }

</style>
