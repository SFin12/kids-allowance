// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyACa5_3ZmLzT6-GCwztheA5nFdQtuKhxSU",
    authDomain: "kids-allowance-a64f2.firebaseapp.com",
    projectId: "kids-allowance-a64f2",
    storageBucket: "kids-allowance-a64f2.appspot.com",
    messagingSenderId: "199280691911",
    appId: "1:199280691911:web:f3a02a276ffd5a2eaa4ce2",
    measurementId: "G-NZL62DDR76",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
