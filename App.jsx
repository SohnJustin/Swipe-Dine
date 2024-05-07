import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StackNavigator from "./navigation/StackNavigator";
import { UserProvider } from "./src/components/userContext";
import { TimeProvider } from "./src/components/timeContext";
import GlobalBackground from "./src/components/GlobalBackground";

function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <TimeProvider>
          <NavigationContainer>
            <GlobalBackground>
              <StackNavigator />
            </GlobalBackground>
          </NavigationContainer>
        </TimeProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
}

export default App;
