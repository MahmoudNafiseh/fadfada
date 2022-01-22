import 'react-native-gesture-handler';
import React, { useState, useEffect, createContext } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import Amplify, { Auth, Predicates, SortDirection } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Post, User } from './models';

import awsconfig from './aws-exports';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PostContext } from './PostContext';
import HomeScreen from './components/HomeScreen';
import Timeline from './components/Timeline';
import Test1 from './components/Test1';
import PostPage from './components/PostPage';
import Test3 from './components/Test3';
import Test5 from './components/Test5';
import fetchAPI from './fetchAPI';
const config = {
   useSystemColorMode: false,
   initialColorMode: 'dark',
};

Amplify.configure({
   ...awsconfig,
   Analytics: {
      disabled: true,
   },
});
export const theme = extendTheme({ config });

// export const PostContext = createContext();
function App() {
   const [post, setPost] = useState([]);
   let currUser;
   useEffect(async () => {
      try {
         Auth.currentAuthenticatedUser({
            bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
         })
            .then((user) => (currUser = user.attributes.sub))
            .catch((err) => console.log(err));

         const postData = await DataStore.query(Post, Predicates.ALL, {
            sort: (s) => s.createdAt(SortDirection.DESCENDING),
         });
         setPost(postData);
         console.log(currUser, 'hiii');
      } catch (err) {
         console.log(err);
      } finally {
         const profile = await DataStore.query(User, (c) =>
            c.sub('eq', currUser)
         );
         if (profile.length === 0) {
            await DataStore.save(
               new User({
                  firstName: 'John',
                  Posts: [],
                  Comments: [],
                  Likes: [],
                  lastName: 'Doe',
                  sub: currUser,
                  checked: true,
               })
            );
         }
      }
   }, []);
   return (
      <PostContext.Provider value={[post, setPost]}>
         <NativeBaseProvider>
            <NavigationContainer>
               <StatusBar style={'light'} backgroundColor='#18181b' />
               <MyStack />
               {/* <DrawerNavigator /> */}
            </NavigationContainer>
         </NativeBaseProvider>
      </PostContext.Provider>
   );
}

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
   return (
      <Drawer.Navigator
         screenOptions={{
            headerShown: false,
            drawerActiveBackgroundColor: '#FF7900',
            drawerLabelStyle: { color: 'white' },
            drawerStyle: { backgroundColor: '#000000' },
         }}
      >
         <Drawer.Screen
            name='Main'
            options={{
               drawerLabel: 'Home',
            }}
            component={Home}
         />
         <Drawer.Screen name='Profile' component={Test3} />
      </Drawer.Navigator>
   );
};

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
function Home() {
   return (
      <Tab.Navigator
         barStyle={{
            backgroundColor: '#000',
            height: 64,
         }}
         activeColor='#FF7900'
         screenOptions={{
            headerShown: false,
         }}
      >
         <Tab.Screen
            name='HomeScreen'
            component={HomeScreen}
            options={{
               tabBarLabel: 'Home',
               tabBarIcon: ({ color }) => (
                  <Entypo name='home' size={24} color={color} />
               ),
            }}
         />
         <Tab.Screen
            name='Timeline'
            component={Timeline}
            options={{
               tabBarLabel: 'Timeline',
               tabBarIcon: ({ color }) => (
                  <MaterialIcons name='timeline' size={24} color={color} />
               ),
            }}
         />
         <Tab.Screen
            name='Messages'
            component={Test5}
            options={{
               tabBarLabel: 'Messages',
               tabBarIcon: ({ color }) => (
                  <Entypo name='chat' size={24} color={color} />
               ),
            }}
         />
      </Tab.Navigator>
   );
}
function MyStack() {
   return (
      <SafeAreaProvider>
         <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={DrawerNavigator} />
            <Stack.Screen name='Test1' component={Test1} />
            <Stack.Screen name='PostPage' component={PostPage} />
            <Stack.Screen name='Test3' component={Test3} />
         </Stack.Navigator>
      </SafeAreaProvider>
   );
}

export default withAuthenticator(App);
