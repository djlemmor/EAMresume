<template>
  <section class="home">
    <div class="container">
      <div class="eam-notfound">
        Not Found
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotFound',
  components: {},
});
</script>

<style scoped>
.eam-notfound {
  padding: 5em 1em;
  font-size: 3rem;
  text-align: center;
  font-weight: bold;
  color: var(--eam-blue-gray);
}
</style>
