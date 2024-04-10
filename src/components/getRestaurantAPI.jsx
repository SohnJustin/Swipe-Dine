import axios from "axios";
import Config from "react-native-config";

const getRestaurants = async (latitude, longitude, radius) => {
  const endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
  try {
    const response = await axios.get(endpoint, {
      params: {
        location: `${latitude}, ${longitude}`,
        radius,
        type: "restaurant",
        key: GOOGLE_PLACES_API_KEY,
      },
    });
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&key=[API KEY]"; // site that doesn’t send Access-Control-*
    fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
      .then((response) => response.json())
      .then((contents) => console.log(contents))
      .catch(() =>
        console.log("Can’t access " + url + " response. Blocked by browser?")
      );
    const restaurantsWithPhotos = response.data.results.map((restaurant) => {
      const photoReference = restaurant.photos?.[0]?.photo_reference;
      const photoUrl = photoReference
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${Config.GOOGLE_PLACES_API_KEY}`
        : "https://via.placeholder.com/400";
      return { ...restaurant, photoUrl };
    });
    return restaurantsWithPhotos;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
export default getRestaurants;
