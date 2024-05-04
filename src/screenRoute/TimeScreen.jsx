import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { useTime } from "../components/timeContext"; // Assuming this context exists

const TimeScreen = () => {
  const [date, setDate] = useState(new Date());
  const navigation = useNavigation();
  const { setTime } = useTime(); // Ensure this function is implemented in your context

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(new Date(selectedDate)); // Update the date/time state
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      const newDateTime = new Date(date);
      newDateTime.setHours(selectedTime.getHours());
      newDateTime.setMinutes(selectedTime.getMinutes());
      setDate(newDateTime); // Set the new time while preserving the previously selected date
    }
  };

  const handleConfirm = () => {
    setTime(date); // Update the context or state with the selected date/time
    console.log("Date and Time confirmed:", date);
    navigation.goBack(); // Navigate back or to the desired screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set your preferred date and time:</Text>
      <DateTimePicker
        testID="dateTimePickerDate"
        value={date}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={handleDateChange}
        style={styles.picker}
      />
      <DateTimePicker
        testID="dateTimePickerTime"
        value={date}
        mode="time"
        is24Hour={true}
        display="default"
        onChange={handleTimeChange}
        style={styles.picker}
      />
      <Button
        title="Confirm Date and Time"
        onPress={handleConfirm}
        color="#34C759" // Green color for confirmation
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  picker: {
    width: "100%", // Full width for better alignment
    height: 260,
  },
});

export default TimeScreen;
