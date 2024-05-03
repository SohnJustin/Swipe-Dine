import React, { useState } from "react";
import { View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_PLACES_API_KEY, YELP_API_KEY } from "@env";
import axios from "axios";
import { Entypo, Ionicons } from "@expo/vector-icons";
import {
  getRestaurantFromYelp,
  fetchAndFilterRestaurantsByTime,
} from "../components/getRestaurantfromYelp";

export default function SearchBar({ cityHandler }) {
  const [input, setInput] = useState("");
  const fetchDataDirectlyFromYelp = async (searchInput) => {
    const encodedCity = encodeURIComponent(searchInput);
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?location=${encodedCity}`;
    const handleSubmit = () => {
      cityHandler(input);
    };

    console.log("Making request to Yelp API:", yelpUrl);

    try {
      const response = await axios.get(yelpUrl, {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`,
        },
      });
      console.log("Data received from Yelp:", response.data);
      cityHandler(searchInput); // Pass the original city name to handler
    } catch (error) {
      console.error("Error fetching data from Yelp:", error);
      if (error.response) {
        console.error("Response Error Data:", error.response.data);
        console.error("Status code:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };

  return (
    <View style={{ marginTop: 15, flexDirection: "row" }}>
      <GooglePlacesAutocomplete
        placeholder="Enter a city. . ."
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "en",
          types: "(cities)",
        }}
        onPress={(data, details = null) => {
          console.log("Selected data:", data);
          if (data && data.description) {
            cityHandler(data.description);
            fetchDataDirectlyFromYelp(data.description);
            fetchAndFilterRestaurantsByTime(data.description);
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
