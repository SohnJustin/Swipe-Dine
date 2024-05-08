import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Platform, ImageBackground } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { useTime } from "../components/timeContext"; // Ensure this context exists

const backgroundImage = require('../../assets/appwallpaper.png');

const TimeScreen = () => {
  const [date, setDate] = useState(new Date());
  const navigation = useNavigation();
  const { setTime } = useTime();
  const [show, setShow] = useState(Platform.OS === "ios");

  // Function to handle date change
  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(new Date(selectedDate)); // Update the date/time state
    }
  };

  // Function to handle time change
  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      const newDateTime = new Date(date);
      newDateTime.setHours(selectedTime.getHours());
      newDateTime.setMinutes(selectedTime.getMinutes());
      setDate(newDateTime); // Set the new time while preserving the previously selected date
    }
    if (Platform.OS === "android") {
      setShow(false); // Hide the picker on Android in the beginning til they click the button to show
    }
  };

  // Function to confirm the date and time
  const handleConfirm = () => {
    setTime(date); // Update the context or state with the selected date/time
    console.log("Date and Time confirmed:", date);
    navigation.goBack(); // Navigate back or to the desired screen
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
    <View style={styles.container}>
      <Text style={styles.title}>Set your preferred date and time:</Text>
      {Platform.OS === "android" && (
        <Button title="Select Time" onPress={() => setShow(true)} />
      )}
      {(show || Platform.OS === "ios") && (
        <DateTimePicker
          testID="dateTimePickerDate"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
          style={styles.picker}
        />
      )}
      {(show || Platform.OS === "ios") && (
        <DateTimePicker
          testID="dateTimePickerTime"
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
          style={styles.picker}
        />
      )}
      <Button
        title="Confirm Date and Time"
        onPress={handleConfirm}
        color="#34C759" // Green color for confirmation
      />
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Makes the image fill the entire background
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#aaf0d1", //mint green
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  timePicker: {
    width: "80%",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 20,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  datePicker: {
    width: "80%",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 20,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#000",
    color: "#fff",
    padding: 15,
    borderRadius: 25,
    width: "80%",
    margin: 15,
    alignItems: "center",
  },
});

export default TimeScreen;