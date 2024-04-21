import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import { useTime } from "../components/timeContext";

function TimeScreen({ navigation }) {
  const { selectedDate, setSelectedDate } = useTime();
  const { selectedTime, setSelectedTime } = useTime();

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
    const currentTime = newTime || selectedTime;
    setSelectedTime(currentTime); // Set new time
    if (Platform.OS === "android") {
      setShowTimePicker(false); // Hide picker after selection
    }
  };

  const handleReservationConfirm = () => {
    // handle the reservation confirmation here later
    // console.log("Reservation confirmed for:", selectedDate);
    console.log("Time sent to HomeScreen:", selectedTime);
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
          value={selectedDate || new Date()}
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
  datePicker: {
    width: "30%", // Take up full container width
    justifyContent: "center",
    alignContent: "center",
    marginTop: 20,

    // You may adjust the height as needed or leave it to auto scale based on the content
  },
  timePicker: {
    marginTop: 20,
    width: "20%", // Take up full container width
    justifyContent: "center",
    alignContent: "center",
  },
  datecontainer: {
    flex: 0,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-around",

    transform: [{ scale: 1.5 }],
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
  },
  title: {
    fontSize: 64,
    marginBottom: 20,
  },
  subtitle: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 24,
    color: "gray",
    padding: 20,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
});

export default TimeScreen;
