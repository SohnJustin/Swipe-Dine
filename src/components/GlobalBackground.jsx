// components/GlobalBackground.jsx
import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

// Import your desired background image
const backgroundImage = require('../../assets/FoodBack.png');

const GlobalBackground = ({ children }) => {
    // Log to confirm this component is being rendered
  console.log('GlobalBackground component rendered.');
  return (
<ImageBackground
    source={backgroundImage}
    style={styles.backgroundImage}
    onLoadEnd={() => console.log('Image loaded')}
  >
    {children}
  </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
});

export default GlobalBackground;
