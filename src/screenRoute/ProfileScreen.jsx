import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground 
} from "react-native";
import { UserContext } from "../components/userContext"; // Import your user context
import defaultProfilePic from "../assets/default-profile-picture.jpeg";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const backgroundImage = require('../../assets/appwallpaper.png');

const ProfileScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.displayName || "Default Name");
  const [profilePic, setProfilePic] = useState(
    user.photoURL || defaultProfilePic
  );
  const authUser = getAuth().currentUser;
  const navigation = useNavigation();
  const CustomButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  // Function to handle resetting the profile picture to default
  const handleResetProfilePic = async () => {
    setProfilePic(defaultProfilePic); // Reset to default image
    if (authUser) {
      await updateFirebaseProfile(authUser.displayName, defaultProfilePic);
    }
  };

  // Function to handle updating the profile on Firebase
  const updateFirebaseProfile = async (displayName, photoURL) => {
    if (authUser) {
      await updateProfile(authUser, { displayName, photoURL });
      setUser((prevUser) => ({
        ...prevUser,
        displayName: displayName,
        photoURL: photoURL,
      }));
      setEditMode(false); // Exit edit mode after update
    }
  };

  // Function to handle saving the profile with potential new profile picture
  const handleSaveProfile = async () => {
    if (!authUser) {
      alert("Not authenticated");
      return;
    }
    try {
      let imageUrl = profilePic;
      if (
        profilePic &&
        (profilePic.startsWith("file:") || profilePic.startsWith("content:"))
      ) {
        const storage = getStorage();
        const imageRef = ref(storage, `profile-pictures/${authUser.uid}`);
        const imgBlob = await fetch(profilePic).then((res) => res.blob());
        await uploadBytes(imageRef, imgBlob);
        imageUrl = await getDownloadURL(imageRef);
      }

      await updateFirebaseProfile(name, imageUrl);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile: " + error.message);
    }
  };

  // Function to pick an image from the library
  const pickImageFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfilePic(result.uri);
    }
  };

  // Set user default states on initial mount
  useEffect(() => {
    if (!user.displayName) setUser({ ...user, displayName: "Default Name" });
    if (!user.photoURL) setUser({ ...user, photoURL: defaultProfilePic });
  }, [user.displayName, user.photoURL]);

  // idk why I can't upload a new profile picture without it yelling. I'll just worry about it later.
  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={profilePic} style={styles.profilePic} />
        <CustomButton title="Edit Photo" onPress={pickImageFromLibrary} />
        <CustomButton
          title="Reset to Default Photo"
          onPress={handleResetProfilePic}
        />
        {editMode ? (
          <View>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <CustomButton title="Save Changes" onPress={handleSaveProfile} />
          </View>
        ) : (
          <View>
            <Text style={styles.name}>
              {user.displayName || "Default Name"}
            </Text>
            <Text style={styles.email}>{user.email}</Text>
            <CustomButton title="Edit Name" onPress={() => setEditMode(true)} />
            <CustomButton
              title="Time Filter"
              onPress={() => navigation.navigate("Time")}
            />
            <CustomButton
              title="Logout"
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Makes the image fill the entire background
  },
  safeArea: {
    flex: 1,
     // Light gray background for a subtle look
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#dedede", // Adding a border to the profile picture
    marginBottom: 20,
    marginTop: 20,
    shadowColor: "#000", // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  input: {
    width: "90%", // Responsive width
    height: 50,
    backgroundColor: "#fff", // White input background
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10, // Rounded corners for inputs
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  name: {
    fontSize: 24, // Larger font size
    fontWeight: "600",
    color: "#333", // Dark gray for better readability
    marginBottom: 5,
    textAlign: "center",
  },
  email: {
    fontSize: 18,
    color: "#555", // Slightly lighter than name color for hierarchy
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#868cec", // A pleasant blue for buttons
    color: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20, // Rounded buttons
    elevation: 2, // Adds depth to buttons
    shadowColor: "#4e9af1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
});

export default ProfileScreen;