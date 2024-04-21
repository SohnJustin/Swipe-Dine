import React, { createContext, useState, useContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doSignInAnonymously,
  doSignUpWithEmail,
  doSignOut,
} from "../firebase/auth";

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

  return (
    <UserContext.Provider
      value={{ user, setUser, loginAnonymously, signUpWithEmail, signOut }}
    >
      {children}
    </UserContext.Provider>
  );
};
