<template>
  <Navbar />
  <router-view />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "@/views/layout/Navbar.vue";
import Footer from "@/views/layout/Footer.vue";
import store from "@/store";

export default defineComponent({
  name: "App",
  components: {
    Navbar,
    Footer,
  },
  /* mounted() {
    store.dispatch('getUser')
    store.dispatch('getUserData')
  } */
});
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --eam-ivory: #e2ded0;
  --eam-gray: #746c70;
  --eam-cool-gray: #4e4f50;
  --eam-blue: #517ea3;
  --eam-blue-gray: #647c90;
}

body {
  background: #f0f2f5;
  font-family: "Poppins", sans-serif;
  line-height: 1.5;
  letter-spacing: 0.2px;
}

a {
  color: #fff;
  text-decoration: none;
}

ul {
  list-style-type: none;
}

img {
  display: block;
  width: 100%;
}

section {
  padding: 1em 1em;
}

.container {
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 0 1em;
}

.container > * {
  flex-basis: 100%;
}

.eam-flex-col {
  display: flex;
  flex-direction: column;
}

.eam-notify {
  color: var(--eam-blue-gray);
  margin-bottom: 1em;
}

input,
textarea {
  display: block;
  width: 100%;
  padding: 1em;
  margin-bottom: 1.2em;
  border: 1px solid #000;
}

.error {
  color: crimson;
  text-align: center;
  margin-top: 1em;
}

.success {
  color: rgb(13, 100, 39);
  text-align: center;
  margin-top: 1em;
}
</style>
