import { createStore } from 'vuex'
import { firestoreDB } from '@/firebase/config'
import { doc, getDoc } from "firebase/firestore"
import { firebaseAuth } from '@/firebase/config'
import { onAuthStateChanged } from "firebase/auth";

export default createStore({
  state: {
    user: {
      uid: 'uid',
      status: 'notlogin'
    },
    userData: {}
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
    async getUser({ commit }) {
      onAuthStateChanged(firebaseAuth, (_user) => {
        if (_user) {
          commit('getUser', _user)
        }
      });
    },
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

  },
  modules: {
  },
  getters: {
    getUser: state => state.user,
    getUserData: state => state.userData
  },
  strict: true
})
