import * as Location from "expo-location";

export const fetchLocation = async () => {
  let city = "Unknown"; // Default to 'Unknown' if location fetch fails
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.error("Permission to access location was denied");
    return ""; // Return an empty string if permission is denied
  }

  try {
    let location = await Location.getCurrentPositionAsync({});
    console.log("Location object:", location); // Log the raw location object

    let reverseGeo = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    console.log("Reverse geocoding results:", reverseGeo); // Log the reverse geocoding results

    if (reverseGeo.length > 0 && reverseGeo[0].city) {
      city = reverseGeo[0].city;
    } else {
      console.error("Failed to retrieve city from location");
    }
  } catch (error) {
    console.error("Error fetching location:", error);
  }

  return city;
};
