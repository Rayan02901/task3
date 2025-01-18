import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Heading from '../../components/Heading';
import ActivityNavbar from '../../components/ActivityNavbar';
import Menubar from '../../components/Menubar';
import { getUserData } from '../../utils/userData'; // Import the function to get user data

const YourActivityScreen = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserIdAndActivities = async () => {
      const userData = await getUserData();
      if (userData) {
        setUserId(userData.userId);
        fetchActivities(userData.userId);
      }
    };
    fetchUserIdAndActivities();
  }, []);

  const fetchActivities = async (userId) => {
    try {
      const response = await fetch(`https://localhost:5000/api/Activity/user/${userId}?page=1&pageSize=10`, {
        headers: {
          'accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch activities');
      }
      const data = await response.json();
      setActivities(data.activities);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderActivityMessage = (activity) => {
    const { bookTitle, actionName, createdAt } = activity;
    const formattedDate = new Date(createdAt).toLocaleDateString();

    switch (actionName) {
      case 'Read':
        return `You have read "${bookTitle}" on ${formattedDate}`;
      case 'Want to Read':
        return `You have added "${bookTitle}" to your reading list`;
      case 'Started':
        return `You have started reading "${bookTitle}"`;
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

export default YourActivityScreen;
