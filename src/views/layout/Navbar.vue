<template>
  <header>
    <div class="container">
      <div class="eam-logo">
        <router-link :to="{ name: 'Home' }">
          <span>EAM</span>resume
          </router-link>
      </div>
      <nav>
        <router-link :to="{ name: 'Home' }">Home</router-link>
        <router-link :to="{ name: 'Contact' }">Contact</router-link>
        <router-link :to="{ name: 'Login' }">Login</router-link>
        <router-link :to="{ name: 'Format' }">
          <div class="eam-create">
            CREATE
          </div>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Navbar',
  components: {},
});
</script>

<style scoped>
header {
  background-color: var(--eam-gray);
  padding: 1em;
}
.eam-logo {
  font-size: 2rem;
  font-weight: bold;
}
.eam-logo span {
  color: var(--eam-ivory);
}

nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

nav a {
  padding: 0 1em;
}

nav a:last-child{
  padding: 0;
}
.eam-create {
  color: var(--eam-ivory);
  font-weight: bold;
  border: 1px solid var(--eam-ivory);
  padding: 0.5em 1em;
}
</style>