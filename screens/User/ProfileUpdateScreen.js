// ProfileUpdateScreen.js
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getUserData } from '../../utils/userData';

const ProfileUpdateScreen = () => {
  const route = useRoute();
  const { profile } = route.params || {}; // Safe destructuring
  const [fullName, setFullName] = useState(profile?.fullName || ''); // Default to empty string if undefined
  const [bio, setBio] = useState(profile?.bio || ''); // Default to empty string if undefined
  const navigation = useNavigation();

  const handleUpdateProfile = async () => {
    try {
      const { jwtToken } = await getUserData();
      const response = await fetch('https://try2hamrakitab-e6byc3drhtbxcvhy.southeastasia-01.azurewebsites.net/api/UserProfile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, bio }),
      });
      if (response.ok) {
        const updatedProfile = { fullName, bio }; // Create updated profile object
        navigation.navigate('ProfileScreen', { profile: updatedProfile }); // Pass updated profile back
      } else {
        console.error('Failed to update profile:', response.status);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
      />
      <Button title="Update" onPress={handleUpdateProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default ProfileUpdateScreen;
