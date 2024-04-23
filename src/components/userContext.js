import React, { createContext, useState, useContext, useEffect } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import {
  doSignInAnonymously,
  doSignUpWithEmail,
  doSignOut,
} from "../../firebase/auth";
export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    profilePic: null,
  });
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, set user state
        setUser({
          ...user,
          name: user.displayName,
          email: user.email,
          profilePic: user.photoURL
            ? { uri: user.photoURL }
            : require("../assets/default-profile-picture.jpeg"),
          // any other user details you might need
        });
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const loginAnonymously = async () => {
    await doSignInAnonymously();
  };

  const signUpWithEmail = async (email, password) => {
    await doSignUpWithEmail(email, password);
  };

  const signOut = async () => {
    await doSignOut();
  };

  const updateUserProfilePicture = async () => {
    // Let the user pick an image from their gallery
    const result = await launchImageLibrary({ mediaType: "photo" });

    if (result.didCancel) {
      console.log("User cancelled image picker");
    } else if (result.error) {
      console.log("ImagePicker Error: ", result.error);
    } else {
      const imageUri = result.assets[0].uri;
      // Assuming you have a way to get the current user's ID
      const userId = getAuth().currentUser.uid;
      const imageName = `${userId}_${new Date().toISOString()}`;
      const storageRef = storage().ref(`profilePictures/${imageName}`);

      // Upload the image to Firebase Storage
      const uploadTask = storageRef.putFile(imageUri);

      try {
        await uploadTask;
        // Get the URL to the uploaded image
        const downloadURL = await storageRef.getDownloadURL();

        // Update the user's profile picture URL
        await updateProfile(getAuth().currentUser, { photoURL: downloadURL });

        // Update user context or state with the new photo URL
        setUser((prevUser) => ({
          ...prevUser,
          profilePic: { uri: downloadURL },
        }));
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loginAnonymously,
        signUpWithEmail,
        signOut,
        updateUserProfilePicture,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
