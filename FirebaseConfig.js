// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIOlj1nEEwxrakzMayAUJtUooSSVIJvh0",
  authDomain: "swipedine-7e5a2.firebaseapp.com",
  projectId: "swipedine-7e5a2",
  storageBucket: "swipedine-7e5a2.appspot.com",
  messagingSenderId: "135575457722",
  appId: "1:135575457722:web:70a5bd18c9973d86051783",
  measurementId: "G-JEF4L8F6XH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);