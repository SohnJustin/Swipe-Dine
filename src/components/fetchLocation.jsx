import * as Location from "expo-location";
import SearchBar from "../pageLayout/searchBar";
export const fetchLocation = async (overrideCity = "") => {
  let city = overrideCity || "Unknown"; // Use override if provided

  if (!overrideCity) {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return ""; // Return an empty string if permission is denied
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      let reverseGeo = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      if (reverseGeo.length > 0 && reverseGeo[0].city) {
        city = reverseGeo[0].city;
      } else {
        console.error("Failed to retrieve city from location");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  }

  return city;
};
