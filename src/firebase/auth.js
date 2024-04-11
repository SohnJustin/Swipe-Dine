import {
  getAuth,
  createUserWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";

export const doSignInAnonymously = async (auth) => {
  return signInAnonymously(auth);
};
export const doSignUpWithEmail = async (email, password) => {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User created:", user.uid);
    // Additional logic after successful signup (e.g., navigate to home screen)
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};
export const doSignOut = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    console.log("User signed out successfully");
    // Additional logic after successful sign-out
  } catch (error) {
    console.error("Error signing out:", error.message);
    // Handle errors (e.g., show an error message)
  }
};
// Later on in the project, we will add more functions to this file
// Such as...
// adding more different methods of logging in, that will be done here.
