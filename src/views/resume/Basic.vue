<template>
  <section class="eam-resume-container">
    <div class="container">
      <div class="eam-resume-left eam-flex-col">
        <h2>Basic Information</h2>
        <form @submit.prevent="eamSubmit">
          <label>Name</label>
            <input v-model="name" type="text" required>
          <label>Address</label>
            <input v-model="address" type="text" required>
          <label>Mobile Number</label>
            <input v-model="mobile" type="text" required>
          <label>Email</label>
            <input v-model="email" type="email" required>
          <label>Upload your picture</label>
            <input type="file" @change="eamUpload" required>
            <div class="error">{{ fileError }}</div>
          <button>NEXT</button>
        </form>
      </div>
      <div class="eam-resume-right">
        <Resume 
          :name="name"
          :address="address" 
          :mobile="mobile" 
          :email="email"  
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Resume from '@/components/Resume.vue'
import fireUpload from '@/helpers/fireUpload'
import fireUser from '@/helpers/fireUser'
import fireAddCollection from '@/helpers/fireAddCollection'


export default defineComponent({
  name: 'Basic',
  components: { Resume },
  setup(){
    const name = ref('')
    const address = ref('')
    const mobile = ref('')
    const email = ref('')
    const file = ref(null)
    const fileError = ref('')
    const { uploadImage } = fireUpload()
    const { error, addDocument } = fireAddCollection()
    const { user } = fireUser()
    console.log(user.value)

    const types = ['image/png', 'image/jpg', 'image/jpeg']

    const eamUpload = (e: any) => {
      const selected: any = e.target.files[0]
      if(selected && types.includes(selected.type)) {
        file.value = selected
        fileError.value = ''
      } else {
        file.value = null
        fileError.value = 'Please select an image file(png, jpg, jpeg)'
      }
      uploadImage(file.value)
    }

    const eamSubmit = async () => {
      const resumeData = {
        name: name.value,
        address: address.value,
        mobile: mobile.value,
        email: email.value
      }
      await addDocument(resumeData)
      if(!error.value) {
        console.log("data submitted")
      }
    }

    return { name, email, address, mobile, eamUpload, fileError, eamSubmit }
  }
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

  .eam-resume-right {
    padding-left: 1em;
  }

</style>
