<template>
  <vue-element-loading :active="checked" is-full-screen />
  <Navbar />
  <router-view />
  <Footer />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Navbar from "@/views/layout/Navbar.vue";
import Footer from "@/views/layout/Footer.vue";
import { isLoggin } from "@/helpers/authHelper";
import VueElementLoading from "vue-element-loading";
import store from "@/store";

export default defineComponent({
  name: "App",
  components: {
    Navbar,
    Footer,
    VueElementLoading,
  },
  setup() {
    const checked = ref(false);

    if (isLoggin()) {
      (async function () {
        try {
          checked.value = true;
          await store.dispatch("getUserData");
          checked.value = false;
        } catch (err: any) {
          checked.value = false;
        }
      })();
    }

    return {
      checked,
    };
  },
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
  max-width: 1200px;
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
