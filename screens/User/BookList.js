// components/BookList.js
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BookList = ({ route, navigation }) => {
  const { genreId } = route.params; // Access the genreId passed from GenreSelection
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks(genreId);
  }, [genreId]);

  const fetchBooks = async (genreId) => {
    try {
      const response = await fetch(`https://try2hamrakitab-e6byc3drhtbxcvhy.southeastasia-01.azurewebsites.net/api/Book/byGenre/${genreId}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer YOUR_TOKEN_HERE', // Replace with your token
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        console.error('Failed to fetch books:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookSelect = (bookId) => {
    navigation.navigate('BookDescription', { bookId });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={styles.container}>
      <Text style={styles.headerText}>Books in Genre</Text>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <ScrollView>
          {books.map((book) => (
            <TouchableOpacity
              key={book.bookId}
              style={styles.bookItem}
              onPress={() => handleBookSelect(book.bookId)}
            >
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>{book.author}</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  bookItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  bookTitle: {
    fontSize: 16,
    color: '#fff',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#999',
  },
});

export default BookList;
