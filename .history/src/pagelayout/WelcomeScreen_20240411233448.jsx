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
        <Button title="Select Reservation Date" onPress={toggleDatePicker} />
        <Button title="Select Reservation Time" onPress={toggleTimePicker} />
        {isDatePickerVisible && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) =>
              handleTimePickerConfirm(selectedDate)
            }
          />
        )}
        {isTimePickerVisible && (
          <DateTimePicker
            value={selectedDate}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={(event, selectedDate) =>
              handleTimePickerConfirm(selectedDate)
            }
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  datecontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
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
