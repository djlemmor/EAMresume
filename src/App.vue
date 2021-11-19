<template>
  <Navbar />
    <router-view/>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/views/layout/Navbar.vue';
import Footer from '@/views/layout/Footer.vue';

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    Footer
  },
});
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

:root {
    --eam-gray: #746C70;
    --eam-cool-gray: #4E4F50;
    --eam-ivory: #E2DED0;
    --eam-blue-gray: #647C90;
}

body {
    background: #f0f2f5;
    font-family: 'Poppins', sans-serif;
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
}
</style>
