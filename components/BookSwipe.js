import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const BookSwipe = ({ books, onSelectBook }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeLeft = () => {
    if (currentIndex < books.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      {books.length > 0 && (
        <Swipeable
          containerStyle={styles.swipeableContainer}
          renderLeftActions={() => (
            <TouchableOpacity onPress={handleSwipeRight} style={styles.swipeButton}>
              <Text style={styles.swipeButtonText}>{"<"}</Text>
            </TouchableOpacity>
          )}
          renderRightActions={() => (
            <TouchableOpacity onPress={handleSwipeLeft} style={styles.swipeButton}>
              <Text style={styles.swipeButtonText}>{">"}</Text>
            </TouchableOpacity>
          )}
        >
          <TouchableOpacity
            style={styles.bookFrame}
            onPress={() => onSelectBook(books[currentIndex].bookId)}
          >
            <View style={styles.titleSection}>
              <Text style={styles.titleText}>{books[currentIndex].title}</Text>
            </View>
            <View style={styles.authorSection}>
              <Text style={styles.authorText}>{books[currentIndex].author}</Text>
            </View>
          </TouchableOpacity>
        </Swipeable>
      )}
      {books.length === 0 && <Text style={styles.noBooksText}>No books available</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
  },
  swipeableContainer: {
    flex: 1,
    height: height - 120, // Subtracting space for navigation/status bars
  },
  bookFrame: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#e2e8f0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleSection: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 16,
  },
  titleText: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  authorSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#475569',
    padding: 8,
  },
  authorText: {
    color: '#e2e8f0',
    fontSize: 18,
  },
  swipeButton: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(226, 232, 240, 0.3)',
  },
  swipeButtonText: {
    fontSize: 24,
    color: '#1e293b',
    fontWeight: 'bold',
  },
  noBooksText: {
    fontSize: 16,
    color: '#64748b',
  },
});

export default BookSwipe;