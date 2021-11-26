<template>
  <section class="eam-resume-container">
    <div class="container">
      <div class="eam-resume-left eam-flex-col">
        <h2>Basic Information</h2>
        <form @submit.prevent="eamSubmit">
          <label>Upload your picture</label>
            <input type="file" @change="eamUpload">
            <div class="error">{{ fileError }}</div>
          <label>Name</label>
            <input v-model="name" type="text" required>
          <label>Address</label>
            <input v-model="address" type="text" required>
          <label>Mobile Number</label>
            <input v-model="mobile" type="text" required>
          <label>Email</label>
            <input v-model="email" type="email" required>
          <button>NEXT</button>
        </form>
        <div class="error">{{ dataChecker }}</div>
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
import { useRouter } from 'vue-router'
import fireGetCollection from '@/helpers/fireGetCollection'

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
    const dataChecker = ref('')
    const types = ['image/png', 'image/jpg', 'image/jpeg']
    const router = useRouter()
    const { user } = fireUser()
    const { urlCon, uploadImage } = fireUpload()
    const { error, addDocument } = fireAddCollection()

    if(!user.value) {
      router.push({ name: 'Login' })
    }

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
      if(file.value) {
        const resumeData = {
          name: name.value,
          address: address.value,
          mobile: mobile.value,
          email: email.value,
          photoURL: urlCon.url
        }
        await addDocument('users',resumeData)
      } else {
        dataChecker.value = 'Please fill out the fields'
      }
      
      if(!error.value) {
        router.push({ name: 'Objectives' })
      }
    }

    return { name, email, address, mobile, dataChecker, fileError, eamUpload, eamSubmit }
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
