<template>
  <section class="eam-resume-container">
    <div class="container">
      <div class="eam-resume-left eam-flex-col">
        <h2>RESUME FORM</h2>
        <form @submit.prevent="eamSubmit">
          <div v-if="section == 'basic'">
            <label>Upload your picture</label>
            <input type="file" @change="eamUpload">
            <div class="error">{{ fileError }}</div>
            <label>Name</label>
              <input v-model="name" type="text" required>
            <label>Address</label>
              <input v-model="address" type="text" required>
            <label>Mobile Number</label>
              <input v-model="mobile" type="text" maxlength="13" required>
            <label>Email</label>
              <input v-model="email" type="email" required>
          </div>
          <div v-else-if=" section == 'objectives' ">
            <label>Objectives</label>
              <textarea v-model="objectives" required></textarea>
          </div>
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
          :objectives="objectives"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import fireUpload from '@/helpers/fireUpload'
import fireUser from '@/helpers/fireUser'
import fireAddCollection from '@/helpers/fireAddCollection'
import fireGetCollection from '@/helpers/fireGetCollection'
import Resume from '@/components/Resume.vue'

export default defineComponent({
  name: 'ResumeForm',
  components: { Resume },
  props: {
    section: String,
  },
  setup(props){
    const name = ref('')
    const address = ref('')
    const mobile = ref('')
    const email = ref('')
    const objectives = ref('')

    const file = ref(null)
    const fileError = ref('')
    const dataChecker = ref('')
    const types = ['image/png', 'image/jpg', 'image/jpeg']
    const router = useRouter()
    const { user } = fireUser()
    const { uploadImage } = fireUpload()
    const { error, usersDocument } = fireAddCollection()
    const { documentData } = fireGetCollection()

    if(!user.value) {
      router.push({ name: 'Login' })
    }

    const eamUpload = (e: any) => {
      const selected: any = e.target.files[0]
      if(selected && types.includes(selected.type) || documentData.value.photoURL) {
        file.value = selected
        fileError.value = ''
        uploadImage(file.value)
      } else {
        file.value = null
        fileError.value = 'Please Select An Image File (png, jpg, jpeg)'
      }
    }

    const eamSubmit = async () => {
      if(props.section == 'basic') {
        if(mobile.value.length > 13) {
          dataChecker.value = 'The Fields Length Exceeds Maximum'
        } else {
          dataChecker.value = ''
          if(file.value || documentData.value.photoURL) {
            const basicData = {
              name: name.value,
              address: address.value,
              mobile: mobile.value,
              email: email.value,
            }
            await usersDocument(basicData)
            router.push({ name: 'ResumeForm', params: { section: 'objectives' } })
          } else {
            dataChecker.value = 'Please Fill Out All The Fields'
          }
        }
      } else {
        const objectivesData = {
          objectives: objectives.value
        }
        await usersDocument(objectivesData)
        console.log("PROPS TEST")
      }
      
      if(!error.value) {
        console.log("NO ERROR")
      }
    }

    return { name, email, address, mobile, objectives, dataChecker, fileError, eamUpload, eamSubmit }
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

  .eam-resume-left textarea {
    height: 160px;
    max-height: 160px;
  }

  .eam-resume-right {
    padding-left: 1em;
  }

</style>
