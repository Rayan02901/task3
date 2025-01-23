import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Heading from '../../components/Heading';
import ProfileNavbar from '../../components/ProfileNavbar';
import Menubar from '../../components/Menubar';
import { getUserData } from '../../utils/userData';

const DiaryScreen = () => {
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
          const response = await fetch('https://try2hamrakitab-e6byc3drhtbxcvhy.southeastasia-01.azurewebsites.net/api/Book/read', {
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
    <View style={styles.container}>
      <Heading />
      <ProfileNavbar />
      <ScrollView contentContainerStyle={styles.content}>
        {books.length > 0 ? (
          books.map((book) => (
            <View key={book.bookId} style={styles.bookContainer}>
              <Text style={styles.titleText}>{book.title}</Text>
              <Text style={styles.authorText}>by {book.author}</Text>
              {book.startedAt && book.completedAt ? (
                <Text style={styles.dateText}>
                  Reading from {new Date(book.startedAt).toLocaleDateString()} to {new Date(book.completedAt).toLocaleDateString()}
                </Text>
              ) : (
                <Text style={styles.dateText}>
                  Started reading on {new Date(book.completedAt).toLocaleDateString()}
                </Text>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.noBooksText}>No books read yet.</Text>
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
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  bookContainer: {
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    width: '100%',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  authorText: {
    fontSize: 16,
    color: '#475569',
  },
  dateText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  noBooksText: {
    fontSize: 16,
    color: '#1e293b',
    textAlign: 'center',
  },
});

export default DiaryScreen;
