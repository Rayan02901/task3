import React, { useState, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getUserData } from '../../utils/userData';
import ProfileNavbar from '../../components/ProfileNavbar';
import Menubar from '../../components/Menubar';
import Heading from '../../components/Heading';

const ProfileScreen = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    bio: '',
  });

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { jwtToken } = await getUserData();
      try {
        const response = await fetch('https://try2hamrakitab-e6byc3drhtbxcvhy.southeastasia-01.azurewebsites.net/api/UserProfile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile({
            fullName: data.fullName || 'No name provided',
            bio: data.bio || 'No bio available',
          });
        } else {
          const errorData = await response.json();
          Alert.alert('Error', errorData.message || 'Failed to load profile data');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (route.params?.profile) {
      setProfile(prev => ({
        ...prev,
        fullName: route.params.profile.fullName,
        bio: route.params.profile.bio,
      }));
    }
  }, [route.params?.profile]);

  const handleEditProfile = () => {
    navigation.navigate('ProfileUpdateScreen', { profile });
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'You have logged out successfully.');
  };

  return (
    <View style={styles.container}>
      <Heading />
      <ProfileNavbar />
      
      <View style={styles.profileContent}>
        <Text style={styles.profileTitle}>Profile</Text>
        <Text style={styles.fullName}>{profile.fullName}</Text>
        <Text style={styles.bio}>{profile.bio}</Text>
        <View style={styles.editButtonContainer}>
          <Text 
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            EDIT PROFILE
          </Text>
        </View>
      </View>

      <Menubar onLogout={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  profileContent: {
    padding: 24,
    alignItems: 'center',
    flex: 1,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  fullName: {
    fontSize: 18,
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 24,
    textAlign: 'center',
  },
  editButtonContainer: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  editButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;