import React from "react";
import { View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { GOOGLE_PLACES_API_KEY } from "@env";
import axios from "axios";
import Entypo from "react-native-vector-icons/Entypo";
// https://us-central1-swipedine-7e5a2.cloudfunctions.net/fetchDataFromYelp
const FIREBASE_FUNCTION_URL = `https://us-central1-swipedine-7e5a2.cloudfunctions.net/fetchDataFromYelp`;
export default function SearchBar({ cityHandler }) {
  const fetchData = async (searchInput) => {
    const encodedCity = encodeURIComponent(searchInput);
    const requestUrl = `${FIREBASE_FUNCTION_URL}?city=${encodedCity}`;
    console.log("Making request to:", requestUrl); // Log the request URL

    try {
      const response = await axios.get(requestUrl);
      console.log("Data received:", response.data);
      cityHandler(searchInput); // Pass the original city name to handler
    } catch (error) {
      console.error("Error fetching data:", error);
      if (response.data) {
        cityHandler(response.data); // Assuming response.data contains the expected result
      } else {
        console.error("No data received from the function");
      }
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.error("Error fetching data:", error.response.data);
        console.error("Status code:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", error.message);
      }
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
          console.log("Selected data:", data);
          if (data && data.description) {
            cityHandler(data.description);
            fetchData(data.description);
          } else {
            console.error("No description available in selected data");
          }
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
              borderRadius: 40,
              alignItems: "center",
            }}
          >
            <Entypo name="magnifying-glass" />
          </View>
        )}
      />
    </View>
  );
}
