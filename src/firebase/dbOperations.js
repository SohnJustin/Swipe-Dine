// dbOperations.js
import { auth, db } from "./firebase";
import { doc, setDoc, collection } from "firebase/firestore";

const addLikedRestaurant = async (restData) => {
  const userId = auth.currentUser?.uid; // get the current user's ID

  if (!userId) {
    Alert.alert("You must be logged in to swipe right on restaurants.");
    console.log("User not logged in");
    return;
  }
  const likedRestaurantsRef = collection(
    db,
    "users",
    userId,
    "likedRestaurants"
  );
  await setDoc(doc(likedRestaurantsRef), restData);
};
const addUserToFirestore = async (email, password) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      email: email,
      password: password,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export { addLikedRestaurant, addUserToFirestore };
