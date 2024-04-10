import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
//import { useAuth } from "../context/authContext";
import { auth } from "../firebase/firebase";
import Swiper from "react-native-deck-swiper";
import getRestaurants from "../components/getRestaurantAPI";
import Geolocation from "react-native-geolocation-service";
import SearchBar from "../components/searchBar.";

const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [city, setCity] = useState("Fullerton");
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
          .catch((error) => console.error("Error fetching restaurants", error));
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
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <SearchBar cityHandler={setCity} />
        <View style={styles.card}>
          <Image source={{ uri: restaurant.photoUrl }} style={styles.image} />
          <View style={styles.textWrapper}>
            <Text style={styles.text}>{restaurant.name}</Text>
          </View>
          <script
            async
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA9nCDjZn1426m8ajb5sJUGWuDnu7DfT_Y&loading=async&libraries=places&callback=initMap"
          ></script>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar cityHandler={setCity} />
      </View>
      <View styles={styles.swiperContainer}>
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
        <script
          async
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA9nCDjZn1426m8ajb5sJUGWuDnu7DfT_Y&loading=async&libraries=places&callback=initMap"
        ></script>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8", // Corrected typo here
    paddingTop: 60, // Add padding at the top for the search bar
  },
  searchBarContainer: {
    paddingTop: 0,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  swiperContainer: {
    flex: 1, // Allows swiper to take up the remaining space
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexGrow: 0, // Control the size of the card
    height: height * 0.5, // Reduced height of the card
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
    width: "100%", // Make image take full width of the card
    height: "70%", // Adjust height as necessary
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
