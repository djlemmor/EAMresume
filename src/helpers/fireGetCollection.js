import { ref } from '@vue/reactivity'
import { firestoreDB } from '@/firebase/config'
import { doc, getDoc } from "firebase/firestore"
import fireUser from '@/helpers/fireUser'

const { user } = fireUser()
const documentData = ref()

const getCollection = async() => {
    documentData.value = null
    const docRef = doc(firestoreDB, "users", user.value.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        documentData.value = docSnap.data()
    } else {
        console.log("No such document!");
    }

}

const fireGetCollection = () => {
    return { documentData, getCollection }
}

export default fireGetCollection