<template>
  <div class="eam-resume">
    <!-- BASIC INFO -->
    <div class="eam-resume-basic">
      <!-- NAME -->
      <p class="eam-resume-name" v-if="userData.name">
        <b> {{ userData.name }} </b>
      </p>
      <p class="eam-resume-name" v-else-if="name">
        <b> {{ name }} </b>
      </p>
      <p class="eam-resume-name" v-else><b> NAME </b></p>

      <!-- ADDRESS -->
      <p class="eam-resume-address" v-if="userData.address">
        Address: {{ userData.address }}
      </p>
      <p class="eam-resume-address" v-else>Address: {{ address }}</p>

      <!-- PROFILE PICTURE -->
      <div class="eam-resume-profile-picture" v-if="userData.photoURL">
        <img :src="userData.photoURL" alt="profile picture" />
      </div>
      <div class="eam-resume-profile-tempo" v-else>Profile Here</div>

      <!-- MOBILE NUMBER -->
      <p class="eam-resume-mobile" v-if="userData.mobile">
        Mobile Number: {{ userData.mobile }}
      </p>
      <p class="eam-resume-mobile" v-else>Mobile Number: {{ mobile }}</p>

      <!-- EMAIL -->
      <p class="eam-resume-email" v-if="userData.email">
        Email: {{ userData.email }}
      </p>
      <p class="eam-resume-email" v-else>Email: {{ email }}</p>
    </div>

    <!-- OBJECTIVES -->
    <div class="eam-resume-objectives">
      <p><b>OBJECTIVES:</b></p>
      <p v-if="userData.objectives">{{ userData.objectives }}</p>
      <p v-else>{{ objectives }}</p>
    </div>

    <!-- SKILLS -->
    <div class="eam-resume-skills">
      <p><b>SUMMARY OF SKILLS:</b></p>
      <div v-if="skills[0]">
        <p v-for="(skill, index) in skills" :key="index">
          {{ skill }}
        </p>
      </div>
      <div v-else-if="userData.skills">
        <p v-for="skill in userData.skills" :key="skill">
          {{ skill }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Resume",
  components: {},
  props: {
    name: String,
    address: String,
    mobile: String,
    email: String,
    objectives: String,
    skills: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return {
      userData: computed(() => store.state.userData),
    };
  },
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

.eam-resume-objectives,
.eam-resume-skills {
  padding: 0 1em 1em 1em;
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
