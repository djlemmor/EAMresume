import { ref } from '@vue/reactivity'
import { signOut } from "firebase/auth"
import { firebaseAuth } from "@/firebase/config"
import fireUser from '@/helpers/fireUser'

const error = ref(null)
const { user } = fireUser()
const signout = async() => {
    error.value = null
    await signOut(firebaseAuth).then(() => {
        user.value = null
    }).catch((err) => {
        error.value = err.message
    });
}

const fireSignout = () => {
    return { error, signout }
}

export default fireSignout