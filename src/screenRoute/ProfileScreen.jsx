import React, { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { UserContext } from "../components/userContext"; // Import your user context
import defaultProfilePic from "../assets/default-profile-picture.jpeg";

const ProfileScreen = () => {
  const { user, setUser } = useContext(UserContext); // Use context to manage user data
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.name || "Default Name"); // Default name if not set

  // Ensure image path is correctly handled and error-proofing
  const handleSave = () => {
    setUser({ ...user, name });
    setEditMode(false);
  };

  useEffect(() => {
    if (!user.name) {
      // Set default name if not provided
      setUser({ ...user, name: "Default Name" });
    }
  }, []);

  const getImageUri = () => {
    return user.profilePic || defaultProfilePic;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={user.profilePic || defaultProfilePic}
          style={styles.profilePic}
        />
        {editMode ? (
          <View>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <Button title="Save Changes" onPress={handleSave} />
          </View>
        ) : (
          <View>
            <Text style={styles.name}>{user.name}</Text>
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
