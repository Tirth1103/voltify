// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsdz4ZLBOQIx1FdKXOqWA6yYEI3hbI4pA",
  authDomain: "voltify-b1aff.firebaseapp.com",
  projectId: "voltify-b1aff",
  storageBucket: "voltify-b1aff.firebasestorage.app",
  messagingSenderId: "568766142319",
  appId: "1:568766142319:web:df09b73ae337c7a71eba9a",
  measurementId: "G-J1TYR2LS46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);