import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";

const Firestore = async () => {
  const db = getFirestore();
  // Using this to get or read data from the firestore
  const userRef = collection(db, "users");

  const addData = async () => {
    try {
      // Using this to add data to the firestore
      let user = {
        name: "John Doe", // Just an example
        phone: "123-456-7890", // Just an example
      };
      addDoc(userRef, user);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const getData = async () => {
    try {
      const querySnapshot = await getDocs(userRef);
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    } catch (e) {
      console.error("Error getting documents: ", e);
    }
  };
};
