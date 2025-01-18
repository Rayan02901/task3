import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Heading from '../../components/Heading'; // Adjust the import path as necessary
import SearchSection from '../../components/SearchSection';
import Menubar from '../../components/Menubar'; // Adjust the import path as necessary
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
const SearchScreen = () => {
  const navigation = useNavigation(); // Get navigation object
  return (
    <View style={styles.container}>
      <Heading />
      <SearchSection style={styles.searchSection} navigation={navigation} />

      
      
      <Menubar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  searchSection: {
    flex: 1, // Allow SearchSection to take all remaining space
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchScreen;
