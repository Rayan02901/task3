import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";




import Login from "./screens/Login";
import Register from "./screens/Register";
import AdminDashboard from './screens/Admin/AdminDashboard'; // Adjust the path as needed
import CreateEditBook from './screens/Admin/CreateEditBook';
import UserController from './screens/Admin/UserController';

import BookDescription from './screens/User/BookDescription';
import BookList from './screens/User/BookList';
import BookRecommendation from './screens/User/BookRecommendation';
import BookReview from './screens/User/BookReview';
import DiaryScreen from './screens/User/DiaryScreen';
import FriendRequestScreen from './screens/User/FriendRequestScreen';
import FriendsActivityScreen from './screens/User/FriendsActivityScreen';
import GenreSelection from './screens/User/GenreSelection';
import ListsScreen from './screens/User/ListsScreen';
import ProfileCreateScreen from './screens/User/ProfileCreateScreen';
import ProfileScreen from './screens/User/ProfileScreen';
import ProfileUpdateScreen from './screens/User/ProfileUpdateScreen';
import ReviewUserProfile from './screens/User/ReviewUserProfile';
import SearchScreen from './screens/User/SearchScreen';
import UserProfile from './screens/User/UserProfile';
import WatchlistScreen from './screens/User/WatchlistScreen';
import YourActivityScreen from './screens/User/YourActivityScreen';



const theme = {
  ...DefaultTheme,
  color: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const Stack = createStackNavigator();

const App = () => {
  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  if (!loaded) return null;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Register"
      >
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        
        

        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="CreateEditBook" component={CreateEditBook} />
        <Stack.Screen name="UserController" component={UserController} />

        <Stack.Screen name="BookRecommendation" component={BookRecommendation} />
        <Stack.Screen name="BookReview" component={BookReview} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="FriendsActivityScreen" component={FriendsActivityScreen} />
        <Stack.Screen name="FriendRequestScreen" component={FriendRequestScreen} />
        <Stack.Screen name="YourActivityScreen" component={YourActivityScreen} />
        <Stack.Screen name="DiaryScreen" component={DiaryScreen} />
        <Stack.Screen name="WatchlistScreen" component={WatchlistScreen} />
        <Stack.Screen name="ListsScreen" component={ListsScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="GenreSelection" component={GenreSelection} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="ReviewUserProfile" component={ReviewUserProfile} />
        <Stack.Screen name="ProfileUpdateScreen" component={ProfileUpdateScreen} />
        <Stack.Screen name="ProfileCreateScreen" component={ProfileCreateScreen} />
        <Stack.Screen name="BookList" component={BookList} />
        <Stack.Screen name="BookDescription" component={BookDescription} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
