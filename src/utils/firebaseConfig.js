// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyACa5_3ZmLzT6-GCwztheA5nFdQtuKhxSU",
    authDomain: "kids-allowance-a64f2.firebaseapp.com",
    projectId: "kids-allowance-a64f2",
    storageBucket: "kids-allowance-a64f2.appspot.com",
    messagingSenderId: "199280691911",
    appId: "1:199280691911:web:f3a02a276ffd5a2eaa4ce2",
};

// Configure FirebaseUI.
export const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google as auth providers.
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    // signInSuccessUrl: "/loading",
};

firebase.initializeApp(firebaseConfig);
export let db = firebase.firestore();
