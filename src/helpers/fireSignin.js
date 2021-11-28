import { ref } from '@vue/reactivity'
import { firebaseAuth } from '@/firebase/config'
import { signInWithEmailAndPassword } from "firebase/auth"
import fireUser from '@/helpers/fireUser'

const error = ref(null)
const { user } = fireUser()
const signin = async(email, password) => {
    error.value = null
    user.value = null
    await signInWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredential) => {
            // Signed in 
            user.value = userCredential.user;
        })
        .catch((err) => {
            if (err.code == 'auth/wrong-password') {
                error.value = 'Wrong Password'
            } else if (err.code == 'auth/user-not-found') {
                error.value = 'Wrong Email or Password'
            } else {
                error.value = err.code
            }
        });
}

const fireSignin = () => {
    return { error, signin }
}

export default fireSignin