import axios from "axios";
import Config from "react-native-config";
import { GOOGLE_PLACES_API_KEY, YELP_API_KEY } from "@env";

const getRestaurants = async (latitude, longitude, radius) => {
  const endpoint = `https://api.yelp.com/v3/businesses/search`;
  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
      params: {
        latitude,
        longitude,
        categories: "restaurants", // yelp's category filter
      },
    });
    return response.data.businesses; // adjust according to yelp's response structure
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
export default getRestaurants;
