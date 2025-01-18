import React, { useState } from 'react'; // Import useState
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Folders, Search, PlusCircle, Zap, User } from "lucide-react-native";
import { useNavigation } from '@react-navigation/native';

const Menubar = () => {
  const navigation = useNavigation();  // Use the hook to get navigation
  const [activeTab, setActiveTab] = useState('BookRecommendation'); // Define useState

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, activeTab === 'BookRecommendation' && styles.activeTab]} 
        onPress={() => {
          setActiveTab('BookRecommendation');
          navigation.navigate('BookRecommendation');
        }}
      >
        <Folders width={24} height={24} color={activeTab === 'BookRecommendation' ? "#ffffff" : "#94a3b8"} />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, activeTab === 'SearchScreen' && styles.activeTab]} 
        onPress={() => {
          setActiveTab('SearchScreen');
          navigation.navigate('SearchScreen');
        }}
      >
        <Search width={24} height={24} color={activeTab === 'SearchScreen' ? "#ffffff" : "#94a3b8"} />
      </TouchableOpacity>

      

      <TouchableOpacity 
        style={[styles.button, activeTab === 'FriendsActivityScreen' && styles.activeTab]} 
        onPress={() => {
          setActiveTab('FriendsActivityScreen');
          navigation.navigate('FriendsActivityScreen');
        }}
      >
        <Zap width={24} height={24} color={activeTab === 'ZapScreen' ? "#ffffff" : "#94a3b8"} />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, activeTab === 'ProfileScreen' && styles.activeTab]} 
        onPress={() => {
          setActiveTab('ProfileScreen');
          navigation.navigate('ProfileScreen');
        }}
      >
        <User width={24} height={24} color={activeTab === 'ProfileScreen' ? "#ffffff" : "#94a3b8"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 56, // Changed from 64 to 56
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  button: {
    padding: 8,
  },
  addButton: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#34d399',
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
  },
});

export default Menubar;
