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

    <!-- EDUCATIONS -->
    <div class="eam-resume-educations">
      <p><b>EDUCATIONAL BACKGROUND:</b></p>
      <template v-if="educations[0]">
        <div v-for="(education, index) in educations" :key="index">
          <p v-if="index == 0"><b>ELEMENTARY</b></p>
          <p v-else-if="index == 1"><b>SECONDARY</b></p>
          <p v-else><b>TERTIARY</b></p>
          <p>
            {{ education }}
          </p>
        </div>
      </template>

      <template v-else-if="userData.educations">
        <div v-for="(education, index) in userData.educations" :key="index">
          <p v-if="index == 0"><b>ELEMENTARY</b></p>
          <p v-else-if="index == 1"><b>SECONDARY</b></p>
          <p v-else><b>TERTIARY</b></p>
          <p>
            {{ education }}
          </p>
        </div>
      </template>
    </div>

    <!-- PERSONALS -->
    <div class="eam-resume-personals">
      <p><b>PERSONAL DATA:</b></p>
      <!-- DATE OF BIRTH -->
      <div>
        <p>Date of Birth:</p>
        <p class="eam-resume-dateofbirth" v-if="dateofBirth">
          {{ dateofBirth }}
        </p>
        <p class="eam-resume-dateofbirth" v-else>
          {{ userData.dateofBirth }}
        </p>
      </div>
      <div>
        <p>Place of Birth:</p>
        <p class="eam-resume-placeofBirth" v-if="placeofBirth">
          {{ placeofBirth }}
        </p>
        <p class="eam-resume-placeofBirth" v-else>
          {{ userData.placeofBirth }}
        </p>
      </div>
      <div>
        <p>Civil Status:</p>
        <p class="eam-resume-placeofBirth" v-if="civilStatus">
          {{ civilStatus }}
        </p>
        <p class="eam-resume-placeofBirth" v-else>
          {{ userData.civilStatus }}
        </p>
      </div>
      <div>
        <p>Sex:</p>
        <p class="eam-resume-placeofBirth" v-if="sex">
          {{ sex }}
        </p>
        <p class="eam-resume-placeofBirth" v-else>
          {{ userData.sex }}
        </p>
      </div>
      <div>
        <p>Citizenship:</p>
        <p class="eam-resume-placeofBirth" v-if="citizenship">
          {{ citizenship }}
        </p>
        <p class="eam-resume-placeofBirth" v-else>
          {{ userData.citizenship }}
        </p>
      </div>
      <div>
        <p>Height:</p>
        <p class="eam-resume-placeofBirth" v-if="height">
          {{ height }}
        </p>
        <p class="eam-resume-placeofBirth" v-else>
          {{ userData.height }}
        </p>
      </div>
      <div>
        <p>Weight:</p>
        <p class="eam-resume-placeofBirth" v-if="weight">
          {{ weight }}
        </p>
        <p class="eam-resume-placeofBirth" v-else>
          {{ userData.weight }}
        </p>
      </div>
      <div>
        <p>Religion:</p>
        <p class="eam-resume-placeofBirth" v-if="religion">
          {{ religion }}
        </p>
        <p class="eam-resume-placeofBirth" v-else>
          {{ userData.religion }}
        </p>
      </div>
      <div>
        <p>Language Spoken:</p>
        <p class="eam-resume-placeofBirth" v-if="languageSpoken">
          {{ languageSpoken }}
        </p>
        <p class="eam-resume-placeofBirth" v-else>
          {{ userData.languageSpoken }}
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
    educations: {
      type: Array,
      required: true,
    },
    dateofBirth: {
      type: String,
      required: true,
    },
    placeofBirth: {
      type: String,
      required: true,
    },
    civilStatus: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    citizenship: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    languageSpoken: {
      type: String,
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
.eam-resume-trainings,
.eam-resume-educations,
.eam-resume-personals {
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

.eam-resume-trainings p,
.eam-resume-educations p {
  white-space: pre-line;
}

.eam-resume-educations div,
.eam-resume-personals div {
  display: flex;
}

.eam-resume-educations div > *,
.eam-resume-personals div > * {
  flex-basis: 100%;
}
</style>
