import axios from "axios";
import Config from "react-native-config";

const getRestaurants = async (latitude, longiutde, radius) => {
  const endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
  try {
    const response = await axios.get(endpoint, {
      params: {
        location: `${latitude}, ${longitude}`,
        radius,
        type: "restaurant",
        key: Config.GOOGLE_PLACES_API_KEY,
      },
    });
    const restaurantsWithPhotos = response.data.results.map((restaurant) => {
      const photoReference = restaurant.photos?.[0]?.photo_reference;
      const photoUrl = photoReference
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=GOOGLE_PLACES_API_KEY`
        : "URL_of_default_image";
      return { ...restaurant, photoUrl };
    });
    return restaurantsWithPhotos;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
export default getRestaurants;
