<template>
  <section class="eam-resume-container">
    <div class="container">
      <div class="eam-resume-left eam-flex-col">
        <h2>Basic Information</h2>
        <form @submit.prevent="eamSubmit">
          <label>Objectives</label>
            <input v-model="objectives" type="text" required>
          <button>NEXT</button>
        </form>
      </div>
      <div class="eam-resume-right">
        <Resume 
          :objectives="objectives" 
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Resume from '@/components/Resume.vue'
import fireUser from '@/helpers/fireUser'
import fireAddCollection from '@/helpers/fireAddCollection'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Objectives',
  components: { Resume },
  setup(){
    const objectives = ref('')
    const router = useRouter()
    const { error, addDocument } = fireAddCollection()
    const { user } = fireUser()

    if(!user.value) {
      router.push({ name: 'Login' })
    }

    const eamSubmit = async () => {
      const resumeData = {
        objectives: objectives.value,
      }
      await addDocument('users',resumeData)
      if(!error.value) {
        console.log("test")
      }
    }

    return { objectives, eamSubmit }
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
