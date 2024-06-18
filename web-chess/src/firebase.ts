// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZFO7E_CWFVONWEoboW9-8DCpytDqD_D4",
  authDomain: "web-chess-33dc5.firebaseapp.com",
  projectId: "web-chess-33dc5",
  storageBucket: "web-chess-33dc5.appspot.com",
  messagingSenderId: "258105010198",
  appId: "1:258105010198:web:44c5227431129c39e52d37",
  measurementId: "G-B7QGY67K0N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
