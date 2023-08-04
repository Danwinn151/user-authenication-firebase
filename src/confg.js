// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDK3AMzW3KgtR0dTOxwF6a5FiiOdUN3m6k",
  authDomain: "auth-app-1eedd.firebaseapp.com",
  projectId: "auth-app-1eedd",
  storageBucket: "auth-app-1eedd.appspot.com",
  messagingSenderId: "933857762305",
  appId: "1:933857762305:web:f461dbf6bf14cf38ca7400",
  measurementId: "G-YM6PQ3XPMJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Initialize Cloud Firestore and get a reference to the service
