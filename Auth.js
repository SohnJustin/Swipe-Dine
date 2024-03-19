import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Auth() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirm, setConfirm] = useState(null);

  // Function to request sending an OTP
  const signInWithPhoneNumber = async (phoneNumber) => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to confirm the OTP entered by the user
  const confirmCode = async () => {
    try {
      await confirm.confirm(otp);
      console.log('Phone number authenticated and user signed in!');
      // Navigate to the next screen or update app state as needed
    } catch (error) {
      console.error('Invalid code.');
    }
  };

  return (
    <View style={styles.container}>
      {!confirm ? (
        <>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Phone number"
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
          />
          <Pressable style={styles.button} onPress={() => signInWithPhoneNumber(phoneNumber)}>
            <Text>Send Verification Code</Text>
          </Pressable>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            value={otp}
            onChangeText={setOtp}
            placeholder="Verification code"
            keyboardType="number-pad"
          />
          <Pressable style={styles.button} onPress={confirmCode}>
            <Text>Confirm Verification Code</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: 10,
    marginVertical: 10,
  },
});

