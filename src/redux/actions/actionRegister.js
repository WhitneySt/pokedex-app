import { createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { authentication, dataBase } from "../../Firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { typesRegister } from "../types/types";


export const actionRegisterAsync = (fullname, email, password, phone) => {
    return (dispatch) => {
        createUserWithEmailAndPassword(authentication, email, password)
            .then(async ({ user }) => {
                await updateProfile(authentication.currentUser, { displayName: fullname });

                const docRef = await addDoc(collection(dataBase, "users"), { fullname, email, password, phone });
                dispatch(actionRegisterSync({ id: docRef.id, fullname, email, password, phone, error: false }));
            }).catch(error => {
                console.log(error);
                dispatch(actionRegisterSync({ error: true }));
            });
    }
}

export const actionRegisterSync = ({ id, fullname, email, password, phone, error }) => {
    return {
        type: typesRegister.register,
        payload: {
            id,
            fullname,
            email,
            password,
            phone,
            error
        }
    }
}

export const actionLogoutAsync = () => {
    return (dispatch) => {
        signOut(authentication)
            .then(() => {
                dispatch(actionClearSync())
            })
            .catch((error) => { console.warn(error, '') });
    }
}

export const actionClearSync = () => {
    return {
        type: typesRegister.clear
    }
}