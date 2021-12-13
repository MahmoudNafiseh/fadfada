import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import {
   Text,
   Link,
   HStack,
   Center,
   Spacer,
   Heading,
   Switch,
   View,
   useColorMode,
   NativeBaseProvider,
   extendTheme,
   VStack,
   Button,
   Box,
} from 'native-base';
import { StatusBar } from 'expo-status-bar';

import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';

import HomeScreen from './components/HomeScreen';
import BottomSheet from './components/BottomSheet';
import Test1 from './components/Test1';
import Test2 from './components/Test2';
import Test3 from './components/Test3';
import Test4 from './components/Test4';
import Test5 from './components/Test5';

const config = {
   useSystemColorMode: false,
   initialColorMode: 'dark',
};

export const theme = extendTheme({ config });

export default function App() {
   const { colorMode, toggleColorMode } = useColorMode();
   return (
      <NativeBaseProvider>
         <NavigationContainer>
            <StatusBar style={'light'} backgroundColor='#18181b' />

            <MyStack />
         </NavigationContainer>
      </NativeBaseProvider>
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
            component={Test4}
            options={{
               tabBarLabel: 'Timeline',
               tabBarIcon: ({ color }) => (
                  <Entypo name='chat' size={24} color={color} />
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
            <Stack.Screen name='Test2' component={Test2} />
            <Stack.Screen name='Test3' component={Test3} />
            <Stack.Screen name='Test4' component={Test4} />
         </Stack.Navigator>
      </SafeAreaProvider>
   );
}
