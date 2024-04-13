import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import HomeScreen from "../src/screenRoute/HomeScreen";
import ProfileScreen from "../src/screenRoute/ProfileScreen";
import LikedScreen from "../src/screenRoute/LikedScreen";

const LikedRoute = () => <LikedScreen />;
const HomeRoute = () => <HomeScreen />;
const ProfileRoute = () => <ProfileScreen />;

const TabNavigation = () => {
  const [index, setIndex] = useState(1); // this array is how you choose the "default" tab 1 = Home, 0 = Liked, 2 = Profile
  const [routes] = useState([
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
    home: HomeRoute,
    profile: ProfileRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default TabNavigation;
