import { createStore } from 'vuex'
import { firestoreDB } from '@/firebase/config'
import { firebaseAuth, fireStorage } from '@/firebase/config'
import { doc, getDoc, setDoc, addDoc, collection, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { saveUserUID, removeUserUID, getUserUID } from '@/helpers/authHelper';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut
} from "firebase/auth";
import { USER } from '@/common/constants';

export default createStore({
  state: {
    userData: USER
  },
  mutations: {
    setUserData(state, payload) {
      state.userData = payload
    },
    setUserPhotoURL(state, payload) {
      state.userData.photoURL = payload
    },
    signoutUser(state) {
      state.userData = USER
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
        console.log("User", res.user)
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

    async updateUserData({ commit }, data) {
      const uid = getUserUID();
      try {
        await updateDoc(doc(firestoreDB, "users", uid), data)
      } catch (error) {
        console.log("SendContact Error", error)
      }
    },

    async sendContact({ commit }, contactData) {
      try {
        await addDoc(collection(firestoreDB, "contact"), contactData);
      } catch (error) {
        console.log("SendContact Error", error)
      }
    },

    async uploadImage({ commit }, file) {
      const uid = getUserUID();
      try {
        const filePath = `profile/${uid}/${file.name}`
        const storageRef = ref(fireStorage, filePath);
        await uploadBytes(storageRef, file).then(() => {
          console.log("Upload Success")
        });
        const url = await getDownloadURL(storageRef)
        await updateDoc(doc(firestoreDB, "users", uid), { photoURL: url })
        commit('setUserPhotoURL', url)
      } catch (error) {
        console.log("Upload Image Error", error)
      }
    },
  },
  modules: {
  },
  strict: true
})
