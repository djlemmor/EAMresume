<template>
  <header>
    <div class="container">
      <div class="eam-logo">
        <router-link :to="{ name: 'Home' }">
          <span>EAM</span>resume
        </router-link>
      </div>
      <template v-if="userIsReady">
        <nav>
          <router-link :to="{ name: 'Home' }" class="eam-navlinks"
            >Home</router-link
          >
          <router-link :to="{ name: 'Contact' }" class="eam-navlinks"
            >Contact</router-link
          >
          <router-link :to="{ name: 'Login' }" v-if="!user" class="eam-navlinks"
            >Login</router-link
          >
          <router-link :to="{ name: 'Dashboard' }" v-else class="eam-navlinks"
            >Dashboard</router-link
          >
          <router-link :to="{ name: 'Format' }">
            <div class="eam-create">CREATE</div>
          </router-link>
        </nav>
      </template>
    </div>
  </header>
</template>

<script lang="ts">
import store from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Navbar",
  components: {},
  setup() {
    return {
      user: computed(() => store.state.user),
      userIsReady: computed(() => store.state.userIsReady),
    };
  },
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
  position: relative;
}

nav a:last-child {
  padding: 0;
}
.eam-create {
  color: var(--eam-ivory);
  font-weight: bold;
  border: 1px solid var(--eam-ivory);
  padding: 0.5em 1em;
}
.eam-create:hover {
  color: var(--eam-cool-gray);
  background-color: var(--eam-ivory);
}
.eam-navlinks::after {
  content: "";
  position: absolute;
  bottom: -1.5em;
  left: 0;
  height: 2px;
  width: 0;
  background: #fff;
  pointer-events: none;
  transition: width 200ms linear;
}

.eam-navlinks:hover::after {
  width: 100%;
}
</style>