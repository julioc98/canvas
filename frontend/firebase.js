// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5j5mpt1BeGdbQrkTYQhtIzfRkI8TPV3w",
  authDomain: "teste-3322f.firebaseapp.com",
  projectId: "teste-3322f",
  storageBucket: "teste-3322f.appspot.com",
  messagingSenderId: "633192664979",
  appId: "1:633192664979:web:8e8314671e2053176ba266",
  measurementId: "G-G51E9W9RXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);