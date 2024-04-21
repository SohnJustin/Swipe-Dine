import axios from "axios";
import { YELP_API_KEY } from "@env";

const getRestaurantFromYelp = async (city) => {
  try {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?location=${city}`;
    const response = await axios.get(yelpUrl, {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    });

    if (response.data && Array.isArray(response.data.businesses)) {
      // Filter out closed restaurants using the `is_closed` flag from Yelp API
      const openRestaurants = response.data.businesses.filter(
        (restaurant) => !restaurant.is_closed
      );
      return openRestaurants; // Return only open restaurants
    } else {
      console.error(
        'Yelp API response does not contain "businesses" property or is not an array'
      );
      return []; // Return empty array if there's an issue with the data
    }
  } catch (error) {
    console.error("Error fetching data from Yelp:", error);
    return []; // Return empty array on error
  }
};

export default getRestaurantFromYelp;
