// screens/BookReview.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Heading from '../../components/Heading';
import BookNavbar from '../../components/BookNavbar';
import Menubar from '../../components/Menubar';
import { saveReviewsByProfileId, saveProfileIds } from '../../utils/ReviewDatas';
import { useNavigation } from '@react-navigation/native';
import { getUserData } from '../../utils/userData';

const BookReview = () => {
  const [reviews, setReviews] = useState([]);
  const navigation = useNavigation();
  const [token, setToken] = useState(null);

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
    if (!token) return;

    fetch('https://localhost:5000/api/Review', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'text/plain'
      }
    })
      .then(response => response.json())
      .then(data => {
        const profileData = data.map(review => ({
          profileId: review.profileId,
          userId: review.userId,
          bookId: review.bookId
        }));

        setReviews(data);
        saveProfileIds(profileData);
        saveReviewsByProfileId(profileData, data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, [token]);

  const renderStars = (rating) => '★'.repeat(rating) + '☆'.repeat(5 - rating);

  const handleProfilePress = (item) => {
    navigation.navigate('ReviewUserProfile', {
      profileId: item.profileId,
      userId: item.userId
    });
  };

  const handleBookPress = (item) => {
    navigation.navigate('BookDescription', {
      bookId: item.bookId
    });
  };

  const renderReviewCard = ({ item }) => (
    <View style={styles.reviewCard}>
      <TouchableOpacity onPress={() => handleBookPress(item)}>
        <Text style={styles.bookName}>{item.bookName}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleProfilePress(item)}>
        <Text style={styles.userName}>by {item.userName}</Text>
      </TouchableOpacity>
      <Text style={styles.stars}>{renderStars(item.rating)}</Text>
      <Text style={styles.comment}>{item.comment}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Heading />
      <BookNavbar />
      <View style={styles.content}>
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.reviewId.toString()}
          renderItem={renderReviewCard}
        />
      </View>
      <Menubar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  content: {
    flex: 1,
    padding: 10
  },
  reviewCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  bookName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b'
  },
  userName: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 5
  },
  stars: {
    fontSize: 14,
    color: '#fbbf24',
    marginBottom: 5
  },
  comment: {
    fontSize: 14,
    color: '#1e293b'
  }
});

export default BookReview;