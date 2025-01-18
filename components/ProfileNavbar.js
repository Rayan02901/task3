import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileNavbar = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = React.useState('Activity');

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'Profile' && styles.activeTab]}
        onPress={() => {
          setActiveTab('Profile');
          navigation.navigate('ProfileScreen');
        }}
      >
        <Text style={[styles.tabText, activeTab === 'Diary' && styles.activeText]}>
          Profile
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'Diary' && styles.activeTab]}
        onPress={() => {
          setActiveTab('Diary');
          navigation.navigate('DiaryScreen');
        }}
      >
        <Text style={[styles.tabText, activeTab === 'Reviews' && styles.activeText]}>
          Diary
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'Lists' && styles.activeTab]}
        onPress={() => {
          setActiveTab('Lists');
          navigation.navigate('ListsScreen');
        }}
      >
        <Text style={[styles.tabText, activeTab === 'Lists' && styles.activeText]}>
          List
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'Watchlist' && styles.activeTab]}
        onPress={() => {
          setActiveTab('Lists');
          navigation.navigate('WatchlistScreen');
        }}
      >
        <Text style={[styles.tabText, activeTab === 'Watchlist' && styles.activeText]}>
          Watchlist
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

export default ProfileNavbar;
