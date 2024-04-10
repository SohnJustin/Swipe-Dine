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
import { auth, signInWithPhoneNumber } from "../firebase/firebase";

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
  const fivthText = useRef(null);
  const sixthText = useRef(null);
  const refCallback = (textInput) => (node) => {
    textInput.current = node;
  };

  useEffect(() => {
    handleVerification(phoneNumber);
  }, [phoneNumber]);

  async function handleVerification(phoneNumber) {
    const verifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved - now you can proceed with phone number verification
          signInWithPhoneNumber(auth, phoneNumber, verifier)
            .then((confirmationResult) => {
              setConfirm(confirmationResult);
            })
            .catch((error) => {
              console.error("SMS not sent", error);
            });
        },
      },
      auth
    );

    verifier.verify();
  }
  async function confirmCode() {
    try {
      const code = otpArray.join("");
      const response = await confirm.confirm(code);
      if (response) {
        alert("Success");
      }
    } catch (e) {
      alert("Invalid code.");
    }
  }
  const onOtpChange = (index) => {
    return (value) => {
      if (isNaN(Number(value))) {
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);
      if (value !== "") {
        if (index === 0) {
          secondText.current.focus();
        } else if (index === 1) {
          thirdText.current.focus();
        } else if (index === 2) {
          fourthText.current.focus();
        } else if (index === 3) {
          fivthText.current.focus();
        } else if (index === 4) {
          sixthText.current.focus();
          setSubmittingOtp(false);
        }
      }
    };
  };

  const onOtpKeyPress = (index) => {
    return ({ nativeEvent: { key: value } }) => {
      if (value === "Backspace" && otpArray[index] === "") {
        if (index === 1) {
          firstText.current.focus();
        } else if (index === 2) {
          secondText.current.focus();
        } else if (index === 3) {
          thirdText.current.focus();
        } else if (index === 4) {
          fourthText.current.focus();
        } else if (index === 5) {
          fivthText.current.focus();
        }
        if (isAndroid && index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = "";
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };

  return (
    <View style={styles.container}>
      <Text>Enter your the code sent to {" " + phoneNumber}</Text>
      <View style={styles.row}>
        {[
          firstText,
          secondText,
          thirdText,
          fourthText,
          fivthText,
          sixthText,
        ].map((textInput, index) => (
          <TextInput
            style={styles.input}
            value={otpArray[index]}
            onKeyPress={onOtpKeyPress(index)}
            onChangeText={onOtpChange(index)}
            keyboardType="number-pad"
            maxLength={1}
            refCallback={refCallback(textInput)}
            key={index}
          />
        ))}
      </View>
      <TouchableOpacity
        type="fill"
        title="Submit"
        style={styles.button}
        onPress={() => confirmCode()}
        disabled={submittingOtp}
      >
        <Text method="onSubmit" style={styles.submitButtonText}>
          Verify
        </Text>
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
