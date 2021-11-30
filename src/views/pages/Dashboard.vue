<template>
  <section class="eam-dashboard">
    <div class="container">
      <h1>Dashboard</h1>
      <p>Display Name: {{ user?.displayName }}</p>
      <p class="email">Email: {{ user?.email }}</p>
      <div>
        <button @click="eamSignout" class="eam-button-logout">LOGOUT</button>
      </div>
      <div class="error">{{ error }}</div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import fireSignout from "@/helpers/fireSignout";
import fireUser from "@/helpers/fireUser";

export default defineComponent({
  name: "Dashboard",
  components: {},
  setup() {
    const router = useRouter();
    const { user } = fireUser();
    const { error, signout } = fireSignout();

    error.value = null;
    const eamSignout = async () => {
      await signout();
      if (!error.value) {
        router.push({ name: "Home" });
      }
    };

    /* if(!user.value) {
      router.push({ name: 'Login' })
    } */

    return { error, user, eamSignout };
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
