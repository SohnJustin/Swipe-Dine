import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
//import { useAuth } from "../context/authContext";
import { auth } from "../firebase/firebase";
import Swiper from "react-native-deck-swiper";
import getRestaurants from "../components/getRestaurantAPI";
import Geolocation from "react-native-geolocation-service";

const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState(null);
  const radius = 10000; // 10 kilometers

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        getRestaurants(latitude, longitude, radius)
          .then((data) => {
            console.log(data.results);
            setRestaurants(data.results);
          })
          .catch((error) => console.error(error));
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  const renderCard = (restaurant) => {
    // check if restaurant and photourl are defined
    if (!restaurant || !restaurant.photoUrl) {
      return (
        <View style={styles.card}>
          <Text>No Image Available</Text>
        </View>
      );
    }
    return (
      <View style={styles.card}>
        <Image source={{ uri: restaurant.photoUrl }} style={styles.image} />
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{restaurant.name}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Swiper
        cards={restaurants}
        renderCard={renderCard}
        onSwiped={(cardIndex) => {
          console.log(`Swiped card at index ${cardIndex}`);
        }}
        onSwipedLeft={(cardIndex) => {
          console.log("Swiped left!");
        }}
        onSwipedRight={(cardIndex) => {
          console.log("Swiped right!");
        }}
        cardIndex={0}
        backgroundColor={"transparent"}
        stackSize={3} // the number of cards to be shown in the background
      />
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgorundColor: "#f8f8f8",
  },
  card: {
    flex: 1,
    borderRadius: 10,
    shadowRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: "center",
    backgroundColor: "#FFF",
    marginBottom: 10,
  },
  image: {
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 10,
  },
  textWrapper: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  // ... Add styles for any additional elements like buttons or ratings
});

export default HomeScreen;
