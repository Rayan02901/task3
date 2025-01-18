import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ActivityNavbar = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = React.useState('Activity');

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'Friends' && styles.activeTab]}
        onPress={() => {
          setActiveTab('Friends');
          navigation.navigate('FriendsActivityScreen');
        }}
      >
        <Text style={[styles.tabText, activeTab === 'Books' && styles.activeText]}>
          Friends
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'You' && styles.activeTab]}
        onPress={() => {
          setActiveTab('You');
          navigation.navigate('YourActivityScreen');
        }}
      >
        <Text style={[styles.tabText, activeTab === 'Reviews' && styles.activeText]}>
          You
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'You' && styles.activeTab]}
        onPress={() => {
          setActiveTab('Incoming');
          navigation.navigate('FriendRequestScreen');
        }}
      >
        <Text style={[styles.tabText, activeTab === 'Incoming' && styles.activeText]}>
          Incoming
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

export default ActivityNavbar;
