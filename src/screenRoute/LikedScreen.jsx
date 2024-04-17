import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import { useFocusEffect } from "@react-navigation/native";

const LikedScreen = () => {
  const [likedRestaurants, setLikedRestaurants] = useState([]);

  const fetchLikedRestaurants = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        console.log("User not logged in");
        return;
      }
      const querySnapshot = await getDocs(
        collection(db, "users", userId, "likedRestaurants")
      );
      const restaurants = [];
      querySnapshot.forEach((doc) => {
        restaurants.push({ ...doc.data(), id: doc.id }); // Ensuring each item has 'id'
      });
      setLikedRestaurants(restaurants);
    } catch (error) {
      console.error("Error fetching liked restaurants: ", error);
    }
  };
  const deleteRestaurant = async (id) => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      await deleteDoc(doc(db, "users", userId, "likedRestaurants", id));
      fetchLikedRestaurants(); // Refresh the list after deletion
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchLikedRestaurants();
    }, [fetchLikedRestaurants])
  );

  const renderItem = (data) => (
    <View style={styles.restaurantBox}>
      <Text style={styles.name}>{data.item.name || "Name not available"}</Text>
      <Text style={styles.details}>
        Categories:{" "}
        {data.item.categories?.map((cat) => cat.title).join(", ") || "N/A"}
      </Text>
      <Text style={styles.details}>
        Address:{" "}
        {data.item.location?.address1 ||
          data.item.address ||
          "No address found"}
      </Text>
    </View>
  );
  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
          if (data.item.id) {
            // Checking if 'id' is available
            deleteRestaurant(data.item.id);
          } else {
            console.error("ID missing in data:", data.item);
          }
        }}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <SwipeListView
        data={likedRestaurants}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  restaurantBox: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "red",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingLeft: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
    borderRadius: 10,
  },
  backTextWhite: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default LikedScreen;
