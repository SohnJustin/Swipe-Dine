import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";
import { useFocusEffect } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { Modal } from "react-native";
import { Linking } from "react-native";
import { Platform } from "react-native";

const LikedScreen = () => {
  const [likedRestaurants, setLikedRestaurants] = useState([]);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

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
        const data = doc.data();
        restaurants.push({
          ...data,
          id: doc.id,
          latitude: data.latitude, // Ensure these names match database fields
          longitude: data.longitude,
        });
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

  const renderItem = (data) => {
    //console.log("Data in renderItem:", data.item);
    return (
      <View style={styles.restaurantBox}>
        <Text style={styles.name}>
          {data.item.name || "Name not available"}
        </Text>
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
  };
  const renderHiddenItem = (data, restaurantName) => {
    //console.log("Data in renderHiddenItem:", data.item);
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backLeftBtn, styles.backLeftBtnLeft]}
          onPress={() => {
            console.log("Location data when button pressed:", data.item);
            const location = {
              latitude: data.item.latitude,
              longitude: data.item.longitude,
            };
            const restaurantName = data.item.name;
            openMap(location, restaurantName);
          }}
        >
          <Text style={styles.backTextWhite}>View on Map</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => {
            if (data.item.id) {
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
  };

  const openMap = (location, restaurantName) => {
    console.log("Opening map with location:", location);
    if (
      !location ||
      typeof location.latitude !== "number" ||
      typeof location.longitude !== "number"
    ) {
      console.error("Invalid location data:", location);
      alert("Location data is not available for this restaurant.");
      return;
    }
    const latitude = location.latitude;
    const longitude = location.longitude;
    const label = encodeURI(restaurantName);

    const url = Platform.select({
      ios: `maps:${latitude},${longitude}?q=${label}`,
      android: `geo:${latitude},${longitude}?q=${label}`,
    });

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open this URL: " + url);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SwipeListView
          data={likedRestaurants}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-75}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={isMapVisible}
          onRequestClose={() => {
            setIsMapVisible(false);
          }}
        >
          {selectedLocation && (
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: selectedLocation.latitude,
                  longitude: selectedLocation.longitude,
                }}
              />
            </MapView>
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsMapVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close Map</Text>
          </TouchableOpacity>
        </Modal>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b6c0d0",  // Darker grey
  },
  restaurantBox: {
    backgroundColor: "#def2e5", // Light green
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",  
  },
  details: {
    fontSize: 14,
    color: "#666",  
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  backRightBtn: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    height: "100%",
    right: 0,
    borderRadius: 10,
    backgroundColor: "#FF6347",  // Lighter red
  },
  backLeftBtn: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    height: "100%",
    left: 0,
    borderRadius: 10,
    backgroundColor: "#32CD32",  // Vibrant green
  },
  backTextWhite: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",  
  },
  closeButtonText: {
    fontSize: 16,
    color: "black",
  },
  safeArea: {
    flex: 1,
    paddingTop: 20,
  },
});

export default LikedScreen;
