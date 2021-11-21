<template>
  <section class="eam-resume">
    <div class="container">
      <div class="eam-resume-left eam-flex-col">
        <h2>Basic Information</h2>
        <form @submit.prevent="">
          <label>Name</label>
            <input v-model="name" type="text" required>
          <label>Address</label>
            <input v-model="address" type="text" required>
          <label>Mobile Number</label>
            <input v-model="mobileNumber" type="text" required>
          <label>Email</label>
            <input v-model="email" type="email" required>
          <label>Upload your picture</label>
            <input type="file" @change="eamUpload" required>
            <div class="error">{{ fileError }}</div>
          <button>NEXT</button>
        </form>
      </div>
      <div class="eam-resume-right">
        <Resume />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Resume from '@/components/Resume.vue';

export default defineComponent({
  name: 'Basic',
  components: { Resume },
  setup(){
    const name = ref('');
    const address = ref('');
    const mobileNumber = ref('');
    const email = ref('');
    const fileError = ref(null)

    const eamUpload = () => {
      console.log("test");
    }

    return { name, email, address, mobileNumber, fileError, eamUpload }
  }
});
</script>

<style scoped>
  input[type="file"] {
    cursor: pointer;
  }
  .eam-resume {
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

  .eam-resume-right {
    padding-left: 1em;
  }

</style>
