import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Heading from '../../components/Heading';
import BookNavbar from '../../components/BookNavbar';
import Menubar from '../../components/Menubar';
import BookSwipe from '../../components/BookSwipe';
import { getUserData } from '../../utils/userData';

const BookRecommendation = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const userData = await getUserData();
        if (userData && userData.userId) {
          const response = await fetch(`https://localhost:5000/api/Recommendation/user/${userData.userId}`);
          const result = await response.json();

          if (response.ok) {
            setBooks(result.recommendations);
          } else {
            setError(result.message || 'Failed to fetch recommendations');
          }
        } else {
          setError('User ID not found');
        }
      } catch (err) {
        setError('Error fetching data');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const handleBookSelect = (bookId) => {
    navigation.navigate('BookDescription', { bookId });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={styles.container}>
      <Heading />
      <BookNavbar />
      <View style={styles.content}>
        {loading ? (
          <Text style={styles.text}>Loading recommendations...</Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : books.length > 0 ? (
          <BookSwipe books={books} onSelectBook={handleBookSelect} />
        ) : (
          <Text style={styles.text}>No recommendations found</Text>
        )}
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#1e293b',
    fontSize: 16,
  },
  errorText: {
    color: '#e53e3e',
    fontSize: 16,
  },
});

export default BookRecommendation;
