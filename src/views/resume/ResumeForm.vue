<template>
  <vue-element-loading :active="userData.status == 'notlogin'" is-full-screen />
  <section class="eam-resume-container">
    <div class="container">
      <div class="eam-resume-left eam-flex-col">
        <h2>RESUME FORM</h2>
        <form @submit.prevent="eamSubmit">
          <!-- BASIC INFO -->
          <div v-if="section == 'basic'">
            <label>Upload your picture</label>
            <input type="file" @change="eamUpload" />
            <div class="error">{{ fileError }}</div>
            <label>Name</label>
            <input v-model="name" type="text" required />
            <label>Address</label>
            <input v-model="address" type="text" required />
            <label>Mobile Number</label>
            <input v-model="mobile" type="text" maxlength="13" required />
            <label>Email</label>
            <input v-model="email" type="email" required />
          </div>

          <!-- OBJECTIVES -->
          <div v-else-if="section == 'objectives'">
            <label>Objectives</label>
            <textarea v-model="objectives" required></textarea>
          </div>

          <!-- SKILLS -->
          <div v-else-if="section == 'skills'">
            <label>Summary of Skills</label>
            <div v-for="(skill, index) in skills" :key="index">
              <input v-model="skills[index]" type="text" required />
            </div>
          </div>

          <!-- TRAININGS -->
          <div v-else-if="section == 'trainings'">
            <label>Trainings and Seminars Attended</label>
            <div v-for="(training, index) in trainings" :key="index">
              <textarea v-model="trainings[index]" required></textarea>
            </div>
          </div>

          <!-- EDUCATIONS -->
          <div v-else-if="section == 'educations'">
            <label>Educational Background</label>
            <div v-for="(education, index) in educations" :key="index">
              <textarea v-model="educations[index]" required></textarea>
            </div>
          </div>

          <!-- PERSONALS -->
          <div v-else-if="section == 'personals'">
            <label>Personal Data</label>
            <p>Date of Birth</p>
            <input v-model="dateofBirth" type="text" required />
            <p>Place of Birth</p>
            <input v-model="placeofBirth" type="text" required />
            <p>Civil Status</p>
            <input v-model="civilStatus" type="text" required />
            <p>Sex</p>
            <input v-model="sex" type="text" required />
            <p>Citizenship</p>
            <input v-model="citizenship" type="text" required />
            <p>Height</p>
            <input v-model="height" type="text" required />
            <p>Weight</p>
            <input v-model="weight" type="text" required />
            <p>Religion</p>
            <input v-model="religion" type="text" required />
            <p>Language Spoken</p>
            <input v-model="languageSpoken" type="text" required />
          </div>

          <!-- SUBMIT -->
          <button type="submit" class="eam-resume-submit">SUBMIT</button>

          <!-- ADD -->
          <div
            class="eam-resume-action-buttons"
            v-show="
              section == 'skills' ||
              section == 'trainings' ||
              section == 'educations'
            "
          >
            <button @click="eamAdd" type="button">ADD</button>

            <!-- REMOVE -->
            <button
              @click="eamRemove"
              type="button"
              v-show="
                skills.length > 1 ||
                trainings.length > 1 ||
                educations.length > 1
              "
            >
              REMOVE
            </button>
          </div>

          <!-- NAVIGATION BUTTONS -->
          <div class="eam-resume-nav-buttons">
            <button
              @click="eamBack"
              v-show="section != 'basic'"
              class="eam-resume-back"
              type="button"
            >
              BACK
            </button>
            <button @click="eamNext" class="eam-resume-next" type="button">
              NEXT
            </button>
          </div>
        </form>
        <div class="error">{{ dataChecker }}</div>
      </div>

      <!-- RESUME COMPONENT -->
      <div class="eam-resume-right">
        <Resume
          :name="name"
          :address="address"
          :mobile="mobile"
          :email="email"
          :objectives="objectives"
          :skills="skills"
          :trainings="trainings"
          :educations="educations"
          :dateofBirth="dateofBirth"
          :placeofBirth="placeofBirth"
          :civilStatus="civilStatus"
          :sex="sex"
          :citizenship="citizenship"
          :height="height"
          :weight="weight"
          :religion="religion"
          :languageSpoken="languageSpoken"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { isLoggin } from "@/helpers/authHelper";
