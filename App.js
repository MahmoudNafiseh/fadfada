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
import { Post } from './models';

import awsconfig from './aws-exports';

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
import { PredicateAll } from '@aws-amplify/datastore/lib-esm/predicates';
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
   useEffect(async () => {
      try {
         const postData = await DataStore.query(Post, Predicates.ALL, {
            sort: (s) => s.createdAt(SortDirection.DESCENDING),
         });
         setPost(postData);
      } catch (err) {
         console.log(err);
      }
   }, []);
   return (
      <PostContext.Provider value={[post, setPost]}>
         <NativeBaseProvider>
            <NavigationContainer>
               <StatusBar style={'light'} backgroundColor='#18181b' />
               <MyStack />
            </NavigationContainer>
         </NativeBaseProvider>
      </PostContext.Provider>
   );
}

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
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Test1' component={Test1} />
            <Stack.Screen name='PostPage' component={PostPage} />
            <Stack.Screen name='Test3' component={Test3} />
         </Stack.Navigator>
      </SafeAreaProvider>
   );
}

export default withAuthenticator(App);
