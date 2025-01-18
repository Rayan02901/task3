import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, Alert } from "react-native";
import axios from "axios";

const AdminDashboard = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`https://localhost:5000/api/Book`);
      setBooks(response.data); // Assuming API returns a full array of books
      paginateBooks(response.data, 1); // Display first page initially
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const paginateBooks = (booksArray, page) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setDisplayedBooks(booksArray.slice(start, end));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    paginateBooks(books, currentPage);
  }, [currentPage, books]);

  // Function to show delete confirmation alert
  const showDeleteAlert = (bookId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this book?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: () => handleDelete(bookId),
        },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = async (bookId) => {
    try {
      // Send DELETE request
      await axios.delete(`https://localhost:5000/api/Book/${bookId}`);
      const updatedBooks = books.filter((book) => book.id !== bookId);
      setBooks(updatedBooks);
      paginateBooks(updatedBooks, currentPage);
      Alert.alert("Success", "Book deleted successfully");
    } catch (error) {
      console.error("Error deleting book:", error);
      Alert.alert("Error", "Failed to delete book");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Button title="Create New Book" onPress={() => navigation.navigate('CreateEditBook')} />
      <FlatList
        data={displayedBooks}
        keyExtractor={(item) => item.id.toString()} // Ensure keyExtractor uses string
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text>{item.title}</Text>
            <Text>{item.author}</Text>
            <Text>{item.genreNames.join(", ")}</Text>
            <Text>{item.publishedDate}</Text>
            <Button title="Edit" onPress={() => navigation.navigate('CreateEditBook', { book: item })} />
            <Button title="Delete" onPress={() => showDeleteAlert(item.id)} />
          </View>
        )}
      />
      <View style={styles.pagination}>
        <Button 
          title="Previous" 
          onPress={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        />
        <Text>Page {currentPage}</Text>
        <Button 
          title="Next" 
          onPress={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(books.length / itemsPerPage)))}
          disabled={currentPage === Math.ceil(books.length / itemsPerPage)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bookItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default AdminDashboard;
