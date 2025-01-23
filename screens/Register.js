import React, { useState } from "react";
import { View, SafeAreaView, TextInput, Button, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants";
import { useNavigation } from '@react-navigation/native';


const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation(); // Hook to access navigation

  const handleRegister = async () => {
    if (userName && email && password) {
      try {
        const response = await fetch('https://try2hamrakitab-e6byc3drhtbxcvhy.southeastasia-01.azurewebsites.net/api/Auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName: userName,
            email: email,
            password: password,
            role: "User", // Automatically set role to "User"
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Show success message
          alert('User registered successfully');
          // Navigate to Login page
          navigation.navigate('Login'); // Adjust this to your actual route name
        } else {
          // Handle errors returned from the server
          alert(`Error: ${data.message || 'Registration failed'}`);
        }
      } catch (error) {
        // Handle network errors or other issues
        alert(`Error: ${error.message}`);
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: COLORS.white }}>
      <View style={styles.registerContainer}>
        <Text style={styles.registerTitle}>Register</Text>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address" // Use email keyboard type for better UX
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Register" onPress={handleRegister} />
        <Text style={styles.loginPrompt}>Already have an account?</Text>
        <Button title="Login" onPress={() => navigation.navigate('Login')} /> {/* Navigate to Login page */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    padding: 20,
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
  },
  registerTitle: {
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
  loginPrompt: {
    marginTop: 10,
    textAlign: "center",
    color: COLORS.gray,
  },
});

export default Register;
