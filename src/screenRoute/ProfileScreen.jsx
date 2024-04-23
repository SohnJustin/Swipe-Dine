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
} from "react-native";
import { UserContext } from "../components/userContext"; // Import your user context
import defaultProfilePic from "../assets/default-profile-picture.jpeg";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.displayName || "Default Name");
  const [profilePic, setProfilePic] = useState(
    user.photoURL || defaultProfilePic
  );
  const authUser = getAuth().currentUser;

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={profilePic} style={styles.profilePic} />
        <Button title="Edit Photo" onPress={pickImageFromLibrary} />
        <Button
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
            <Button title="Save Changes" onPress={handleSaveProfile} />
          </View>
        ) : (
          <View>
            <Text style={styles.name}>
              {user.displayName || "Default Name"}
            </Text>
            <Text style={styles.email}>{user.email}</Text>
            <Button title="Edit Name" onPress={() => setEditMode(true)} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  email: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
});

export default ProfileScreen;
