import { getFirestore, collection, addDoc } from "firebase/firestore";

// Function to add a new user to Firestore
export const addUserToFirestore = async (userData) => {
  const db = getFirestore();
  const userRef = collection(db, "users");

  try {
    const docRef = await addDoc(userRef, userData);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
