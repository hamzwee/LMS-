
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjzOftySUVxHUQlJ-QDOPviKVEJJhP4t0",
  authDomain: "lms-4a73e.firebaseapp.com",
  databaseURL: "https://lms-4a73e-default-rtdb.firebaseio.com",
  projectId: "lms-4a73e",
  storageBucket: "lms-4a73e.appspot.com",
  messagingSenderId: "509538702647",
  appId: "1:509538702647:web:3e29625b16ef653dd2f6b2",
  measurementId: "G-PCQD236RRT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth,db,storage}