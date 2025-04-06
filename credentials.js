// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsTCAPQKxH2cRkk7g-wqyj_nyHW_JNWCo",
  authDomain: "tempo-8043f.firebaseapp.com",
  projectId: "tempo-8043f",
  storageBucket: "tempo-8043f.firebasestorage.app",
  messagingSenderId: "1072057709016",
  appId: "1:1072057709016:web:0306bf9d1c50cfacbd42ad",
  measurementId: "G-HEJZEJR0S3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);