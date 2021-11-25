import { fireStorage } from '@/firebase/config'
import { firebaseAuth } from '@/firebase/config'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { reactive } from '@vue/reactivity'
import { updateProfile } from "firebase/auth"
import fireUser from '@/helpers/fireUser'

const { user } = fireUser()
const urlCon = reactive({ url: '' })
const filePathCon = reactive({ filePath: '' })
const fireUpload = () => {
    const errorCon = reactive({ error: '' })

    const uploadImage = async(file) => {
        filePathCon.filePath = `profile/${user.value.uid}/${file.name}`
        const storageRef = ref(fireStorage, filePathCon.filePath);
        await uploadBytes(storageRef, file).then((snapshot) => {
            console.log(storageRef);

            console.log(urlCon.url)
            updateProfile(firebaseAuth.currentUser, { photoURL: storageRef.fullPath })
            console.log(user)
        });
        urlCon.url = await getDownloadURL(storageRef)
    }

    return { uploadImage, urlCon, filePathCon, errorCon }
}

export default fireUpload