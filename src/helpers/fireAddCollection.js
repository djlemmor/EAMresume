import { ref } from '@vue/reactivity'
import { firestoreDB } from '@/firebase/config'
import { doc, setDoc, addDoc, collection } from 'firebase/firestore'
import fireUser from '@/helpers/fireUser'

const { user } = fireUser()

const fireAddCollection = () => {
    const error = ref(null)
    const usersDocument = async(data) => {
        error.value = null
        try {
            await setDoc(doc(firestoreDB, user.value.uid), data)
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