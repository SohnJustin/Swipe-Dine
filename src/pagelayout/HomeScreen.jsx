import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Swiper from "react-native-deck-swiper";
// import getRestaurants from "../components/getRestaurantAPI";
// import Geolocation from "react-native-geolocation-service";
import SearchBar from "../components/searchBar.";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { GOOGLE_PLACES_API_KEY, YELP_API_KEY } from "@env";
import { localRestaurants } from "../components/localRestaurant";

const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState(localRestaurants);
  const [city, setCity] = useState("Fullerton");

  const getRestaurantFromYelp = async () => {
    try {
      const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;
      const reponse = await axios.get(yelpUrl, {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`,
        },
      });
      setRestaurants(reponse.data.business);
    } catch (error) {
      console.error("Error fetching data from yelp", error);
    }
  };

  const handleSearch = async (searchInput) => {
    const q = query(
      collection(db, "restaurants"),
      where("city", "==", searchInput)
    );
    const querySnapshot = await getDocs(q);
    const fetchedRestaurants = [];
    querySnapshot.forEach((doc) => {
      fetchedRestaurants.push(doc.data());
    });
    setRestaurants(fetchedRestaurants);
  };

  useEffect(() => {
    getRestaurantFromYelp();
    handleSearch(city);
  }, [city]);

  const renderCard = (restaurant) => {
    // check if restaurant and photourl are defined
    if (!restaurant || !restaurant.image_url) {
      return (
        <View style={styles.card}>
          <Text>No Image Available</Text>
        </View>
      );
    }
    return (
      <View style={styles.card}>
        <Image source={{ uri: restaurant.image_url }} style={styles.image} />
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{restaurant.name}</Text>
          <Text style={styles.subtitle}>
            Rating: {restaurant.rating} ({restaurant.reviews} reviews)
          </Text>
          <Text style={styles.subtitle}>Price: {restaurant.price}</Text>
          <Text style={styles.subtitle}>
            Categories: {restaurant.categories.join(", ")}
          </Text>
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
            //console.log(GOOGLE_PLACES_API_KEY);
          }}
          onSwipedLeft={(cardIndex) => {
            console.log("Swiped left!");
            //console.log(YELP_API_KEY);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("Swiped right!");
            //console.log(GOOGLE_PLACES_API_KEY);
          }}
          cardIndex={0}
          backgroundColor={"transparent"}
          stackSize={3} // the number of cards to be shown in the background
        />
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
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
