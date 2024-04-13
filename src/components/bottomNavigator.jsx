import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import HomeScreenContent from "../pagelayout/HomeScreen";

const LikedRoute = () => <Text>Liked</Text>;
const ProfileRoute = () => <Text>Profile</Text>;

const BotNavBar = () => {
  const navigation = useNavigation();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "liked",
      title: "Liked",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "profile",
      title: "Profile",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    liked: LikedRoute,
    home: HomeScreenContent,
    profile: ProfileRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      onTabPress={(scene, jumpToIndex) => {
        if (scene.index !== index && scene.route.key === "home") {
          navigation.navigate("Home");
        }
      }}
    />
  );
};

export default BotNavBar;
