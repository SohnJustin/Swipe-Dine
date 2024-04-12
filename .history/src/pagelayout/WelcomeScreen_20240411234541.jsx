import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";

function WelcomeScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleConfirm = (event, newDate) => {
    const currentDate = newDate || selectedDate;
    setSelectedDate(currentDate);
    // This function is called whenever the date or time is changed in the picker
  };

  const handleReservationConfirm = () => {
    // Handle the reservation confirmation here
    // You can navigate to the login screen or do any other action
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Swipe&Dine</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        activeOpacity={0.7}
        style={styles.touchableArea}
      >
        <Text style={styles.subtitle}>
          Click Here to Bypass Reversation Time
        </Text>
      </TouchableOpacity>

      <View style={styles.datecontainer}>
        <DateTimePicker
          style={styles.datePicker}
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleConfirm}
        />
      </View>
      <View style={styles.datecontainer}>
        <DateTimePicker
          value={selectedDate}
          mode="time"
          display="default"
          onChange={handleConfirm}
          style={styles.timePicker}
        />

        <Button
          title="Confirm Reservation"
          onPress={handleReservationConfirm}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  datePicker: {
    width: "100%", // Take up full container width
    // You may adjust the height as needed or leave it to auto scale based on the content
  },
  timePicker: {
    width: "100%", // Take up full container width
    // Adjust the height as needed
  },
  datecontainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    transform: [{ scale: 1.5 }],
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start", // Align items to the start of the container
    paddingTop: 60,
  },
  title: {
    fontSize: 64,
    marginBottom: 20,
  },
  subtitle: {
    justifyContent: "center",
    textAlign: "center",
    //middle of the screen
    fontSize: 24,
    color: "gray",
    padding: 20,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
});

export default WelcomeScreen;
