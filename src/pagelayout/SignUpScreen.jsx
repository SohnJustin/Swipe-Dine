import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { formatPhone } from "../components/formatPhone";
import { doCreateUserWithPhone } from "../firebase/auth";

function SignUpScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");

  const handlePhoneInput = (text) => {
    const formattedPhoneNumber = formatPhone(text);
    setPhoneNumber(formattedPhoneNumber);
  };

  const handleSignUp = async (e) => {
    if (phoneNumber.length > 10) {
      navigation.navigate("GetOTP", { phoneNumber });
    } else {
      alert("Please enter a valid phone number");
    }
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
        value={fullName}
        onChangeText={(text) => setFullName(text)}
        placeholder="John Doe"
        keyboardType="default"
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
