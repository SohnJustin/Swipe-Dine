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
    user.photoURL || Image.resolveAssetSource(defaultProfilePic).uri
  );

  const authUser = getAuth().currentUser;

  const pickImageFromLibrary = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log("ImagePicker result:", result); // Log the full result to see what's returned

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      console.log("Selected image URI: ", result.assets[0].uri); // Correctly access URI
      setProfilePic(result.assets[0].uri); // Update the state with the correct URI
    } else {
      console.log("Image selection cancelled or no assets found");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          key={profilePic}
          source={{ uri: profilePic }}
          style={styles.profilePic}
        />
        {/* Ensure text outputs are wrapped in <Text> tags */}
        {/*<Text>{`Current Profile Picture URI: ${profilePic}`}</Text>*/}
        {editMode ? (
          <View>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <Button title="Save Changes" onPress={() => {}} />
          </View>
        ) : (
          <View>
            <Text style={styles.name}>
              {user.displayName || "Default Name"}
            </Text>
            <Text style={styles.email}>{user.email}</Text>
            <Button title="Edit Photo" onPress={pickImageFromLibrary} />
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
