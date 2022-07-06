import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { authentication, google, facebook, dataBase } from "../../Firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
// import { getUserFromDatabase } from "../../modules/helpers";
import { typesLogin } from "../types/types"

//--------------Login---------------------------//
//---validar el ususario y contrasena-----------------------//
export const actionLoginAsync = (email, password) => {
    return (dispatch) => {
        signInWithEmailAndPassword(authentication, email, password)
            .then(({ user }) => {
                const { displayName, accessToken, photoURL, phoneNumber } = user;
                dispatch(actionLoginSync({ email, password, displayName, accessToken, photoURL, phoneNumber, error: false }));
                console.log(`Bienvenido usuario encontrado ${user.displayName}`);
            })
            .catch(error => {
                console.log(error);
                dispatch(actionLoginSync({ error: true, authenticated: undefined }));
            });
    }
}


// export const actionVerifyCodeAsync = (item) => {
//     return (dispatch) => {
//         const confirmationResult = window.confirmationResult;
//         confirmationResult.confirm(item.code).then(async (result) => {
//             // User signed in successfully.
//             // const user = result.user;
//             const userData = await getUserFromDatabase(item.email);
//             dispatch(actionUpdateUserInfoSync(userData));
//             dispatch(actionAuthenticatedSync());
//         });
//     }
// }

export const actionAuthenticatedSync = (item) => {
    return {
        type: typesLogin.authenticated
    }
}

// export const actionUpdateUserInfoSync = (item) => {
//     return {
//         type: typesLogin.updateUserInfo,
//         payload: {
//             ...item
//         }
//     }
// }

// export const actionCompleteUserInfoAsync = (item) => {
//     return (dispatch) => {
//         const docRef = doc(dataBase, "users", item.id);
//         updateDoc(docRef, item)
//             .then(resp => {
//                 dispatch(actionUpdateUserInfoSync({ ...item, updateUserError: false }));
//             })
//             .catch(error => dispatch(actionUpdateUserInfoSync({ ...item, updateUserError: true })))
//     }
// }

export const actionLoginSync = ({ email, password, displayName, accessToken, photoURL, phoneNumber, error }) => {
    return {
        type: typesLogin.login,
        payload: { email, password, displayName, accessToken, photoURL, phoneNumber, error }
    }
}


//--------------Logout---------------------------//
export const actionLogoutAsyn = () => {
    return (dispatch) => {
        signOut(authentication)
            .then(() => {
                dispatch(actionLogoutSyn())
                console.log('Chao')
            })
            .catch((error) => { console.warn(error, '') });
    }
}


export const actionLogoutSyn = () => {
    return {
        type: typesLogin.logout
    }
}

//-----------------Inicializar con Google-----------------------------//
export const loginGoogle = () => {
    return (dispatch) => {
        console.log('dentro de google')
        signInWithPopup(authentication, google)
            .then(({ user }) => {
                dispatch(actionLoginGoogleAndFacebookSync(user.email, user.displayName, user.accessToken, user.photoURL, user.phoneNumber));
                dispatch(actionAuthenticatedSync());
                console.log(user, 'Usuario Autorizado, Bienvenido')
            })
            .catch(error => {
                console.warn(error, 'Usuario NO Autorizado')
            })
    }
}

export const actionLoginGoogleAndFacebookSync = (email, displayName, accessToken, photoURL, phoneNumber) => {
    return {
        type: typesLogin.loginGoogleAndFacebook,
        payload: { email, displayName, accessToken, photoURL, phoneNumber }
    }
}

//-----------------Inicializar con Facebook-----------------------------//
export const loginFacebook = () => {
    return (dispatch) => {
        console.log("dentro de facebook");
        signInWithPopup(authentication, facebook)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                dispatch(actionLoginGoogleAndFacebookSync(user.email, user.displayName, user.accessToken, user.photoURL, user.phoneNumber));
                dispatch(actionAuthenticatedSync());
                console.log(user, 'Usuario Autorizado, Bienvenido desde Facebook')

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                // const credential = FacebookAuthProvider.credentialFromResult(result);
                // const accessToken = credential.accessToken;

                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.customData.email;
                // The AuthCredential type that was used.
                // const credential = FacebookAuthProvider.credentialFromError(error);

                console.log(error);

                // ...
            });
    }
}