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
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="password"
        keyboardType="default"
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
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start", // Align items to the start of the container
    paddingTop: 60,
  },
  title: {
    fontSize: 48,
    paddingBottom: 80,
    marginBottom: 40,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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
  },
  signUpText: {
    marginTop: 20,
    color: "#000",
  },
  signUpButton: {
    color: "#0000FF", // or any color you want for the clickable text
    fontWeight: "bold", // optional: if you want 'Sign Up' to be bold
  },
});

export default SignUpScreen;
