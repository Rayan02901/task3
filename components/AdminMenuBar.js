import React, { useState } from 'react'; // Import useState
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Folders, Search, PlusCircle, Zap, User } from "lucide-react-native";
import { useNavigation } from '@react-navigation/native';

const Menubar = () => {
  const navigation = useNavigation();  // Use the hook to get navigation
  const [activeTab, setActiveTab] = useState('AdminDashboard'); // Define useState

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, activeTab === 'AdminDashboard' && styles.activeTab]} 
        onPress={() => {
          setActiveTab('AdminDashboard');
          navigation.navigate('AdminDashboard');
        }}
      >
        <Folders width={24} height={24} color={activeTab === 'AdminDashboard' ? "#ffffff" : "#94a3b8"} />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, activeTab === 'UserControl' && styles.activeTab]} 
        onPress={() => {
          setActiveTab('UserController');
          navigation.navigate('UserController');
        }}
      >
        <User width={24} height={24} color={activeTab === 'UserController' ? "#ffffff" : "#94a3b8"} />
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
