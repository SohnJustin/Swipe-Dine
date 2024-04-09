import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { formatPhone } from "../components/formatPhone";
import { doSignInWithPhone } from "../firebase/auth";
import { doSignInAnonymously } from "../firebase/auth";
import { auth } from "../firebase/firebase";

function LoginScreen({ navigation }) {
  //const { userLoggedIn } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneInput = (text) => {
    const formattedPhoneNumber = formatPhone(text);
    setPhoneNumber(formattedPhoneNumber);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithPhone(phoneNumber);
    }
  };
  const handleGuestLogin = async () => {
    try {
      await doSignInAnonymously(auth);
      alert("Logged in as a guest");
      navigation.navigate("Home");
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
        value={phoneNumber}
        onChangeText={handlePhoneInput}
        placeholder="(123) 456-7890"
        keyboardType="number-pad"
      />
      <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
        <Text method="onSubmit" style={styles.buttonText}>
          Login
        </Text>
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
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start", // Align items to the start of the container
    paddingTop: 60,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
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
    color: "#fff",
    margin: 15,
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

export default LoginScreen;
