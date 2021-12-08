<template>
  <section class="eam-home">
    <div class="container">
      <div class="eam-home-left eam-flex-col">
        <h2>Easy To Use and Free.</h2>
        <h1>Creating A Resume Just Got Easy.</h1>
        <div class="eam-create">
          <router-link :to="{ name: 'Format' }">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#fff"
            >
              <path
                d="M18 14.45v6.55h-16v-12h6.743l1.978-2h-10.721v16h20v-10.573l-2 2.023zm1.473-10.615l1.707 1.707-9.281 9.378-2.23.472.512-2.169 9.292-9.388zm-.008-2.835l-11.104 11.216-1.361 5.784 5.898-1.248 11.103-11.218-4.536-4.534z"
              />
            </svg>
            CREATE YOUR RESUME NOW
          </router-link>
        </div>
      </div>
      <div class="eam-home-right">
        <img src="@/assets/resume.png" alt="resume photo" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {},
});
</script>

<style scoped>
.eam-home {
  padding: 8.2em 0;
}

.eam-home .container {
  align-items: center;
}

.eam-home-left h1 {
  margin: 0.5em 0 1em 0;
  font-size: 3rem;
}

.eam-home-left h2 {
  opacity: 0.5;
}

.eam-create a {
  font-weight: bold;
  padding: 1em 2em;
  background-color: var(--eam-blue-gray);
  font-weight: normal;
}

.eam-create a:hover {
  background-color: var(--eam-blue);
}
</style>
