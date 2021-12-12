import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import {
   Heading,
   View,
   useColorMode,
   NativeBaseProvider,
   extendTheme,
   Box,
} from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

import MenuItem from './MenuItem';
// Define the config
const config = {
   useSystemColorMode: false,
   initialColorMode: 'dark',
};

// extend the theme
export const theme = extendTheme({ config });

export default function HomeScreen() {
   const { colorMode, toggleColorMode } = useColorMode();
   return (
      <NativeBaseProvider>
         <SafeAreaView style={{ backgroundColor: 'white' }}>
            <Box bg={colorMode === 'dark' ? 'black' : 'white'} pt={2}>
               <View
                  px={5}
                  style={{
                     display: 'flex',
                     flexDirection: 'column',
                     height: '100%',
                     justifyContent: 'space-evenly',
                  }}
               >
                  <Heading color='#FFBCA8' mb={1}>
                     Hello Mahmoud
                  </Heading>
                  <MenuItem
                     text={'text'}
                     color={'#FFE4DD'}
                     component={'Test1'}
                  />
                  <MenuItem
                     text={'text'}
                     color={'#FFE1C4'}
                     component={'Test2'}
                  />
                  <MenuItem
                     text={'text'}
                     color={'#FFEEDD'}
                     component={'Test3'}
                  />

                  <MenuItem
                     text={'text'}
                     color={'#FFE4DD'}
                     component={'Test4'}
                  />
               </View>
            </Box>
         </SafeAreaView>
      </NativeBaseProvider>
   );
}
