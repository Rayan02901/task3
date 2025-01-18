// screens/ListsScreen.js

import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { View, Text, StyleSheet } from 'react-native';
import Heading from '../../components/Heading';
import ProfileNavbar from '../../components/ProfileNavbar';
import Menubar from '../../components/Menubar';
import BookSwipe from '../../components/BookSwipe';
import { getUserData } from '../../utils/userData';

const ListsScreen = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jwtToken, setJwtToken] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { jwtToken } = await getUserData();
      setJwtToken(jwtToken);
    };

    const fetchBooks = async () => {
      if (jwtToken) {
        try {
          const response = await fetch('https://localhost:5000/api/Book/read', {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              Accept: 'application/json',
            },
          });
          const data = await response.json();
          setBooks(data);
        } catch (error) {
          console.error('Error fetching books:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
    fetchBooks();
  }, [jwtToken]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView>
    
    <View style={styles.container}>
      <Heading />
      <ProfileNavbar />
      <View style={styles.content}>
        <BookSwipe books={books} />
      </View>
      <Menubar />
    </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#1e293b',
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListsScreen;
