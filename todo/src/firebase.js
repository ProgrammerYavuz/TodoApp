// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsrmhETUeSdNy1OBScgyDBMg-WkDiiXjk",
  authDomain: "todo-app-yt-e9f45.firebaseapp.com",
  projectId: "todo-app-yt-e9f45",
  storageBucket: "todo-app-yt-e9f45.appspot.com",
  messagingSenderId: "598262058886",
  appId: "1:598262058886:web:8d6684db01921b46c0e607"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)