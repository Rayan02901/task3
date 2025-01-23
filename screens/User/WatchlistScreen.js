import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Heading from '../../components/Heading';
import ProfileNavbar from '../../components/ProfileNavbar';
import Menubar from '../../components/Menubar';
import { getUserData } from '../../utils/userData';
import BookSwipe from '../../components/BookSwipe';

const WatchlistScreen = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const { jwtToken } = await getUserData();
      if (!jwtToken) return;

      try {
        const response = await fetch('https://try2hamrakitab-e6byc3drhtbxcvhy.southeastasia-01.azurewebsites.net/api/Book/wanttoread', {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: 'application/json',
          },
        });
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <GestureHandlerRootView>
    
    <View style={styles.container}>
      <Heading />
      <ProfileNavbar />
      <View style={styles.content}>
        <BookSwipe books={books} />
      </View>
      
    </View>
    <Menubar />
    </GestureHandlerRootView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WatchlistScreen;
