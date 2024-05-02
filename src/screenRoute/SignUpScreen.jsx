import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { doSignUpWithEmail } from "../firebase/auth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Initialized the error state here

  const handleSignUp = async (e) => {
    try {
      await doSignUpWithEmail(email, password);
      console.log("User signed up");
      navigation.navigate("Login");
    } catch (error) {
      setError(error.message); // Update the error state to display the message
      console.error("Error signing up:", error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Swipe&Dine</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="johndoe@email.com"
        inputMode="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="password"
        inputMode="default"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={() => handleSignUp()}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.signUpText}>
        Already have an account?{" "}
        <Text
          style={styles.signUpButton}
          onPress={() => navigation.navigate("Login")}
        >
          Sign In
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // consider adding a background image or color gradient if used elsewhere
    alignItems: "center",
    justifyContent: "center", // Updated to center content vertically
    padding: 20,
  },
  title: {
    fontSize: 32, // Adjusted to match WelcomeScreen
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "#ccc", // More subtle border color
    borderRadius: 5,
    padding: 10,
    width: "80%",
    backgroundColor: "#fff", // Lighter background for inputs
  },
  button: {
    alignItems: "center",
    backgroundColor: "#868cec", // Match the primary button color from WelcomeScreen
    padding: 15,
    width: "80%",
    borderRadius: 25, // Match border radius from WelcomeScreen
    margin: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold", // Ensure bold text for readability
  },
  signUpText: {
    marginTop: 20,
    color: "#333",
  },
  signUpButton: {
    color: "#0049bb", // Match link colors
    fontWeight: "bold",
  },
});


export default SignUpScreen;
