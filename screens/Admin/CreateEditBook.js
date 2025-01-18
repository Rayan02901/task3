import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { getUserData } from "../../utils/userData"; // Import getUserData function

const CreateEditBook = ({ route, navigation }) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genres: [],
    genreIds: [],
    publishedDate: "",
    description: "",
    rating: 0,
    price: 0,
  });

  const isEdit = route.params && route.params.book;

  useEffect(() => {
    if (isEdit) {
      const { book } = route.params;
      setBook({
        id: book.id,
        title: book.title,
        author: book.author,
        genreIds: book.genres || [],
        publishedDate: book.publishedDate,
        description: book.description,
        rating: book.rating,
        price: book.price,
      });
    }
  }, [isEdit, route.params]);

  const handleSubmit = async () => {
    try {
      const userData = await getUserData();
      if (!userData || !userData.jwtToken) {
        Alert.alert("Error", "Authorization token not found.");
        return;
      }

      const headers = {
        Authorization: `Bearer ${userData.jwtToken}`,
      };

      const requestData = {
        title: book.title,
        author: book.author,
        genres: isEdit ? book.genreIds : book.genres,
        publishedDate: book.publishedDate,
        description: book.description,
        rating: book.rating,
        price: book.price,
      };

      const url = `https://localhost:5000/api/Book${isEdit ? `/${book.id}` : ""}`;

      if (isEdit) {
        await axios.put(url, requestData, { headers });
        Alert.alert("Success", "Book updated successfully");
      } else {
        await axios.post(url, requestData, { headers });
        Alert.alert("Success", "Book created successfully");
      }

      navigation.goBack();
    } catch (error) {
      console.error("Error saving book:", error.response || error.message);
      Alert.alert("Error", "Failed to save book");
    }
  };

  const handleDelete = async () => {
    try {
      const userData = await getUserData();
      if (!userData || !userData.jwtToken) {
        Alert.alert("Error", "Authorization token not found.");
        return;
      }

      const headers = {
        Authorization: `Bearer ${userData.jwtToken}`,
      };

      // Directly send delete request
      await axios.delete(`https://localhost:5000/api/Book/${book.id}`, { headers });
      Alert.alert("Success", "Book deleted successfully");
      navigation.goBack(); // Navigate back to the previous screen
    } catch (error) {
      console.error("Error deleting book:", error);
      Alert.alert("Error", "Failed to delete book");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={book.title}
        onChangeText={(text) => setBook({ ...book, title: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Author"
        value={book.author}
        onChangeText={(text) => setBook({ ...book, author: text })}
        style={styles.input}
      />
      <TextInput
        placeholder={isEdit ? "Genre IDs (comma separated)" : "Genres (comma separated)"}
        value={(isEdit ? book.genreIds : book.genres).join(", ")}
        onChangeText={(text) =>
          setBook({
            ...book,
            [isEdit ? "genreIds" : "genres"]: text.split(", ").map((item) => item.trim()),
          })
        }
        style={styles.input}
      />
      <TextInput
        placeholder="Published Date (YYYY-MM-DD)"
        value={book.publishedDate}
        onChangeText={(text) => setBook({ ...book, publishedDate: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={book.description}
        onChangeText={(text) => setBook({ ...book, description: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Rating"
        value={String(book.rating)}
        onChangeText={(text) => setBook({ ...book, rating: parseFloat(text) || 0 })}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={String(book.price)}
        onChangeText={(text) => setBook({ ...book, price: parseFloat(text) || 0 })}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title={isEdit ? "Update Book" : "Create Book"} onPress={handleSubmit} />
      {isEdit && <Button title="Delete Book" color="red" onPress={handleDelete} />} {/* Delete button only visible in edit mode */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default CreateEditBook;
