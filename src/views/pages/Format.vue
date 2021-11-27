<template>
  <section class="eam-format">
    <div class="container">
      <div class="eam-format-container">
        <h2>Choose your resume format</h2>
        <p class="eam-notify">*As of now we only have 1 format at the moment</p>
        <div class="eam-resume-format">
          <div>
            <router-link :to="{ name: 'ResumeForm' }">
              <img src="@/assets/resume.png" alt="resume photo">
              <p>DEFAULT</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Format',
  components: {},
});
</script>

<style scoped>

.eam-format-container {
  padding: 3em 0;
}
.eam-format-container img {
  max-width: 200px;
}

.eam-resume-format {
  display: flex;
  padding: 1em 0;
}

.eam-resume-format div{
  padding: 1em;
  text-align: center;
  cursor: pointer;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  transition: margin 0.5s;
}

.eam-resume-format div p{
  color: var(--eam-gray);
  margin-top: 1em;
}

.eam-resume-format div:hover{
  margin-top: -1em;
}

</style>
