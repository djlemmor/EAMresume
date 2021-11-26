import { ref } from '@vue/reactivity'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc } from 'firebase/firestore'
import fireUser from '@/helpers/fireUser'
import { firebaseAuth } from '@/firebase/config'
import { firestoreDB } from '@/firebase/config'

const error = ref(null)
const { user } = fireUser()
const signup = async(email, password, displayName) => {
    error.value = null
    await createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then(async(userCredential) => {
            // Signed in 
            await updateProfile(firebaseAuth.currentUser, { displayName: displayName })
            user.value = userCredential.user;

            const data = {
                name: displayName,
                email: email,
                type: "user"
            }
            try {
                await setDoc(doc(firestoreDB, "users", user.value.uid), data)
            } catch (errortest) {
                console.log(errortest)
            }

        })
        .catch((err) => {
            if (err.code == 'auth/email-already-in-use') {
                error.value = 'The email is already in use'
            } else if (err.code == 'auth/weak-password') {
                error.value = 'Password should be at least 6 characters'
            } else {
                error.value = err.code
                console.log(err)
            }
        });
}

const fireSignup = () => {
    return { error, signup }
}

export default fireSignup