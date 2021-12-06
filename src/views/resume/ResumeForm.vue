<template>
  <vue-element-loading :active="userData.status == 'notlogin'" is-full-screen />
  <section class="eam-resume-container">
    <div class="container">
      <div class="eam-resume-left eam-flex-col">
        <h2>RESUME FORM</h2>
        <form @submit.prevent="eamSubmit">
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
          <div v-else-if="section == 'objectives'">
            <label>Objectives</label>
            <textarea v-model="objectives" required></textarea>
          </div>
          <div v-else-if="section == 'skills'">
            <label>Skills</label>
            <div v-for="(skill, index) in skills" :key="index">
              <input v-model="skills[index]" type="text" required />
            </div>
            {{ skills }}
          </div>
          <button>NEXT</button>
        </form>
        <button @click="add">ADD</button>
        <div class="error">{{ dataChecker }}</div>
      </div>
      <div class="eam-resume-right">
        <Resume
          :name="name"
          :address="address"
          :mobile="mobile"
          :email="email"
          :objectives="objectives"
          :skills="skills"
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
    section: String,
  },
  setup(props) {
    const name = ref("");
    const address = ref("");
    const mobile = ref("");
    const email = ref("");
    const objectives = ref("");
    const skills = ref([""]);

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
            params: { section: "skills" },
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

    const add = () => {
      skills.value.push("");
      console.log(skills.value);
    };

    return {
      name,
      email,
      address,
      mobile,
      objectives,
      skills,
      dataChecker,
      fileError,
      eamUpload,
      eamSubmit,
      add,
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
  padding: 2em 0;
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
}

.eam-resume-left textarea {
  height: 160px;
  max-height: 160px;
}

.eam-resume-right {
  padding-left: 1em;
}

.eam-resume-left button:hover {
  background-color: var(--eam-blue);
}
</style>
