// components/GenreSelection.js
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

const GenreSelection = ({ navigation }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await fetch('https://try2hamrakitab-e6byc3drhtbxcvhy.southeastasia-01.azurewebsites.net/api/Genre', {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer YOUR_TOKEN_HERE', // Replace with your token
        },
      });
      const data = await response.json();
      setGenres(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching genres:', error);
      setLoading(false);
    }
  };

  const handleGenreSelect = (genreId) => {
    // Navigate to BookList and pass the selected GenreID
    navigation.navigate('BookList', { genreId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Select Genre</Text>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <ScrollView>
          {genres.map((genre) => (
            <TouchableOpacity
              key={genre.genreId}
              style={styles.genreItem}
              onPress={() => handleGenreSelect(genre.genreId)}
            >
              <Text style={styles.genreName}>{genre.genreName}</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </ScrollView>
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
  genreItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  genreName: {
    fontSize: 16,
    color: '#fff',
  },
});

export default GenreSelection;
