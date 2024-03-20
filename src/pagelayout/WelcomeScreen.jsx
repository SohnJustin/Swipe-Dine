import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function WelcomeScreen({ navigation }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Login")}
      activeOpacity={0.7} // This makes the touch seem more responsive
    >
      <Text style={styles.title}>Swipe&Dine</Text>
      <Text style={styles.subtitle}>Tap anywhere to continue</Text>
    </TouchableOpacity>
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
    fontSize: 64,
    marginBottom: 20,
  },
  subtitle: {
    paddingTop: 20,
    fontSize: 24,
    color: "gray",
  },
});

export default WelcomeScreen;
