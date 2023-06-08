// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClt7V5SIRumBms6f3ScjOUIU1KqkBk-zA",
  authDomain: "chatbot-barbershop.firebaseapp.com",
  projectId: "chatbot-barbershop",
  storageBucket: "chatbot-barbershop.appspot.com",
  messagingSenderId: "557891812166",
  appId: "1:557891812166:web:ee4321c7d4c8ef022e0347",
  measurementId: "G-H3J5LHD5NL",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const analytics = getAnalytics(firebaseApp);

export { db };
