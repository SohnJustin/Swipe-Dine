import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screenRoute/LoginScreen";
import WelcomeScreen from "./src/screenRoute/WelcomeScreen";
import HomeScreen from "./src/screenRoute/HomeScreen";
import SignUpScreen from "./src/screenRoute/SignUpScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
      <BotNavBar />
    </NavigationContainer>
  );
}

export default App;
