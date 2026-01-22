import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCQGaU_WSb7KE4FtKZyxH4pHNYeXXuGpcw",
    authDomain: "rdx2oo7.firebaseapp.com",
    projectId: "rdx2oo7",
    storageBucket: "rdx2oo7.firebasestorage.app",
    messagingSenderId: "227061836790",
    appId: "1:227061836790:web:3e47e8ea2432be7b1af5d7",
    measurementId: "G-KCNFPTBWYC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
