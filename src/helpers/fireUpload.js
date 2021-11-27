import { fireStorage } from '@/firebase/config'
import { firebaseAuth } from '@/firebase/config'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { reactive } from '@vue/reactivity'
import { updateProfile } from "firebase/auth"
import fireUser from '@/helpers/fireUser'
import fireGetCollection from '@/helpers/fireGetCollection'
import { firestoreDB } from '@/firebase/config'
import { doc, updateDoc } from 'firebase/firestore'

const { getCollection } = fireGetCollection()
const { user } = fireUser()
const urlCon = reactive({ url: '' })
const filePathCon = reactive({ filePath: '' })

const fireUpload = () => {
    const errorCon = reactive({ error: '' })

    const uploadImage = async(file) => {
        filePathCon.filePath = `profile/${user.value.uid}/${file.name}`
        const storageRef = ref(fireStorage, filePathCon.filePath);
        await uploadBytes(storageRef, file).then((snapshot) => {
            updateProfile(firebaseAuth.currentUser, { photoURL: storageRef.fullPath })
        });
        urlCon.url = await getDownloadURL(storageRef)
        await updateDoc(doc(firestoreDB, "users", user.value.uid), { photoURL: urlCon.url })
        getCollection()
    }

    return { uploadImage, urlCon, filePathCon, errorCon }
}

export default fireUpload