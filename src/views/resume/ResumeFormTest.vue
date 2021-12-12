<template>
  <vue-element-loading :active="userData.status == 'notlogin'" is-full-screen />
  <section class="eam-resume-container">
    <div class="container">
      <div class="eam-resume-left eam-flex-col">
        <h2>RESUME FORM</h2>
        <form @submit.prevent="eamSubmit">
          <!-- BASIC INFO -->
          <div>
            <label>Upload your picture</label>
            <input type="file" @change="eamUpload" />
            <div class="error">{{ fileError }}</div>
            <label>Name</label>
            <input v-model="name" type="text" required />
          </div>
          <button type="submit" class="eam-resume-submit">SUBMIT</button>
        </form>
        <div class="error">{{ dataChecker }}</div>
      </div>
      <div class="eam-resume-right">
        <Test
          :name="name"
          :address="address"
          :mobile="mobile"
          :email="email"
          :objectives="objectives"
          :skills="skills"
          :trainings="trainings"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { isLoggin } from "@/helpers/authHelper";
import Test from "@/components/Test.vue";
import store from "@/store";
import VueElementLoading from "vue-element-loading";

export default defineComponent({
  name: "ResumeForm",
  components: { Test, VueElementLoading },
  props: {
    section: {
      type: String,
      required: true,
    },
  },
  setup() {
    const name = ref("");
    const address = ref("");
    const mobile = ref("");
    const email = ref("");
    const objectives = ref("");
    const skills = ref([""]);
    const trainings = ref(["`"]);
    const sections = ["basic", "objectives", "skills", "trainings"];

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
      console.log("test submit");
    };

    if (!isLoggin()) {
      router.push({ name: "Login" });
    }

    /* if (!sections.includes(props.section)) {
      router.push({ name: "Format" });
    } */

    const eamAdd = () => {
      console.log("test add");
    };

    const eamRemove = () => {
      console.log("test remove");
    };

    return {
      name,
      email,
      address,
      mobile,
      objectives,
      skills,
      trainings,
      dataChecker,
      fileError,
      eamUpload,
      eamSubmit,
      eamAdd,
      eamRemove,
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
