import { ref } from '@vue/reactivity'
import { firestoreDB } from '@/firebase/config'
import { doc, addDoc, collection, updateDoc } from 'firebase/firestore'
import fireUser from '@/helpers/fireUser'

const { user } = fireUser()
const error = ref(null)
const fireAddCollection = () => {
    error.value = null

    const usersDocument = async(data) => {
        try {
            await updateDoc(doc(firestoreDB, "users", user.value.uid), data)
        } catch (err) {
            console.log(err.message)
            error.value = err.messag
        }
    }

    const contactDocument = async(data) => {
        error.value = null
        try {
            await addDoc(collection(firestoreDB, "contact"), data)
        } catch (err) {
            console.log(err.message)
            error.value = 'Could not send the message'
        }
    }

    return { error, usersDocument, contactDocument }
}

export default fireAddCollection