import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { authentication, google, facebook } from "../../Firebase/firebaseConfig";
import { typesLogin } from "../types/types"

//--------------Login---------------------------//
//---validar el ususario y contrasena-----------------------//
export const actionLoginAsync = (email, password) => {
    return (dispatch) => {
        signInWithEmailAndPassword(authentication, email, password)
            .then(({ user }) => {
                const { displayName, accessToken, photoURL, phoneNumber } = user;
                dispatch(actionLoginSync({ email, password, displayName, accessToken, photoURL, phoneNumber, error: false }));
            })
            .catch(error => {
                console.log(error);
                dispatch(actionLoginSync({ error: true, authenticated: undefined }));
            });
    }
}

export const actionAuthenticatedSync = (item) => {
    return {
        type: typesLogin.authenticated
    }
}


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
                const user = result.user;
                dispatch(actionLoginGoogleAndFacebookSync(user.email, user.displayName, user.accessToken, user.photoURL, user.phoneNumber));
                dispatch(actionAuthenticatedSync());
            })
            .catch((error) => {
                console.log(error);
            });
    }
}