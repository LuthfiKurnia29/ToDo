import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// Optionally import the services that you want to use
// import {...} from "firebase/database";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCbg2aSSpM2zUl2xgx02UvGoaznMPYq_WM",
  authDomain: "instagram-clone-3a1d9.firebaseapp.com",
  projectId: "instagram-clone-3a1d9",
  storageBucket: "instagram-clone-3a1d9.appspot.com",
  messagingSenderId: "528659180387",
  appId: "1:528659180387:web:bbfbf9f5cb9379aeebc156",
  measurementId: "G-NZMMT0VL5W",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

// onAuthStateChanged(FIREBASE_AUTH, (user) => {
//     if(user) {

//     } else {

//     }
// });