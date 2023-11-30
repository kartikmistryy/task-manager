// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_DAMwJrOZ_9zdor0JrSUneBS5fZRkk24",
  authDomain: "task-manager-dd33b.firebaseapp.com",
  projectId: "task-manager-dd33b",
  storageBucket: "task-manager-dd33b.appspot.com",
  messagingSenderId: "447609338101",
  appId: "1:447609338101:web:af0781befe6144622bedbc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {app, db, auth, provider}