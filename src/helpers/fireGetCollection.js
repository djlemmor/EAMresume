import { ref } from '@vue/reactivity'
import { firestoreDB } from '@/firebase/config'
import { doc, getDoc } from "firebase/firestore"
import fireUser from '@/helpers/fireUser'

const { user } = fireUser()
const documentData = ref(null)

const getCollection = async() => {
    const docRef = doc(firestoreDB, "users", user.value.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        documentData.value = docSnap.data()
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }

}

const fireGetCollection = () => {
    return { documentData, getCollection }
}

export default fireGetCollection