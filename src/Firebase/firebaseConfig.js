import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBgf-5RI_Svnat6tSnbO-b2tw4aG6Te4ek",
    authDomain: "pokedex-prueba-tecnica.firebaseapp.com",
    projectId: "pokedex-prueba-tecnica",
    storageBucket: "pokedex-prueba-tecnica.appspot.com",
    messagingSenderId: "493964953829",
    appId: "1:493964953829:web:2f283c7f46b2409e96ac0c"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const dataBase = getFirestore(app);
export const google = new GoogleAuthProvider()
export const facebook = new FacebookAuthProvider();