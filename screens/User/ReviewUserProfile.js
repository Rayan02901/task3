// screens/ReviewUserProfile.js
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { View, Text, StyleSheet, Image, FlatList, ScrollView, Button, Alert } from 'react-native';
import { fetchProfileById, getCachedProfileById, getCachedUserIdByProfileId } from '../../utils/ReviewDatas';
import { getUserData } from '../../utils/userData';
import MenuBar from '../../components/Menubar';

const ReviewUserProfile = ({ route, navigation }) => {
  const { profileId, userId } = route.params;
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(null);
  const [friendRequestSent, setFriendRequestSent] = useState(false);
  const [recipientId, setRecipientId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      if (userData) {
        setToken(userData.jwtToken);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) return;
      
      try {
        let profileData;
        if (profileId) {
          profileData = await fetchProfileById(profileId, token);
        } else if (userId) {
          profileData = await fetchProfileById(userId, token, true);
        }
        setProfile(profileData);
        setRecipientId(profileData.userId);
      } catch (error) {
        console.error('Error loading profile:', error);
        Alert.alert('Error', 'Failed to load user profile');
      }
    };

    loadProfile();
  }, [profileId, userId, token]);

  const sendFriendRequest = async () => {
    if (!recipientId) {
      Alert.alert('Error', 'User ID not found for friend request');
      return;
    }
    
    try {
      const response = await fetch(`https://localhost:5000/api/FriendRequest?recipientId=${recipientId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setFriendRequestSent(true);
        Alert.alert('Success', 'Friend request sent successfully!');
      } else {
        throw new Error('Failed to send friend request');
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
      Alert.alert('Error', 'Could not send friend request');
    }
  };

  if (!profile) {
    return (
      <View style={styles.centerContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.fullName}>{profile.fullName}</Text>
        <Text style={styles.bio}>{profile.bio}</Text>

        {profile.userProfilePhotos && profile.userProfilePhotos.length > 0 ? (
          <FlatList
            data={profile.userProfilePhotos}
            horizontal
            renderItem={({ item }) => (
              <Image
                source={{ uri: item.photoUrl }}
                style={styles.profilePhoto}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text>No profile photos available</Text>
        )}

        <Button
          title={friendRequestSent ? "Friend Request Sent" : "Add Friend"}
          onPress={sendFriendRequest}
          disabled={friendRequestSent}
        />

        <Text style={styles.sectionHeader}>Activities</Text>
        {profile.activities && profile.activities.length > 0 ? (
          <FlatList
            data={profile.activities}
            renderItem={({ item }) => (
              <Text style={styles.activityItem}>- {item.activityName}</Text>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text>No activities available</Text>
        )}

        <Text style={styles.sectionHeader}>Friends</Text>
        {profile.friends && profile.friends.length > 0 ? (
          <FlatList
            data={profile.friends}
            renderItem={({ item }) => (
              <Text style={styles.friendItem}>{item.fullName}</Text>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text>No friends listed</Text>
        )}

        <Text style={styles.sectionHeader}>Favorite Books</Text>
        {profile.favoriteBooks && profile.favoriteBooks.length > 0 ? (
          <FlatList
            data={profile.favoriteBooks}
            renderItem={({ item }) => (
              <Text style={styles.bookItem}>- {item.bookName}</Text>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text>No favorite books listed</Text>
        )}
      </ScrollView>
      <MenuBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  fullName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 20,
    marginBottom: 10,
  },
  activityItem: {
    fontSize: 14,
    color: '#1e293b',
    marginBottom: 5,
  },
  friendItem: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 5,
  },
  bookItem: {
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 5,
  },
});

export default ReviewUserProfile;