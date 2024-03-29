<template>
  <vue-element-loading :active="disable" is-full-screen />
  <section class="eam-login">
    <div class="container">
      <div class="eam-login-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
          <circle cx="12" cy="10" r="3" />
          <circle cx="12" cy="12" r="10" />
        </svg>
        <form @submit.prevent="eamLogin">
          <label>Email</label>
          <input v-model="email" type="email" required />
          <label>Password</label>
          <input v-model="password" type="password" required />
          <div class="eam-buttons">
            <button :disabled="disable" class="eam-button-login">Login</button>
            <router-link :to="{ name: 'Register' }" class="eam-button-register"
              >Register</router-link
            >
          </div>
        </form>
      </div>
      <div class="error">{{ error }}</div>
    </div>
  </section>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { isLoggin } from "@/helpers/authHelper";
import VueElementLoading from "vue-element-loading";

export default defineComponent({
  name: "Login",
  components: {
    VueElementLoading,
  },
  setup() {
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const disable = ref(false);

    const router = useRouter();

    const eamLogin = async () => {
      disable.value = true;
      const userCred = {
        email: email.value,
        password: password.value,
      };
      try {
        await store.dispatch("signin", userCred);
        router.push({ name: "Dashboard" });
      } catch (err: any) {
        console.log(err);
        if (err.code == "auth/wrong-password") {
          error.value = "Wrong Password";
        } else if (err.code == "auth/user-not-found") {
          error.value = "Wrong Email or Password";
        } else {
          error.value = err.code;
        }
        disable.value = false;
      }
    };

    if (isLoggin()) {
      router.push({ name: "Dashboard" });
    }

    return { email, password, disable, error, eamLogin };
  },
});
</script>

<style scoped>
.eam-login {
  padding: 12em 0;
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
  background-color: #647c90;
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

.eam-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2em;
}

.eam-button-login {
  font-size: 1.2rem;
  padding: 0.8em 2em;
  border: none;
  font-weight: bold;
  cursor: pointer;
}

.eam-button-login:hover {
  background-color: #fff;
}

.eam-button-register {
  font-size: 1.2rem;
  cursor: pointer;
}

.eam-button-register:hover {
  color: var(--eam-ivory);
}
</style>
