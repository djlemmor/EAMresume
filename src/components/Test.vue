<template>
  <div class="eam-resume">
    <!-- BASIC INFO -->
    <div class="eam-resume-basic">
      <!-- NAME -->
      <p class="eam-resume-name" v-if="name">
        <b> {{ name }} </b>
      </p>
      <p class="eam-resume-name" v-else-if="userData.name">
        <b> {{ userData.name }} </b>
      </p>
      <p class="eam-resume-name" v-else><b> NAME </b></p>

      <!-- ADDRESS -->
      <p class="eam-resume-address" v-if="address">Address: {{ address }}</p>
      <p class="eam-resume-address" v-else>Address: {{ userData.address }}</p>

      <!-- PROFILE PICTURE -->
      <div class="eam-resume-profile-picture" v-if="userData.photoURL">
        <img :src="userData.photoURL" alt="profile picture" />
      </div>
      <div class="eam-resume-profile-tempo" v-else>Profile Here</div>

      <!-- MOBILE NUMBER -->
      <p class="eam-resume-mobile" v-if="mobile">Mobile Number: {{ mobile }}</p>
      <p class="eam-resume-mobile" v-else>
        Mobile Number: {{ userData.mobile }}
      </p>

      <!-- EMAIL -->
      <p class="eam-resume-email" v-if="email">Email: {{ email }}</p>
      <p class="eam-resume-email" v-else>Email: {{ userData.email }}</p>
    </div>

    <!-- OBJECTIVES -->
    <div class="eam-resume-objectives">
      <p><b>OBJECTIVES:</b></p>
      <p v-if="objectives">{{ objectives }}</p>
      <p v-else>{{ userData.objectives }}</p>
    </div>

    <!-- SKILLS -->
    <div class="eam-resume-skills">
      <p><b>SUMMARY OF SKILLS:</b></p>
      <div v-if="skills[0]">
        <ul>
          <li v-for="(skill, index) in skills" :key="index">
            <p>{{ skill }}</p>
          </li>
        </ul>
      </div>
      <div v-else-if="userData.skills">
        <ul>
          <li v-for="skill in userData.skills" :key="skill">
            <p>{{ skill }}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- TRAININGS -->
    <div class="eam-resume-trainings">
      <p><b>TRAININGS AND SEMINARS ATTENDED:</b></p>
      <div v-if="trainings[0]">
        <p v-for="(training, index) in trainings" :key="index">
          {{ training }}
        </p>
      </div>
      <div v-else-if="userData.trainings">
        <p v-for="training in userData.trainings" :key="training">
          {{ training }}
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
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    objectives: {
      type: String,
      required: true,
    },
    skills: {
      type: Array,
      required: true,
    },
    trainings: {
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
  min-height: 600px;
}

.eam-resume p {
  margin-bottom: 0.5em;
}

.eam-resume-basic {
  padding: 1em;
}

.eam-resume-objectives,
.eam-resume-skills,
.eam-resume-trainings {
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
  line-height: 32px;
}

.eam-resume-skills ul {
  list-style-type: disc;
  padding-left: 1em;
}

.eam-resume-trainings p {
  white-space: pre-line;
}
</style>
