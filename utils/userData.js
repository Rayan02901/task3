// utils/userData.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserData = async () => {
  try {
    const jwtToken = await AsyncStorage.getItem('jwtToken');
    const role = await AsyncStorage.getItem('role');
    const userId = await AsyncStorage.getItem('userId');

    if (jwtToken && role && userId) {
      console.log(`Token: ${jwtToken}, Role: ${role}, UserID: ${userId}`);
      return { jwtToken, role, userId }; // Return the values for further use
    }
  } catch (error) {
    console.error('Error retrieving user data:', error);
  }
};
