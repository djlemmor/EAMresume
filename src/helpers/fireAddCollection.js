import { ref } from '@vue/reactivity'
import { firestoreDB } from '@/firebase/config'
import { doc, setDoc } from 'firebase/firestore'
import fireUser from '@/helpers/fireUser'

const { user } = fireUser()
const fireAddCollection = () => {
    const error = ref(null)

    const addDocument = async(data) => {
        error.value = null
        try {
            await setDoc(doc(firestoreDB, "users", user.value.uid), data)
        } catch (err) {
            console.log(err.message)
            error.value = 'could not send the message'
        }
    }
    return { error, addDocument }
}

export default fireAddCollection