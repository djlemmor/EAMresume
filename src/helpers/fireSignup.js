import { ref } from '@vue/reactivity'
import { firebaseAuth } from '@/firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import fireUser from '@/helpers/fireUser'

const error = ref(null)
const { user } = fireUser()
const signup = async(email, password, displayName) => {
    error.value = null
    await createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then(async(userCredential) => {
            // Signed in 
            await updateProfile(firebaseAuth.currentUser, { displayName: displayName })
            user.value = userCredential.user;
        })
        .catch((err) => {
            if (err.code == 'auth/email-already-in-use') {
                error.value = 'The email is already in use'
            } else if (err.code == 'auth/weak-password') {
                error.value = 'Password should be at least 6 characters'
            } else {
                error.value = err.code
            }
        });
}

const fireSignup = () => {
    return { error, signup }
}

export default fireSignup