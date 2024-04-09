import { auth } from "@react-native-firebase/auth";
import { signInAnonymously } from "firebase/auth";

export const doSignInAnonymously = async (auth) => {
  return signInAnonymously(auth);
};
export const doSignUpWithPhone = async () => {
  return createUserWithPhoneNumber(auth, phone);
};

export const doSignOut = async () => {
  return auth.signOut();
};

// Later on in the project, we will add more functions to this file
// Such as...
// adding more different methods of logging in, that will be done here.
