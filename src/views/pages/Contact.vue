<template>
  <vue-element-loading :active="disable" is-full-screen />
  <section class="eam-contact">
    <div class="container">
      <div class="eam-contact-left eam-flex-col">
        <h2>Contact</h2>
        <p class="eam-notify">
          *Any Questions and Suggestions? Please Contact Us
        </p>
        <form @submit.prevent="eamContact">
          <label>Name</label>
          <input v-model="name" type="text" required />
          <label>Email</label>
          <input v-model="email" type="email" required />
          <label>Message</label>
          <textarea v-model="message" required></textarea>
          <button>Send Message</button>
        </form>
        <div class="error" v-if="error">{{ error }}</div>
        <div class="success" v-else>{{ success }}</div>
      </div>
      <div class="eam-contact-right">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125594.3747340329!2d123.61421315546512!3d10.35593685119785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a972ea07076fd7%3A0x110ff6cf2b076330!2sDakbayan%20sa%20Toledo%2C%20Lalawigan%20ng%20Cebu!5e0!3m2!1sfil!2sph!4v1637421693302!5m2!1sfil!2sph"
          width="800"
          height="600"
          style="border: 0"
          loading="lazy"
        >
        </iframe>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent, ref } from "vue";
import VueElementLoading from "vue-element-loading";

export default defineComponent({
  name: "Contact",
  components: {
    VueElementLoading,
  },
  setup() {
    const name = ref("");
    const email = ref("");
    const message = ref("");
    const success = ref("");
    const error = ref("");
    const disable = ref(false);

    const eamContact = async () => {
      disable.value = true;
      const contactData = {
        name: name.value,
        email: email.value,
        message: message.value,
      };
      try {
        await store.dispatch("sendContact", contactData);
      } catch (err: any) {
        console.log(err);
        error.value = "An Unexpected Error Occured, Please Try Again Later";
      }
      if (!error.value) {
        name.value = "";
        email.value = "";
        message.value = "";
        success.value = "Thank You! For Contacting Us.";
      }
      disable.value = false;
    };

    return { name, email, message, error, success, disable, eamContact };
  },
});
</script>

<style scoped>
.eam-contact {
  padding: 4em 0;
}
.eam-contact .container {
  align-items: center;
}
.eam-contact-left {
  padding-right: 1em;
}
.eam-contact-left textarea {
  height: 160px;
  max-height: 160px;
}
.eam-contact-left label {
  font-size: 1.2rem;
}
.eam-contact-left h2 {
  font-size: 2rem;
}
.eam-contact-left button {
  font-size: 1.2rem;
  padding: 0.8em 2em;
  background-color: var(--eam-blue-gray);
  border: none;
  border-radius: 100px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1em;
}
.eam-contact-left button:hover {
  background-color: var(--eam-blue);
}
.eam-contact-right {
  padding-left: 1em;
}
.eam-contact-right iframe {
  width: 100%;
  display: block;
}
</style>
