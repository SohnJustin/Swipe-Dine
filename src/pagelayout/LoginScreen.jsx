import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { formatPhone } from "../components/formatPhone";

function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");

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
        placeholder="(123) 456-7890"
        keyboardType="number-pad"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Login</Text>
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
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
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
  signUpButton: {
    color: "#0000FF", // or any color you want for the clickable text
    fontFamily: "Lato",
    fontWeight: "bold", // optional: if you want 'Sign Up' to be bold
  },
});

export default LoginScreen;
