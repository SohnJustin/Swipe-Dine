import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import Swiper from "react-native-deck-swiper";
import SearchBar from "../pageLayout/searchBar";
import { addLikedRestaurant } from "../../firebase/dbOperations";
import {
  fetchAndFilterRestaurantsByTime,
  getRestaurantFromYelp,
} from "../components/getRestaurantfromYelp";
import { fetchLocation } from "../components/fetchLocation";
import { useTime } from "../components/timeContext";

const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [city, setCity] = useState("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const { selectedTime } = useTime();

  useEffect(() => {
    const initialize = async () => {
      console.log("Initializing HomeScreen...");
      if (useCurrentLocation) {
        const fetchedCity = await fetchLocation();
        console.log("Location fetched:", fetchedCity);
        setCity(fetchedCity);
      }
    };
    initialize();
  }, [useCurrentLocation]); // Now it only runs if useCurrentLocation changes.

  useEffect(() => {
    console.log("City or time changed:", city, selectedTime);
    if (city) {
      if (selectedTime) {
        console.log("Fetching restaurants with time filter...");
        fetchRestaurants(city, selectedTime);
        console.log(`Selected City: ${city}, Selected Time: ${selectedTime}`);
      } else {
        console.log("Fetching restaurants without time filter...");
        fetchRestaurants(city);
        console.log(`Selected City: ${city}`);
      }
    }
  }, [city, selectedTime]);

  const fetchRestaurants = async (searchCity, timeFilter = selectedTime) => {
    console.log(
      "Fetching restaurants for:",
      searchCity,
      "at time:",
      timeFilter
    );
    try {
      const results = timeFilter
        ? await fetchAndFilterRestaurantsByTime(searchCity, timeFilter)
        : await getRestaurantFromYelp(searchCity);
      console.log("Restaurants fetched:", results.length);
      setRestaurants(results);
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
    }
  };

  const handleCityChange = (newCity) => {
    console.log("City changed via the searchbar to:", newCity);
    setUseCurrentLocation(false);
    setCity(newCity);
  };
  const onSwipedRight = async (cardIndex) => {
    const likedRestaurant = restaurants[cardIndex];
    // Assuming additional details are handled here
    console.log("Swiped right on: ", likedRestaurant);
    addLikedRestaurant(likedRestaurant);
  };

  const renderCard = (restaurant) => (
    <View style={styles.card}>
      <Image source={{ uri: restaurant.image_url }} style={styles.image} />
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{restaurant.name}</Text>
        <Text style={styles.subtitle}>
          Rating: {restaurant.rating} ({restaurant.reviews} reviews)
        </Text>
        <Text style={styles.subtitle}>Price: {restaurant.price}</Text>
        <Text style={styles.subtitle}>
          Categories: {restaurant.categories.map((c) => c.title).join(", ")}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <SearchBar cityHandler={handleCityChange} />
        </View>
        <View style={styles.swiperContainer}>
          {restaurants.length > 0 ? (
            <Swiper
              cards={restaurants}
              renderCard={renderCard}
              onSwipedRight={onSwipedRight}
              stackSize={3}
            />
          ) : (
            <Text>No open restaurants found at the selected time.</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  searchBarContainer: {
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  swiperContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexGrow: 0,
    height: "70%",
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
    width: "100%",
    height: "100%",
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
  subtitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  safeArea: {
    flex: 1,
    paddingTop: 20,
  },
});
export default HomeScreen;
