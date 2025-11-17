// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJjU2Ux3ze_cRuIzHrNqFaTXFU47DhD0A",
  authDomain: "gestodacyti.firebaseapp.com",
  databaseURL: "https://gestodacyti-default-rtdb.firebaseio.com",
  projectId: "gestodacyti",
  storageBucket: "gestodacyti.firebasestorage.app",
  messagingSenderId: "155649703329",
  appId: "1:155649703329:web:c3909a366ae1d89ff91fe0",
  measurementId: "G-GB7SFVKZQ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Conexión a Realtime Database

export { database };