import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Heading from '../../components/Heading';
import ActivityNavbar from '../../components/ActivityNavbar';
import Menubar from '../../components/Menubar';
import { getUserData } from '../../utils/userData'; // Import the getUserData function

const FriendsActivityScreen = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserIdAndActivities = async () => {
      const userData = await getUserData();
      if (userData) {
        setUserId(userData.userId);
        fetchActivities(userData.userId, currentPage);
      }
    };
    fetchUserIdAndActivities();
  }, [currentPage]);

  const fetchActivities = async (userId, page) => {
    try {
      const response = await fetch(`https://try2hamrakitab-e6byc3drhtbxcvhy.southeastasia-01.azurewebsites.net/api/FriendActivities/user/${userId}?page=${page}`, {
        headers: {
          'accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch activities');
      }
      const data = await response.json();
      setActivities(prevActivities => [...prevActivities, ...data.items]);
      setHasNext(data.hasNext);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreActivities = () => {
    if (hasNext) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const renderActivityMessage = (activity) => {
    const { userName, userFullName, actionName, bookName, activityDate } = activity;
    const formattedDate = new Date(activityDate).toLocaleDateString();

    switch (actionName) {
      case 'Read':
        return `${userFullName} has read the book "${bookName}" on ${formattedDate}`;
      case 'Want to Read':
        return `${userFullName} has added "${bookName}" to their reading list`;
      case 'Started':
        return `${userFullName} has started reading "${bookName}"`;
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <Heading />
      <ActivityNavbar />
      <ScrollView style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : activities.length > 0 ? (
          activities.map(activity => (
            <Text key={activity.activityId} style={styles.activityText}>
              {renderActivityMessage(activity)}
            </Text>
          ))
        ) : (
          <Text style={styles.noActivityText}>No activities available</Text>
        )}
      </ScrollView>
      {hasNext && (
        <Button title="Load More Activities" onPress={loadMoreActivities} />
      )}
      <Menubar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  activityText: {
    color: '#1e293b',
    fontSize: 16,
    marginVertical: 5,
  },
  noActivityText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});

export default FriendsActivityScreen;
