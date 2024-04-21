import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import SearchBar from "../pageLayout/searchBar";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
// import { YELP_API_KEY } from "@env";
// import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { addLikedRestaurant } from "../../firebase/dbOperations";
import getRestaurantFromYelp from "../components/getRestaurantfromYelp";
import { fetchLocation } from "../components/fetchLocation";
import { useTime } from "../components/timeContext";

function HomeScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [city, setCity] = useState(``);
  const { selectedTime } = useTime();
  const route = useRoute();
  const [errorMsg, setErrorMsg] = useState("");

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
    const getData = async () => {
      try {
        const cityFromLocation = await fetchLocation();
        const restaurants = await getRestaurantFromYelp(
          cityFromLocation,
          selectedTime
        );
        setRestaurants(restaurants); // Update state with the fetched and filtered restaurants
        console.log("Restaurants fetched and filtered:", restaurants);
      } catch (error) {
        console.error("Error in fetching data: ", error);
        setErrorMsg("Failed to fetch restaurants");
        setRestaurants([]);
      }
    };

    console.log("Fetching data triggered by change in selectedTime or city");
    getData();
  }, [selectedTime, city]); // Dependency array to trigger re-fetching when these values change

  // useEffect(() => {
  //   if (city) {
  //     getRestaurantFromYelp();
  //   }
  // }, [city, selectedTime]);  Only fetch when city or selectedTime changes

  const onSwipedRight = async (cardIndex) => {
    const likedRestaurant = restaurants[cardIndex];
    const restaurantData = {
      name: likedRestaurant.name,
      rating: likedRestaurant.rating, // Assume 'rating' is available in Yelp's response
      address: likedRestaurant.location.address1, // Check Yelp's API response structure
      categories: likedRestaurant.categories,
      yelp_id: likedRestaurant.id,
      image_url: likedRestaurant.image_url,
      is_closed: likedRestaurant.is_closed,
    };
    console.log("Swiped right on: ", likedRestaurant);
    addLikedRestaurant(restaurantData);
  };
  const renderCard = (restaurant) => {
    if (!restaurant || !restaurant.image_url) {
      return (
        <View style={styles.card}>
          <Text>No Image Available</Text>
        </View>
      );
    }
    const categories = restaurant.categories.map((category) => category.title);
    return (
      <View style={styles.card}>
        <Text>Selected Time: {selectedTime.toString()}</Text>
        <Image source={{ uri: restaurant.image_url }} style={styles.image} />
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{restaurant.name}</Text>
          <Text style={styles.subtitle}>
            Rating: {restaurant.rating} ({restaurant.reviews} reviews)
          </Text>
          <Text style={styles.subtitle}>Price: {restaurant.price}</Text>
          <Text style={styles.subtitle}>
            Categories: {categories.join(", ")}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <SearchBar cityHandler={setCity} />
        </View>
        <View style={styles.swiperContainer}>
          <Swiper
            cards={restaurants}
            renderCard={renderCard}
            onSwiped={(cardIndex) => {
              console.log(`Swiped card at index ${cardIndex}`);
            }}
            onSwipedLeft={(cardIndex) => {
              console.log("Swiped left!");
            }}
            onSwipedRight={onSwipedRight}
            cardIndex={0}
            backgroundColor={"transparent"}
            stackSize={3}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get("window");

export default HomeScreen;

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
