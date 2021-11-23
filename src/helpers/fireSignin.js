import { signInWithEmailAndPassword } from "firebase/auth"
import { firebaseAuth } from "@/firebase/config"

const fireSignin = async(email, password) => {
    const credentials = await signInWithEmailAndPassword(firebaseAuth, email, password);
    if (credentials.user) {
        console.log(credentials.user)
    }
}

export default fireSignin