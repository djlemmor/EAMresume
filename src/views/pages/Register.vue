<template>
  <section class="eam-register">
    <div class="container">
      <div class="eam-register-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" 
          stroke="#fff" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round">
          <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/>
          <circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/>
        </svg>
        <form @submit.prevent="eamRegister">
          <label>Display Name</label>
            <input v-model="displayName" type="text" required>
          <label>Email</label>
            <input v-model="email" type="email" required>
          <label>Password</label>
            <input v-model="password" type="password" required>
          <button :disabled="disable">Register</button>
        </form>
      </div>
      <div class="error">{{ error }}</div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import fireSignup from '@/helpers/fireSignup'
import fireUser from '@/helpers/fireUser'

export default defineComponent({
  name: 'Register',
  components: {},
  setup(){
    const displayName = ref('')
    const email = ref('')
    const password = ref('')
    const disable = ref(false)
    const { user } = fireUser()
    const { error, signup } = fireSignup()
    const router = useRouter()

    error.value = null
    const eamRegister = async () => { 
      disable.value = true
      await signup(email.value, password.value, displayName.value)
      if(!error.value) {
        router.push({ name: 'Dashboard' })
      } else {
        disable.value = false
      }
    }

    if(user.value) {
      router.push({ name: 'Dashboard' })
    }

    return { displayName, email, password, disable, error, eamRegister }
  }
});
</script>

<style scoped>
  .eam-register {
    padding: 6em 0;
  }
  .eam-register .container {
    flex-direction: column;
  }
  .eam-register-container {
    margin: 0 10em;
    padding: 2em;
    background-color: var(--eam-blue-gray);
    color: #fff;
    text-align: center;
  }
  
  .eam-register-container svg {
    margin-top: -5em;
    background-color: #647C90;
    border-radius: 50%;
  }

  .eam-register-container form {
    text-align: left;
  }

  .eam-register-container input {
    width: 100%;
    padding: 1em;
    margin: 1em 0;
  }

  .eam-register-container label {
    font-size: 1.2rem;
  }

  .eam-register-container h2 {
    font-size: 2rem;
  }
      
  .eam-register-container button {
    font-size: 1.2rem;
    padding: 0.8em 2em;
    border: none;
    font-weight: bold;
    cursor: pointer;
    margin-top: 1em;
  }

  .eam-register-container button:hover {
    background-color: #fff;
  }

</style>
