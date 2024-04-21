import React from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../src/screenRoute/LoginScreen";
import WelcomeScreen from "../src/screenRoute/WelcomeScreen";
import SignUpScreen from "../src/screenRoute/SignUpScreen";
import TabNavigation from "./TabNavigation";
import TimeScreen from "../src/screenRoute/TimeScreen";

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        name="Welcome"
        title="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        title="Login"
        component={LoginScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="SignUp"
        title="Signup"
        component={SignUpScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Time"
        title="Time"
        component={TimeScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Main"
        component={TabNavigation}
        options={{ headerShown: false, contentStyle: { pddingBottom: 100 } }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
