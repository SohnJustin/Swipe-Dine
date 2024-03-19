//Firebase Config
import { firebaseConfig } from './FirebaseConfig';
import firebase from 'firebase/app';
//

//Checking if not initalized instance of Firebase
if (!firebase.getApps.length){
  firebase.initializedApp(firebaseConfig);
}

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/pagelayout/LoginScreen";
import SignupScreen from "./src/pagelayout/SignUpScreen";
import WelcomeScreen from "./src/pagelayout/WelcomeScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
