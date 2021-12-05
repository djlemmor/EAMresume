<template>
  <vue-element-loading :active="userData.status == 'notlogin'" is-full-screen />
  <section class="eam-dashboard">
    <div class="container">
      <h1>Dashboard</h1>
      <p>Display Name: {{ userData.name }}</p>
      <p class="email">Email: {{ userData.email }}</p>
      <div>
        <button @click="eamSignout" class="eam-button-logout">LOGOUT</button>
      </div>
      <div class="error">{{ error }}</div>
    </div>
  </section>
</template>

<script lang="ts">
import store from "@/store";
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { isLoggin } from "@/helpers/authHelper";
import VueElementLoading from "vue-element-loading";

export default defineComponent({
  name: "Dashboard",
  components: {
    VueElementLoading,
  },
  setup() {
    const router = useRouter();
    const error = ref("");
    const disable = ref(true);

    const eamSignout = async () => {
      try {
        await store.dispatch("signout");
        router.push({ name: "Home" });
      } catch (err: any) {
        console.log(err);
        error.value = err;
      }
    };

    if (!isLoggin()) {
      router.push({ name: "Login" });
    }

    store.dispatch("getUserData");

    return {
      error,
      disable,
      eamSignout,
      userData: computed(() => store.state.userData),
    };
  },
});
</script>

<style scoped>
.container {
  flex-direction: column;
}
.container > * {
  margin-bottom: 1em;
}
.eam-button-logout {
  padding: 1em 1.5em;
  border: none;
  cursor: pointer;
  background-color: var(--eam-blue-gray);
  color: #fff;
  font-weight: bold;
}

.eam-button-logout:hover {
  background-color: var(--eam-blue);
}
</style>
