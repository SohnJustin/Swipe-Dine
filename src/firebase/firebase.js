// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_API_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "swipedine-7e5a2.firebaseapp.com",
  databaseURL: "https://swipedine-7e5a2-default-rtdb.firebaseio.com",
  projectId: "swipedine-7e5a2",
  storageBucket: "swipedine-7e5a2.appspot.com",
  messagingSenderId: "135575457722",
  appId: "1:135575457722:web:70a5bd18c9973d86051783",
  measurementId: "G-JEF4L8F6XH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Check if Analytics is supported
isSupported()
  .then((supported) => {
    if (supported) {
      const analytics = getAnalytics(app);
      console.log("Firebase Analytics initialized.");
    } else {
      console.log("Firebase Analytics is not supported in this environment.");
    }
  })
  .catch((error) => {
    console.error("Error checking analytics support:", error);
  });

export { auth, app, db };
