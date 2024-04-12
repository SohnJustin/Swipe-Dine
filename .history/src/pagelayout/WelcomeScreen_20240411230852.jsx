import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { DateTimePicker } from "@react-native-community/datetimepicker";

function WelcomeScreen({ navigation }) {
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleTimePickerConfirm = (selectedDate) => {
    setTimePickerVisible(false);
    setDate(selectedDate);
  };
  const showTimePicker = () => {
    setTimePickerVisible(true);
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

      <Button
        title="Select a Reservation Time"
        onPress={() => showTimePickerVisible(true)}
      />
      {isTimePickerVisible && (
        <DateTimePicker
          value={date}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={(event, selectedDate) => handleTimePickerConfirm}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
