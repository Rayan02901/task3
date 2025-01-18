import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, FlatList, Alert, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useFocusEffect } from '@react-navigation/native';
import { getUserData } from '../../utils/userData';
import Heading from '../../components/Heading';
import MenuBar from '../../components/Menubar';

const FriendRequestScreen = ({ navigation }) => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchFriendRequests = async () => {
        const userData = await getUserData();
        if (userData) {
          setToken(userData.jwtToken);
          try {
            const response = await fetch('https://localhost:5000/api/FriendRequest', {
              headers: {
                'Authorization': `Bearer ${userData.jwtToken}`,
                'Accept': 'application/json',
              },
            });
            if (!response.ok) {
              throw new Error('Failed to fetch friend requests');
            }
            const data = await response.json();
            setFriendRequests(data);
          } catch (error) {
            console.error('Error fetching friend requests:', error);
          } finally {
            setLoading(false);
          }
        }
      };

      fetchFriendRequests();
    }, [])
  );

  const handleResponse = async (requestId, accept) => {
    try {
      const response = await fetch(`https://localhost:5000/api/friendRequest/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accept }),
      });
      if (!response.ok) {
        throw new Error('Failed to update friend request');
      }
      setFriendRequests(friendRequests.filter(req => req.friendRequestId !== requestId));
    } catch (error) {
      console.error('Error handling friend request:', error);
    }
  };

  const handleAccept = (requestId) => {
    Alert.alert(
      "Accept Friend Request",
      "Are you sure you want to accept this friend request?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => handleResponse(requestId, true) }
      ]
    );
  };

  const handleDecline = (requestId) => {
    Alert.alert(
      "Decline Friend Request",
      "Are you sure you want to decline this friend request?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => handleResponse(requestId, false) }
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Heading title="Friend Requests" />
      {friendRequests.length === 0 ? (
        <Text style={styles.noRequestsText}>No friend requests available.</Text>
      ) : (
        <FlatList
          data={friendRequests}
          keyExtractor={item => item.friendRequestId}
          renderItem={({ item }) => (
            <View style={styles.requestContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { userId: item.requesterId })}>
                <Text style={styles.requestText}>{item.requesterFullName} wants to be your friend!</Text>
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                <Button title="Accept" onPress={() => handleAccept(item.friendRequestId)} />
                <Button title="Decline" onPress={() => handleDecline(item.friendRequestId)} color="red" />
              </View>
            </View>
          )}
        />
      )}
      <MenuBar />
    </View>
  );
};

// Styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  noRequestsText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
    flex: 1,
  },
  requestContainer: {
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  requestText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
export default FriendRequestScreen;
