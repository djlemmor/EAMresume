import { ref } from '@vue/reactivity'
import { firebaseAuth } from '@/firebase/config'
import { createUserWithEmailAndPassword } from "firebase/auth";

const error = ref(null)
const signup = async(email, password) => {
    error.value = null
    await createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            return user
        })
        .catch((err) => {
            error.value = err.message;
            console.log(error.value)
        });
}

const fireSignup = () => {
    return { error, signup }
}

export default fireSignup