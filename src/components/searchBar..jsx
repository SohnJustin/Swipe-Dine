import React from "react";
import { View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { GOOGLE_PLACES_API_KEY } from "@env";
import axios from "axios";

const FIREBASE_FUNCTION_URL = `https://us-central1-swipedine-7e5a2.cloudfunctions.net/fetchDataFromYelp`;

export default function SearchBar({ cityHandler }) {
  const fetchData = async (searchInput) => {
    try {
      const response = await axios.get(
        `${FIREBASE_FUNCTION_URL}?city=${searchInput}`
      );
      console.log(response.data);
      cityHandler(response.data); // Replace with appropriate handling
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View style={{ marginTop: 15, flexDirection: "row" }}>
      <GooglePlacesAutocomplete
        placeholder="Search..."
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "en",
          types: "(cities)",
        }}
        onPress={(data, details = null) => {
          console.log(data, details);
          cityHandler(data.description);
          fetchData(data.description); // Call fetchData with the city name
        }}
        onFail={(error) => console.error(error)}
        styles={{
          textInput: {
            backgroundColor: "#eee",
            borderRadius: 20,
            fontWeight: "700",
            marginTop: 7,
          },
          textInputContainer: {
            backgroundColor: "#eee",
            borderRadius: 50,
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          },
        }}
        renderLeftButton={() => (
          <View style={{ marginLeft: 10 }}>
            <Ionicons name="location-sharp" size={24} />
          </View>
        )}
        renderRightButton={() => (
          <View
            style={{
              flexDirection: "row",
              marginRight: 8,
              backgroundColor: "white",
              padding: 9,
              borderRadius: 30,
              alignItems: "center",
            }}
          >
            <AntDesign
              name="clockcircle"
              size={11}
              style={{ marginRight: 6 }}
            />
            <Text>Search</Text>
          </View>
        )}
      />
    </View>
  );
}
