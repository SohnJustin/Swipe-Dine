import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { formatPhone } from "../components/formatPhone";

function SignUpScreen({ navigation }) {
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
        placeholder="Phone Number: (123)-456-7890"
        keyboardType="phone-pad"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.goBack()
        } /* include the back end here to save user info here*/
      >
        <Text style={styles.signInText}>Already have an account? Sign In</Text>
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
