<template>
  <div class="eam-resume">
    <div class="eam-resume-basic">
      <p class="eam-resume-name" v-if="name"><b> {{ name }} </b></p>
      <p class="eam-resume-name" v-else><b> Name </b></p>
      <p class="eam-resume-address">Address: {{ address }}</p>
      <div class="eam-resume-profile-tempo" v-if="!urlCon.url">Profile Here</div>
      <div class="eam-resume-profile-picture" v-else>
        <img :src="urlCon.url" alt="profile picture" >
      </div>
      <p class="eam-resume-mobile">Mobile Number: {{ mobile }}</p>
      <p class="eam-resume-email">Email: {{ email }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import fireUpload from '@/helpers/fireUpload'

export default defineComponent({
  name: 'Resume',
  components: {},
  props: {
    name: String,
    address: String,
    mobile: String,
    email: String
  },
  setup() {
    const { urlCon } = fireUpload()

    return { urlCon }
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

.eam-resume-profile-picture {
  position: absolute;
  top: 1em;
  right: 1em;
  width: 8em;
}

.eam-resume-address {
  max-width: 300px;
}
</style>
