import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Button } from "react-native";


//Background image
//const backgroundImage = require('../../assets/Loging')
function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../../assets/FoodBack.png')} // Adjust path to your image
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          activeOpacity={1} // Use 1 to make the opacity effect invisible
          style={styles.container}
        >
          <Text style={styles.text}>Welcome to</Text>
          <Text style={styles.title}>Swipe&Dine</Text>
          <Text style={styles.subtitle}>Press here to login!</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// function WelcomeScreen({ navigation }) {
//   return ( // error with this code: <Image source={require('../../assets/appwallpaper.png')} style={styles.backgroundImage} />

//     <TouchableOpacity
//       onPress={() => navigation.navigate('Login')}
//       activeOpacity={1} // Use 1 to make the opacity effect invisible
//       style={styles.container}
//     >
//       <Text style={styles.text}>Welcome to</Text>
//       <Text style={styles.title}>Swipe&Dine</Text>
//       <Text style={styles.subtitle}>Press here to login!</Text>
//     </TouchableOpacity>
//   );
// }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the entire screen
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust transparency as needed
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 25,
    width: '80%',
    marginBottom: 10,
  },
  signupButton: {
    backgroundColor: '#555',
    padding: 15,
    borderRadius: 25,
    width: '80%',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;