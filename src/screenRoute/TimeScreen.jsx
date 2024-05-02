import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";

function TimeScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios");
  const [showTimePicker, setShowTimePicker] = useState(Platform.OS === "ios");

  // save for if we ever use reservation date

  // const handleDateChange = (event, newDate) => {
  //   const currentDate = newDate || selectedDate;
  //   setSelectedDate(currentDate);
  //   if (Platform.OS === "android") {
  //     setShowDatePicker(false);
  //   }
  //};

  const handleTimeChange = (event, newTime) => {
    const currentTime = newTime || selectedDate;
    setSelectedDate(currentTime);
    if (Platform.OS === "android") {
      setShowTimePicker(false);
    }
  };

  const handleReservationConfirm = () => {
    // handle the reservation confirmation here later
    // console.log("Reservation confirmed for:", selectedDate);
    console.log("Time sent to HomeScreen:", selectedDate);
    navigation.navigate("Main", {
      screen: "Home",
      params: { selectedTime: selectedDate },
    });
  };
  return (
    <View style={styles.container}>
      {/*
        save if we ever use reservation date


      {Platform.OS === "android" && (
        <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
      )} */}
      {/* 
      {(showDatePicker || Platform.OS === "ios") && (
        <DateTimePicker
          style={styles.datePicker}
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )} */}
      {Platform.OS === "android" && (
        <Button title="Select Time" onPress={() => setShowTimePicker(true)} />
      )}
      <Text>What time would you like to go eat?</Text>
      {(showTimePicker || Platform.OS === "ios") && (
        <DateTimePicker
          value={selectedDate}
          mode="time"
          display="default"
          onChange={handleTimeChange}
          style={styles.timePicker}
        />
      )}
      <Button
        title="Confirm Time"
        onPress={handleReservationConfirm}
        style={styles.datecontainer}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Consider adding a background image or a subtle gradient if used elsewhere
    alignItems: "center",
    justifyContent: "center", // Updated to center content vertically and horizontally
    padding: 20,
  },
  title: {
    fontSize: 32, // Adjusted to match WelcomeScreen
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  timePicker: {
    width: "80%", // Match the width for consistency
    justifyContent: "center",
    alignContent: "center",
    marginTop: 20,
    borderRadius: 5, // Rounded edges to match other inputs
    borderColor: "#ccc",
    borderWidth: 1,
  },
  datePicker: { // If the date picker is used
    width: "80%",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 20,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#000", // Primary button color from WelcomeScreen
    color: "#fff",
    padding: 15,
    borderRadius: 25,
    width: "80%",
    margin: 15,
    alignItems: "center",
  },
});


export default TimeScreen;
