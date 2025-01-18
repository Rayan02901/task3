import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Book } from "lucide-react-native";

const Heading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Book width={32} height={32} color="#34d399" />
        <Text style={styles.title}>
          Hamro<Text style={styles.highlight}>Kitab</Text>
        </Text>
      </View>
      <Text style={styles.subtitle}>Your Digital Library Companion</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e293b',
    padding: 16,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  highlight: {
    color: '#34d399',
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
  },
});

export default Heading;