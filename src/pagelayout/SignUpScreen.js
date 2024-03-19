import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { formatPhone, setPhoneNumber } from "../components/formatPhone";
import Auth from "../components/Auth";
import firebase from "firebase/compat/app";
// Required for side-effects
import { getFirestore } from "firebase/firestore";

function SignUpScreen({ navigation }) {
  const addUserInformation = async (
    userId,
    { fullName: FullName, phoneNumber }
  ) => {
    try {
      await firestore().collection("users").doc(userId).set(userInfo);
    } catch (error) {
      console.error(error);
    }
  };
  const [FullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleRegistration = async () => {
    try {
      // Assuming the user is already authenticated in some way and you have their UID
      const userId = firebase.auth().currentUser.uid;
      await addUserInformation(userId, { fullName: FName, phoneNumber });
      navigation.navigate("Login");
      // You can add navigation to the home screen or user dashboard here
    } catch (error) {
      console.error("Error during registration: ", error);
    }
  };

  /*
  WORRY ABOUT THIS LATER, FOR NOW JUST GET THE USER INFO
  ------------------------------------------------------

  
  const sendVerificationCode = async (phoneNumber) => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    return confirmation;
  };
  const verifyCode = async (confirmation, verificationCode) => {
    try {
      await confirmation.confirm(verificationCode);
      // User is successfully signed in
    } catch (error) {
      console.error("Invalid code.", error);
    }
  };
*/
  const handlePhoneInput = (text) => {
    const formattedPhoneNumber = formatPhone(text);
    setPhoneNumber(formattedPhoneNumber);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Swipe&Dine</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={handlePhoneInput}
        placeholder="Phone Number: (123)-456-7890"
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        value={FullName}
        onChangeText={(text) => setFullName(text)}
        placeholder="Full Name: John Doe"
        keyboardType="default"
      />
      <TouchableOpacity
        method="POST"
        style={styles.button}
        onPress={handleRegistration}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.signInText}>Already have an account?</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Login")
        } /* include the back end here to save user info here*/
      >
        Sign in!
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 48,
    fontFamily: "Mohave",
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontFamily: "Lato",
    width: "80%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#000",
    padding: 10,
    width: "80%",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Lato",
  },
  signUpText: {
    marginTop: 20,
    color: "#000",
    fontFamily: "Lato",
  },
  signInText: {
    marginTop: 20,
    color: "#000",
    fontFamily: "Lato",
  },
});

export default SignUpScreen;
