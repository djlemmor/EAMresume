import { ref } from '@vue/reactivity'
import { firebaseAuth } from '@/firebase/config'
import { onAuthStateChanged } from "firebase/auth";

const user = ref(firebaseAuth.currentUser)

onAuthStateChanged(firebaseAuth, (_user) => {
    if (_user) {
        user.value = _user;
    }
});

const fireUser = () => {
    return { user }
}

export default fireUser