import Resume from "@/components/Resume.vue";
import store from "@/store";
import VueElementLoading from "vue-element-loading";

export default defineComponent({
  name: "ResumeForm",
  components: { Resume, VueElementLoading },
  props: {
    section: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const name = ref("");
    const address = ref("");
    const mobile = ref("");
    const email = ref("");
    const objectives = ref("");
    const skills = ref([""]);
    const trainings = ref([""]);
    const educations = ref([""]);
    const dateofBirth = ref("");
    const placeofBirth = ref("");
    const civilStatus = ref("");
    const sex = ref("");
    const citizenship = ref("");
    const height = ref("");
    const weight = ref("");
    const religion = ref("");
    const languageSpoken = ref("");
    const sections = [
      "basic",
      "objectives",
      "skills",
      "trainings",
      "educations",
      "personals",
      "experiences",
    ];

    const file = ref(null);
    const fileError = ref("");
    const dataChecker = ref("");
    const types = ["image/png", "image/jpg", "image/jpeg"];
    const router = useRouter();

    store.dispatch("getUserData");
    const userPhotoURL = store.state.userData.photoURL;

    const eamUpload = async (e: any) => {
      const selected: any = e.target.files[0];
      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = "";

        try {
          await store.dispatch("uploadImage", file.value);
        } catch (err: any) {
          console.log(err);
          fileError.value = err;
        }
      } else {
        file.value = null;
        fileError.value = "Please Select An Image File (png, jpg, jpeg)";
      }
    };

    const eamSubmit = async () => {
      /* BASIC INFO */
      if (props.section == "basic") {
        if (mobile.value.length > 13) {
          dataChecker.value = "The Fields Length Exceeds Maximum";
        } else {
          dataChecker.value = "";
          if (file.value || userPhotoURL) {
            const basicData = {
              name: name.value,
              address: address.value,
              mobile: mobile.value,
              email: email.value,
            };
            try {
              await store.dispatch("updateUserData", basicData);
              router.push({
                name: "ResumeForm",
                params: { section: "objectives" },
              });
            } catch (err: any) {
              console.log(err);
              fileError.value = err;
            }
          } else {
            dataChecker.value = "Please Fill Out All The Fields";
          }
        }
      } else if (props.section == "objectives") {
        /* OBJECTIVES */
        const objectivesData = {
          objectives: objectives.value,
        };
        try {
          await store.dispatch("updateUserData", objectivesData);
          router.push({
            name: "ResumeForm",
            params: { section: "skills" },
          });
        } catch (err: any) {
          console.log(err);
          dataChecker.value = "Please Fill Out All The Fields";
        }
      } else if (props.section == "skills") {
        /* SKILLS */
        const skillsData = {
          skills: skills.value,
        };
        try {
          await store.dispatch("updateUserData", skillsData);
          router.push({
            name: "ResumeForm",
            params: { section: "trainings" },
          });
        } catch (err: any) {
          console.log(err);
          dataChecker.value = "Please Fill Out All The Fields";
        }
      } else if (props.section == "trainings") {
        /* TRAININGS */
        const trainingsData = {
          trainings: trainings.value,
        };
        try {
          await store.dispatch("updateUserData", trainingsData);
          router.push({
            name: "ResumeForm",
            params: { section: "educations" },
          });
        } catch (err: any) {
          console.log(err);
          dataChecker.value = "Please Fill Out All The Fields";
        }
      } else if (props.section == "educations") {
        /* EDUCATIONS */
        const educationsData = {
          educations: educations.value,
        };
        try {
          await store.dispatch("updateUserData", educationsData);
          router.push({
            name: "ResumeForm",
            params: { section: "personals" },
          });
        } catch (err: any) {
          console.log(err);
          dataChecker.value = "Please Fill Out All The Fields";
        }
      } else if (props.section == "personals") {
        /* PERSONALS */
        const personalsData = {
          dateofBirth: dateofBirth.value,
          placeofBirth: placeofBirth.value,
          civilStatus: civilStatus.value,
          sex: sex.value,
          citizenship: citizenship.value,
          height: height.value,
          weight: weight.value,
          religion: religion.value,
          languageSpoken: languageSpoken.value,
        };
        try {
          await store.dispatch("updateUserData", personalsData);
          router.push({
            name: "ResumeForm",
            params: { section: "experiences" },
          });
        } catch (err: any) {
          console.log(err);
          dataChecker.value = "Please Fill Out All The Fields";
        }
      }
    };

    if (!isLoggin()) {
      router.push({ name: "Login" });
    }

    if (!sections.includes(props.section)) {
      router.push({ name: "Format" });
    }

    const eamNext = () => {
      if (props.section == "basic") {
        router.push({
          name: "ResumeForm",
          params: { section: "objectives" },
        });
      } else if (props.section == "objectives") {
        router.push({
          name: "ResumeForm",
          params: { section: "skills" },
        });
      } else if (props.section == "skills") {
        router.push({
          name: "ResumeForm",
          params: { section: "trainings" },
        });
      } else if (props.section == "trainings") {
        router.push({
          name: "ResumeForm",
          params: { section: "educations" },
        });
      } else if (props.section == "educations") {
        router.push({
          name: "ResumeForm",
          params: { section: "personals" },
        });
      }else if (props.section == "personals") {
        router.push({
          name: "ResumeForm",
          params: { section: "experiences" },
        });
      }
    };

    const eamBack = () => {
      if (props.section == "objectives") {
        router.push({
          name: "ResumeForm",
          params: { section: "basic" },
        });
      } else if (props.section == "skills") {
        router.push({
          name: "ResumeForm",
          params: { section: "objectives" },
        });
      } else if (props.section == "trainings") {
        router.push({
          name: "ResumeForm",
          params: { section: "skills" },
        });
      } else if (props.section == "educations") {
        router.push({
          name: "ResumeForm",
          params: { section: "trainings" },
        });
      } else if (props.section == "personals") {
        router.push({
          name: "ResumeForm",
          params: { section: "educations" },
        });
      }else if (props.section == "experiences") {
        router.push({
          name: "ResumeForm",
          params: { section: "personals" },
        });
      }
    };

    const eamAdd = () => {
      if (props.section == "skills") {
        skills.value.push("");
      } else if (props.section == "trainings") {
        trainings.value.push("");
      } else if (props.section == "educations") {
        educations.value.push("");
      }
    };

    const eamRemove = () => {
      if (props.section == "skills") {
        if (skills.value.length > 1) {
          skills.value.pop();
        }
      } else if (props.section == "trainings") {
        if (trainings.value.length > 1) {
          trainings.value.pop();
        }
      } else if (props.section == "educations") {
        if (educations.value.length > 1) {
          educations.value.pop();
        }
      }
    };

    return {
      name,
      email,
      address,
      mobile,
      objectives,
      skills,
      trainings,
      educations,
      dateofBirth,
      placeofBirth,
      civilStatus,
      sex,
      citizenship,
      height,
      weight,
      religion,
      languageSpoken,
      dataChecker,
      fileError,
      eamUpload,
      eamSubmit,
      eamAdd,
      eamRemove,
      eamNext,
      eamBack,
      userData: computed(() => store.state.userData),
    };
  },
});
</script>

<style scoped>
input[type="file"] {
  cursor: pointer;
}

.eam-resume-container {
  padding: 4em 0;
}

.eam-resume-left {
  padding-right: 1em;
}

.eam-resume-left label {
  font-size: 1.2rem;
}

.eam-resume-left h2 {
  font-size: 2rem;
}

.eam-resume-left button {
  font-size: 1.2rem;
  padding: 0.8em 2em;
  background-color: var(--eam-blue-gray);
  border: none;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  min-width: 30%;
  margin-bottom: 1em;
}

.eam-resume-left textarea {
  height: 100px;
  max-height: 100px;
}

.eam-resume-right {
  padding-left: 1em;
}

.eam-resume-left button:hover {
  background-color: var(--eam-blue);
}

.eam-resume-action-buttons,
.eam-resume-nav-buttons {
  display: flex;
  justify-content: space-between;
}
</style>
