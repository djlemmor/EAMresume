<template>
  <div class="eam-resume">

    <!-- BASIC INFO -->
    <div class="eam-resume-basic">
      <p class="eam-resume-name" v-if="name"><b> {{ name }} </b></p>
      <p class="eam-resume-name" v-else><b> NAME </b></p>
      <p class="eam-resume-address">Address: {{ address }}</p>
      <div class="eam-resume-profile-tempo" v-if="!documentData?.photoURL">Profile Here</div>
      <div class="eam-resume-profile-picture" v-else>
        <img :src="documentData?.photoURL" alt="profile picture" >
      </div>
      <p class="eam-resume-mobile">Mobile Number: {{ mobile }}</p>
      <p class="eam-resume-email">Email: {{ email }}</p>
    </div>

    <!-- OBJECTIVES -->
    <div class="eam-resume-objectives">
      <p><b>OBJECTIVES</b></p>
      <p>{{ objectives }}</p>
    </div>

    
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import fireGetCollection from '@/helpers/fireGetCollection'
import fireUser from '@/helpers/fireUser'

export default defineComponent({
  name: 'Resume',
  components: {},
  props: {
    name: String,
    address: String,
    mobile: String,
    email: String,
    objectives: String
  },
  setup() {
    const { user } = fireUser()
    console.log(user.value)
    const { documentData, getCollection } = fireGetCollection()
    getCollection()
    return { documentData }
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
  word-wrap: break-word;
}

.eam-resume p {
  margin-bottom: 0.5em;
}

.eam-resume-basic {
  padding: 1em;
}

.eam-resume-objectives {
  padding: 0 1em;
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
  max-width: 6em;
}

.eam-resume-objectives p {
  max-width: 30em;
}
</style>
