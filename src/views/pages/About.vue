<template>
  <section class="about">
    <div class="container">
      <div class="about-us__header">
        <h1>About</h1>
      </div>
      <div class="about-us__body">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi in reiciendis, exercitationem voluptatum iure at dolorum dolorem illum ab libero, iste eveniet amet sed ipsum aliquam qui officiis dolore suscipit maxime eos reprehenderit. Obcaecati reiciendis iusto autem corrupti architecto sint odit? Ex vel perspiciatis officia non minima unde in nobis dolorem blanditiis vero? Eaque excepturi, assumenda commodi suscipit impedit repellendus dolores, aliquid nobis fuga autem in sint nihil, iure laboriosam. Labore itaque sint esse, sed reprehenderit necessitatibus suscipit eaque, dignissimos in quibusdam dolor quisquam aliquam? Eveniet quae temporibus quod unde explicabo eaque quisquam, exercitationem necessitatibus aut nobis, pariatur asperiores ipsam.</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'About',
  components: {},
});
</script>

<style scoped>
.about {
  text-align: center;
  padding: 15em 0;
}
.about-us__header {
  font-size: 2rem;
  margin-bottom: 1em;
}
</style>