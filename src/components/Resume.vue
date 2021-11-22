<template>
  <div class="eam-resume">
    <div class="eam-resume-basic">
      <p class="eam-resume-name" v-if="name"><b> {{ name }} </b></p>
      <p class="eam-resume-name" v-else><b> Name </b></p>
      <p class="eam-resume-address">Address: {{ address }}</p>
      <p class="eam-resume-profile-tempo">Profile Here</p>
      <p class="eam-resume-mobile">Mobile Number: {{ mobile }}</p>
      <p class="eam-resume-email">Email: {{ email }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Resume',
  components: {},
  props: {
    name: String,
    address: String,
    mobile: String,
    email: String
  }
});
</script>

<style scoped>
.eam-resume {
  border: 1px solid var(--eam-gray);
  background-color: #fff;
  height: 100%;
  padding: 0;
  position: relative;
}
.eam-resume p {
  margin-bottom: 0.5em;
}
.eam-resume-basic {
  padding: 1em;
}
.eam-resume-name {
  text-transform: uppercase;
}
.eam-resume-profile-tempo {
  text-align: right;
  border: 1px dashed var(--eam-cool-gray);
  padding: 3em 1em;
  position: absolute;
  top: 1em;
  right: 1em;
}

.eam-resume-address {
  max-width: 300px;
}
</style>
