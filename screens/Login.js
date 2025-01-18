import React, { useState, useEffect } from "react";
import { View, SafeAreaView, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { COLORS } from "../constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const Login = () => {
  const [userIdentifier, setUserIdentifier] = useState("");
  const [password, setPassword] = useState("");
  
  const navigation = useNavigation();

  


  const handleLogin = async () => {
    if (userIdentifier && password) {
      try {
        const response = await fetch('https://localhost:5000/api/Auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userIdentifier: userIdentifier,
            password: password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Store JWT token, role, and userId
          await AsyncStorage.setItem('jwtToken', data.jwtToken);
          await AsyncStorage.setItem('role', data.role);
          await AsyncStorage.setItem('userId', data.userId);
          
          alert(`Logged in successfully: ${data.userId}`);

          // Navigate based on role and include location if admin
          if (data.role === "Admin") {
            navigation.navigate('AdminDashboard');
          } else {
            navigation.navigate('BookRecommendation');
          }
        } else {
          alert(`Error: ${data.message || 'Login failed'}`);
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    } else {
      alert("Please enter both user identifier and password");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: COLORS.white }}>
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Login</Text>
        <TextInput
          placeholder="Email or Username"
          style={styles.input}
          value={userIdentifier}
          onChangeText={setUserIdentifier}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    padding: 20,
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.primary,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: COLORS.gray,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Login;
