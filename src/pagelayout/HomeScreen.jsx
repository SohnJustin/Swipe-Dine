import { React } from "react";
import { View, Text } from "react-native";
//import { useAuth } from "../context/authContext";
import { auth } from "../firebase/firebase";

const HomeScreen = () => {
  //const { currentUser } = useAuth();
  return (
    <View>
      <Text>Hello {auth.name} you are now logged in!</Text>
    </View>
  );
};

export default HomeScreen;
