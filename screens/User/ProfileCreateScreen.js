// ProfileCreateScreen.js
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUserData } from '../../utils/userData';

const ProfileCreateScreen = () => {
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const navigation = useNavigation();

  const handleCreateProfile = async () => {
    try {
      const { jwtToken } = await getUserData();

      // Using FormData for multipart/form-data
      const formData = new FormData();
      formData.append('FullName', fullName);
      formData.append('Bio', bio);
      // Add Photo if you have an image file to upload, e.g., formData.append('Photo', { uri: photoUri, name: 'photo.jpg', type: 'image/jpeg' });

      const response = await fetch('https://try2hamrakitab-e6byc3drhtbxcvhy.southeastasia-01.azurewebsites.net/api/UserProfile', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Accept': 'text/plain',
        },
        body: formData,
      });

      if (response.ok) {
        navigation.navigate('ProfileScreen');
      } else {
        const errorData = await response.json();
        console.error('Error creating profile:', errorData);
        alert(`Error: ${errorData.message || 'Failed to create profile'}`);
      }
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Profile</Text>
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
      <Button title="Save" onPress={handleCreateProfile} />
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

export default ProfileCreateScreen;
