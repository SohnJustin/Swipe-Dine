import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import { useFocusEffect } from "@react-navigation/native";

const LikedScreen = () => {
  const [likedRestaurants, setLikedRestaurants] = useState([]);

  const fetchLikedRestaurants = async () => {
    const userId = auth.currentUser?.uid; // Ensure you handle cases where user is not logged in
    if (!userId) {
      console.log("User not logged in");
      return;
    }
    const querySnapshot = await getDocs(
      collection(db, "users", userId, "likedRestaurants")
    );
    const restaurants = [];
    querySnapshot.forEach((doc) => {
      restaurants.push({ ...doc.data(), id: doc.id });
    });
    setLikedRestaurants(restaurants);
  };

  useFocusEffect(
    useCallback(() => {
      fetchLikedRestaurants();
    }, [])
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={likedRestaurants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.restaurantBox}>
            {/* Ensure that each field is a string; if unsure, convert to string or provide defaults */}
            <Text style={styles.name}>
              {item.name ? item.name : "Name not available"}
            </Text>
            <Text style={styles.details}>
              Rating: {item.rating ? item.rating.toString() : "N/A"}
            </Text>
            <Text style={styles.details}>
              Address:{" "}
              {item.location?.address1 ||
                item.address ||
                "No address can be found"}
            </Text>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10, // Add padding around the list
    backgroundColor: "#f0f0f0", // Light gray background for the whole screen
  },
  restaurantBox: {
    backgroundColor: "white", // White background for each item
    padding: 15, // Padding inside each box
    marginVertical: 8, // Vertical space between boxes
    borderRadius: 10, // Rounded corners
    shadowColor: "#000", // Shadow for 3D effect
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Android elevation
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
  },
});

export default LikedScreen;
