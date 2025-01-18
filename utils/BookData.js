// utils/BookData.js
export const fetchAndStoreBooks = async () => {
    try {
      const response = await fetch('https://localhost:5000/api/Book/list');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  };