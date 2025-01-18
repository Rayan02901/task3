// components/SearchSection.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchAndStoreBooks } from '../utils/BookData';

const SearchSection = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [searchQuery, books]);

  const loadBooks = async () => {
    try {
      const bookData = await fetchAndStoreBooks();
      setBooks(bookData);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterBooks = () => {
    if (searchQuery.length === 0) {
      setFilteredBooks([]);
      return;
    }
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleBookSelect = (bookId) => {
    navigation.navigate('BookDescription', { bookId });
  };

  const handleBrowseByGenre = () => {
    navigation.navigate('GenreSelection'); // Replace 'GenreScreen' with your actual genre screen name
  };

  const browseItems = [
    { id: '1', title: 'Genre', onPress: handleBrowseByGenre },
    // You can add more items here if needed
  ];

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <Text style={styles.headerText}>Search</Text>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search books..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Search Results */}
      <View style={styles.searchResults}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <>
            {searchQuery.length > 0 ? (
              <ScrollView style={styles.resultsScroll}>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <TouchableOpacity
                      key={book.id}
                      style={styles.resultItem}
                      onPress={() => handleBookSelect(book.id)}
                    >
                      <Text style={styles.resultTitle}>{book.title}</Text>
                      <Ionicons name="chevron-forward" size={20} color="#666" />
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={styles.noResults}>No books found</Text>
                )}
              </ScrollView>
            ) : (
              <Text style={styles.instructionText}>Start typing to search for books</Text>
            )}
          </>
        )}
      </View>

      {/* Browse By Section */}
      {searchQuery.length === 0 && (
        <View style={styles.browseSection}>
          <Text style={styles.browseSectionTitle}>Browse by</Text>
          <ScrollView>
            {browseItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.browseItem} onPress={item.onPress}>
                <Text style={styles.browseItemText}>{item.title}</Text>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 8,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    padding: 0,
  },
  browseSection: {
    flex: 1,
  },
  browseSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  browseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  browseItemText: {
    fontSize: 16,
    color: '#999',
  },
  searchResults: {
    flex: 1,
    marginTop: 8,
  },
  resultsScroll: {
    flex: 1,
  },
  resultItem: {
    flexDirection: 'row',  // Added to align title and chevron
    justifyContent: 'space-between',  // Added to push chevron to the right
    alignItems: 'center',  // Added to vertically center items
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  resultTitle: {
    fontSize: 16,
    color: '#fff',
    flex: 1,  // Added to ensure title takes available space
  },
  noResults: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  instructionText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
// styles remain unchanged...

export default SearchSection;
