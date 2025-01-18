import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BookNavbar = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = React.useState('Books');

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'Books' && styles.activeTab]}
        onPress={() => {
          setActiveTab('Books');
          navigation.navigate('BookRecommendation');
        }}
      >
        <Text style={[styles.tabText, activeTab === 'Books' && styles.activeText]}>
          Books
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'Reviews' && styles.activeTab]}
        onPress={() => {
          setActiveTab('Reviews');
          navigation.navigate('BookReview');
        }}
      >
        <Text style={[styles.tabText, activeTab === 'Reviews' && styles.activeText]}>
          Reviews
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  tabText: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '500',
  },
  activeText: {
    color: '#ffffff',
  },
});

export default BookNavbar;
