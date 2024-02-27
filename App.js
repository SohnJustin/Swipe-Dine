import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Button } from "react-native";

export default function App({ onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Swipe&Dine</Text>
      <Pressable style={styles.loginButton} onPress={onPress}>
        <Text style={styles.buttonStyle}>Login</Text>
      </Pressable>
      <Pressable style={styles.loginButton} onPress={onPress}>
        <Text style={styles.buttonStyle}>Signup</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 36,
    paddingBottom: 10,
    fontFamily: "Mohave",
    bottom: "15%",
  },
  loginButton: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    width: "40%",
    margin: 20,
    padding: 30,
    backgroundColor: "black",
    bottom: "10%",
    borderRadius: 15,
  },
  buttonStyle: {
    color: "white",
    fontSize: 24,
  },
});
