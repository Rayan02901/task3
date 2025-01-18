import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getUserData } from '../../utils/userData';

const UserProfile = () => {
  const route = useRoute();
  const navigation = useNavigation(); // Use the useNavigation hook
  const { userId } = route.params; // Get the userId from params
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      if (userData) {
        setToken(userData.jwtToken);
        fetchUserProfile(userData.jwtToken);
      }
    };
    fetchUserData();
  }, [userId]);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch(`https://localhost:5000/api/UserProfile/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!profile || Object.keys(profile).length === 0) {
    return <Text style={styles.noProfileText}>No profile found</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {profile.userProfilePhotos && profile.userProfilePhotos.length > 0 && profile.userProfilePhotos[0].isMainPhoto && (
        <Image 
          source={{ uri: profile.userProfilePhotos[0].photoUrl }} 
          style={styles.profileImage} 
        />
      )}
      <Text style={styles.title}>{profile.fullName || 'No Name Available'}</Text>
      <Text style={styles.bio}>{profile.bio || 'No Bio Available'}</Text>
      
      <Text style={styles.sectionTitle}>Favorite Books:</Text>
      {profile.favoriteBooks && profile.favoriteBooks.length > 0 ? (
        profile.favoriteBooks.map((book, index) => (
          <Text key={index} style={styles.book}>{book.title || 'Unnamed Book'}</Text>
        ))
      ) : (
        <Text>No Favorite Books Available</Text>
      )}

      <Text style={styles.sectionTitle}>Friends:</Text>
      {profile.friends && profile.friends.length > 0 ? (
        profile.friends.map((friend, index) => (
          <Text key={index} style={styles.friend}>{friend.friendUser?.userName || 'Unnamed Friend'}</Text>
        ))
      ) : (
        <Text>No Friends Available</Text>
      )}

      <Text style={styles.sectionTitle}>Activities:</Text>
      {profile.activities && profile.activities.length > 0 ? (
        profile.activities.map((activity, index) => (
          <Text key={index} style={styles.activity}>
            {activity.book?.title || 'Unnamed Activity'} - {activity.action?.name || 'No Action'}
          </Text>
        ))
      ) : (
        <Text>No Activities Available</Text>
      )}

      {/* Button to return to Friend Requests screen */}
      <Button
        title="Return to Friend Requests"
        onPress={() => navigation.navigate('FriendRequestScreen')} // Adjust this to your exact screen name
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  book: {
    fontSize: 16,
    color: '#333',
  },
  friend: {
    fontSize: 16,
    color: '#333',
  },
  activity: {
    fontSize: 16,
    color: '#333',
  },
  noProfileText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default UserProfile;
