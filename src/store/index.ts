import { createStore } from 'vuex'
import { firestoreDB } from '@/firebase/config'
import { firebaseAuth } from '@/firebase/config'
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection
} from "firebase/firestore"
import { saveUserUID, removeUserUID, getUserUID } from '@/helpers/authHelper';

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut
} from "firebase/auth";

export default createStore({
  state: {
    userData: {
      name: '',
      email: '',
      status: 'notlogin'
    },
  },
  mutations: {
    setUserData(state, payload) {
      state.userData = payload
    },
    signoutUser(state) {
      state.userData = {
        name: '',
        email: '',
        status: 'notlogin'
      }
    },
  },
  actions: {

    async signup({ dispatch }, userCred) {
      const res = await createUserWithEmailAndPassword(firebaseAuth, userCred.email, userCred.password)
      try {
        await updateProfile(res.user, { displayName: userCred.displayName })
        const data = {
          name: userCred.displayName,
          email: res.user.email,
          type: "user"
        }
        await setDoc(doc(firestoreDB, "users", res.user.uid), data)
        saveUserUID(res.user.uid)
        await dispatch('getUserData')
      } catch (error) {
        console.log("Signup Error", error)
      }
    },

    async signin({ dispatch }, userCred) {
      const res = await signInWithEmailAndPassword(firebaseAuth, userCred.email, userCred.password)
      try {
        saveUserUID(res.user.uid)
        await dispatch('getUserData')
      } catch (error) {
        console.log("Signin Error", error)
      }
    },

    async signout({ commit }) {
      await signOut(firebaseAuth).then(() => {
        removeUserUID()
        commit('signoutUser')
      }).catch((error) => {
        console.log("Signout Error", error)
      });
    },

    async getUserData({ commit }) {
      const docRef = doc(firestoreDB, "users", getUserUID());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        commit('setUserData', docSnap.data())
      } else {
        console.log("The User UID is not set");
      }
    },

    async sendContact({ commit }, contactData) {
      try {
        await addDoc(collection(firestoreDB, "contact"), contactData);
      } catch (error) {
        console.log("SendContact Error", error)
      }
    },
  },
  modules: {
  },
  strict: true
})
