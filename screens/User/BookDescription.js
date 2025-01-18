// screens/BookDescription.js
import React, { useState, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getUserData } from '../../utils/userData'; // Adjust the path if necessary

const BookDescription = ({ route, navigation }) => {
  const { bookId } = route.params;
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({ content: '', rating: 0 });

  const ACTIONS = {
    WANT_TO_READ: '8c8f1ed5-1dbd-400f-9f99-2a1e7a38db8b',
    READ: 'b11ac0d4-ff79-4024-bcd5-32bf2e6d252d',
    STARTED: 'e2ccf236-783f-42bc-bbb5-f72dd850d614',
  };

  useEffect(() => {
    fetchBookDetails();
  }, []);

  const fetchBookDetails = async () => {
    try {
      const response = await fetch(`https://localhost:5000/api/Book/${bookId}`);
      const data = await response.json();
      setBook(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching book details:', error);
      Alert.alert('Error', 'Failed to load book details');
      setLoading(false);
    }
  };

  const handleAddReview = async () => {
    try {
      const userData = await getUserData();
      if (!userData || !userData.jwtToken) {
        Alert.alert('Error', 'User is not authenticated');
        return;
      }

      const response = await fetch(`https://localhost:5000/api/Review/book/${bookId}`, {
        method: 'POST',
        headers: {
          'Accept': 'text/plain',
          'Authorization': `Bearer ${userData.jwtToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: newReview.content,
          rating: newReview.rating,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Review added successfully');
        setShowAddReview(false);
        fetchBookDetails();
        navigation.navigate('BookRecommendation');
      } else {
        const errorResponse = await response.json();
        Alert.alert('Error', errorResponse.message || 'Failed to add review');
      }
    } catch (error) {
      console.error('Error adding review:', error);
      Alert.alert('Error', 'Failed to add review');
    }
  };

  const handleAction = async (actionId) => {
    try {
      const userData = await getUserData();
      if (!userData || !userData.jwtToken) {
        Alert.alert('Error', 'User is not authenticated');
        return;
      }

      const response = await fetch('https://localhost:5000/api/Activity', {
        method: 'POST',
        headers: {
          'Accept': 'text/plain',
          'Authorization': `Bearer ${userData.jwtToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userData.userId,
          bookId: bookId,
          actionId: actionId,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Action recorded successfully');
      } else {
        const errorResponse = await response.json();
        Alert.alert('Error', errorResponse.message || 'Failed to record action');
      }
    } catch (error) {
      console.error('Error recording action:', error);
      Alert.alert('Error', 'Failed to record action');
    }
  };

  const RatingStars = ({ rating }) => {
    return (
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? 'star' : 'star-outline'}
            size={20}
            color={star <= rating ? '#FFD700' : '#666'}
          />
        ))}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ScrollView style={styles.container}>
      {/* Return Button */}
      <TouchableOpacity
        style={styles.returnButton}
        onPress={() => navigation.navigate('SearchScreen')}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.returnButtonText}>Return</Text>
      </TouchableOpacity>

      {/* Book Details Section */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>by {book.author}</Text>
        <RatingStars rating={book.rating} />
        <Text style={styles.price}>Price: ${book.price}</Text>
      </View>

      {/* Description Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{book.description}</Text>
      </View>

      {/* Genre Section */}
      {book.genreNames && book.genreNames.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Genres</Text>
          <View style={styles.genreContainer}>
            {book.genreNames.map((genre, index) => (
              <Text key={index} style={styles.genreTag}>{genre}</Text>
            ))}
          </View>
        </View>
      )}

      {/* Reviews Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        {book.reviews.map((review) => (
          <View key={review.reviewId} style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>{review.reviewerName || 'Anonymous'}</Text>
              <RatingStars rating={review.rating} />
            </View>
            <Text style={styles.reviewContent}>{review.content}</Text>
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleAction(ACTIONS.WANT_TO_READ)}
        >
          <Text style={styles.actionButtonText}>Want to Read</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleAction(ACTIONS.READ)}
        >
          <Text style={styles.actionButtonText}>Read</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleAction(ACTIONS.STARTED)}
        >
          <Text style={styles.actionButtonText}>Started</Text>
        </TouchableOpacity>
      </View>

      {/* Add Review Section */}
      {!showAddReview ? (
        <TouchableOpacity
          style={styles.addReviewButton}
          onPress={() => setShowAddReview(true)}
        >
          <Text style={styles.addReviewButtonText}>Add Review</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.addReviewSection}>
          <Text style={styles.sectionTitle}>Write a Review</Text>
          <View style={styles.ratingInput}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setNewReview({ ...newReview, rating: star })}
              >
                <Ionicons
                  name={star <= newReview.rating ? 'star' : 'star-outline'}
                  size={30}
                  color={star <= newReview.rating ? '#FFD700' : '#666'}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.reviewInput}
            placeholder="Write your review here..."
            placeholderTextColor="#666"
            multiline
            value={newReview.content}
            onChangeText={(text) => setNewReview({ ...newReview, content: text })}
          />
          <View style={styles.reviewButtons}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setShowAddReview(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleAddReview}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' },
  returnButton: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  returnButtonText: { color: '#fff', marginLeft: 8, fontSize: 16 },
  headerSection: { padding: 16, alignItems: 'center' },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  author: { color: '#aaa', fontSize: 16 },
  price: { color: '#aaa', fontSize: 16 },
  ratingContainer: { flexDirection: 'row', marginVertical: 8 },
  section: { padding: 16 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  description: { color: '#aaa', fontSize: 16 },
  genreContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  genreTag: { backgroundColor: '#444', color: '#fff', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginRight: 8, marginBottom: 8 },
  reviewItem: { marginBottom: 16 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  reviewerName: { color: '#fff', fontWeight: 'bold' },
  reviewContent: { color: '#aaa', marginTop: 4 },
  actionButtons: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 16 },
  actionButton: { padding: 12, borderRadius: 8, backgroundColor: '#444' },
  actionButtonText: { color: '#fff', fontSize: 16 },
  addReviewButton: { alignItems: 'center', paddingVertical: 16, backgroundColor: '#333', marginHorizontal: 16, borderRadius: 8 },
  addReviewButtonText: { color: '#fff', fontSize: 16 },
  addReviewSection: { padding: 16 },
  ratingInput: { flexDirection: 'row', marginVertical: 8 },
  reviewInput: { backgroundColor: '#333', color: '#fff', padding: 12, borderRadius: 8, marginTop: 8, textAlignVertical: 'top', minHeight: 80 },
  reviewButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  button: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  cancelButton: { backgroundColor: '#444' },
  submitButton: { backgroundColor: '#3b82f6' },
  buttonText: { color: '#fff', fontSize: 16 },
});

export default BookDescription;
