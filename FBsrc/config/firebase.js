// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {    //!!!move all these to environmental variable file later!!!
  apiKey: "AIzaSyCfPs2RLvUSItjYYsEdjF1R0CiGLoxhc_Q",
  authDomain: "swipedinedb.firebaseapp.com",
  projectId: "swipedinedb",
  storageBucket: "swipedinedb.appspot.com",
  messagingSenderId: "954537720946",
  appId: "1:954537720946:web:d91bba59cc66006ed896eb",
  measurementId: "G-8P94QQR7K4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore()