import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { auth } from "../firebase/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  doSignInAnonymously,
} from "firebase/auth";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Missing Fields", "Both email and password are required.");
      return;
    }
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Time");
    } catch (error) {
      let errorMessage = "Failed to log in. Please try again.";
      if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is not valid.";
      } else if (error.code === "auth/user-disabled") {
        errorMessage =
          "The user corresponding to the given email has been disabled.";
      } else if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        errorMessage = "Incorrect email or password.";
      }
      Alert.alert("Login Error", errorMessage);
    }
  };
  const handleGuestLogin = async () => {
    try {
      await doSignInAnonymously(auth);
      alert("Logged in as a guest");
      navigation.navigate("Time");
    } catch (error) {
      console.error(error);
      alert("Error logging in as a guest");
      // Handle any errors here
    }
  };
  //      {userLoggedIn && <Navigate to="/home" replace={true} />}
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Swipe&Dine</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        title="Continue as Guest"
        style={styles.button}
        onPress={() => handleGuestLogin()}
      >
        <Text style={styles.buttonText}>Continue as Guest</Text>
      </TouchableOpacity>
      <Text style={styles.signUpText}>
        Don't have an account?{" "}
        <Text
          style={styles.signUpButton}
          onPress={() => navigation.navigate("SignUp")}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    alignItems: "center",
    justifyContent: "center", 
    padding: 20,
  },
  title: {
    fontSize: 32, 
    fontWeight: "bold",
    color: "#333", 
    marginBottom: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "#ccc", 
    borderRadius: 5, 
    padding: 10,
    width: "80%",
    backgroundColor: "#fff", 
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


export default LoginScreen;
