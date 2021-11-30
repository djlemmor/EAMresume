import { createStore } from 'vuex'
import { firestoreDB } from '@/firebase/config'
import { firebaseAuth } from '@/firebase/config'
import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore"

import {
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

export default createStore({
  state: {
    user: {
      uid: 'uid',
      status: 'notlogin'
    },
    userData: {},
    userIsReady: true
  },
  mutations: {
    getUserData(state, payload) {
      state.userData = payload
    },
    getUser(state, payload) {
      state.user = payload
    }

  },
  actions: {
    /* async getUser({ commit }) {
      onAuthStateChanged(firebaseAuth, (_user) => {
        if (_user) {
          commit('getUser', _user)
        }
      });
    }, */
    async getUserData({ dispatch, commit, state }) {
      await dispatch('getUser').then(async () => {
        const docRef = doc(firestoreDB, "users", state.user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          commit('getUserData', docSnap.data())
        } else {
          console.log('Not Logged In')
        }
      })
    },
    async signup({ commit }, userCred) {
      const res = await createUserWithEmailAndPassword(firebaseAuth, userCred.email, userCred.password)
      try {
        await updateProfile(res.user, { displayName: userCred.displayName })
        const data = {
          name: userCred.displayName,
          email: res.user.email,
          type: "user"
        }
        await setDoc(doc(firestoreDB, "users", res.user.uid), data)
        console.log("success")
        /* commit('setUser', res.user) */
      } catch (error) {
        console.log(error)
      }
      /* if (res) {
        await updateProfile(res.user, { displayName: userCred.displayName })
        const data = {
          name: userCred.displayName,
          email: res.user.email,
          type: "user"
        }
        await setDoc(doc(firestoreDB, "users", res.user.uid), data)
        commit('setUser', res.user)
      } else {
        throw new Error('could not complete signup')
      } */
    },
  },
  modules: {
  },
  /* getters: {
    getUser: state => state.user,
    getUserData: state => state.userData
  }, */
  strict: true
})
