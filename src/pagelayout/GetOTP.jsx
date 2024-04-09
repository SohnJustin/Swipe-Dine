import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
//import auth from "@react-native-firebase/auth";
import "../firebase/firebase";

const refCallback = (textInput) => (node) => {
  textInput.current = node;
};

const OTPScreen = function ({
  route: {
    params: { phoneNumber },
  },
  navigation,
}) {
  const [otpArray, setOtpArray] = useState(["", "", "", ""]);
  const [submittingOtp, setSubmittingOtp] = useState(true);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(null);
  const firstText = useRef(null);
  const secondText = useRef(null);
  const thirdText = useRef(null);
  const fourthText = useRef(null);
  const fifthText = useRef(null);
  const sixthText = useRef(null);
  const refCallback = (textInput) => (node) => {
    textInput.current = node;
  };

  useEffect(() => {
    handleVerification(phoneNumber);
  }, [phoneNumber]);

  async function handleVerification(phoneNumber) {
    console.log("Handling verification for:", phoneNumber); // Check the phone number
    try {
      const confirmation = await addUserToFirestore(auth, phoneNumber);
      console.log("Confirmation received:", confirmation); // Check the confirmation object
      setConfirm(confirmation);
    } catch (error) {
      console.error("Error in handleVerification:", error);
      alert("Error during phone number verification setup.");
    }
  }
  async function confirmCode() {
    try {
      console.log("Verifying code...");
      const code = otpArray.join("");
      if (!confirm) {
        console.error("No confirmation object available.");
        alert("OTP verification setup failed.");
        return;
      }
      const response = await confirm.confirm(code);
      if (response) {
        console.log("Verification successful:", response);
        alert("Success");
        // You might want to navigate the user to another screen after successful verification
      }
    } catch (e) {
      console.error("Error confirming code:", e);
      alert("Invalid code.");
    }
  }
  const onOtpChange = (index) => {
    return (value) => {
      if (isNaN(Number(value))) return;
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);

      // Focus on the next input after typing a digit
      if (value) {
        switch (index) {
          case 0:
            secondText.current && secondText.current.focus();
            break;
          case 1:
            thirdText.current && thirdText.current.focus();
            break;
          case 2:
            fourthText.current && fourthText.current.focus();
            break;
          case 3:
            fifthText.current && fifthText.current.focus();
            break;
          case 4:
            sixthText.current && sixthText.current.focus();
            break;
          default:
            break;
        }
      }
    };
  };

  const onOtpKeyPress = (index) => {
    return ({ nativeEvent: { key: value } }) => {
      if (value === "Backspace" && otpArray[index] === "") {
        // Move focus back to previous input
        if (index === 1 && firstText.current) {
          firstText.current.focus();
        } else if (index === 2 && secondText.current) {
          secondText.current.focus();
        } else if (index === 3 && thirdText.current) {
          thirdText.current.focus();
        } else if (index === 4 && fourthText.current) {
          fourthText.current.focus();
        } else if (index === 5 && fifthText.current) {
          fifthText.current.focus();
        } else if (index === 6 && sixthText.current) {
          sixthText.current.focus();
        }
      }
    };
  };

  // Create an array of refs
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  return (
    <View style={styles.container}>
      <Text>Enter your the code sent to {" " + phoneNumber}</Text>
      <View style={styles.row}>
        {[
          firstText,
          secondText,
          thirdText,
          fourthText,
          fifthText,
          sixthText,
        ].map((ref, index) => (
          <TextInput
            style={styles.input}
            value={otpArray[index]}
            onChangeText={onOtpChange(index)}
            onKeyPress={onOtpKeyPress(index)}
            keyboardType="number-pad"
            maxLength={1}
            ref={ref} // Assign ref here
            key={index}
          />
        ))}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={confirmCode} // Make sure this is correctly set
      >
        <Text style={styles.submitButtonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "10%",
    justifyContent: "center",
  },
  container: {
    padding: 16,
    flex: 1,
    alignItems: "center",
    paddingTop: 130,
  },
  submitButtonText: {
    color: "#ffffff",
  },
  otpText: {
    color: "#0000ff",
    fontSize: 18,
    width: "100%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#000",
    padding: 10,
    width: "80%",
    borderRadius: 5,
  },
});
export default OTPScreen;
