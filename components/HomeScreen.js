import 'react-native-gesture-handler';
import React, { useState } from 'react';

import {
   View,
   useColorMode,
   NativeBaseProvider,
   extendTheme,
   Box,
} from 'native-base';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';

import MenuItem from './MenuItem';
import Greeting from './Greeting';
import CreatePost from './CreatePost';
import User from '../data/userinfo.json';

// Define the config
const config = {
   useSystemColorMode: false,
   initialColorMode: 'dark',
};

// extend the theme
export const theme = extendTheme({ config });

export default function HomeScreen() {
   const { height } = useWindowDimensions();
   const { colorMode, toggleColorMode } = useColorMode();
   const [modalVisible, setModalVisible] = useState(false);
   const [message, setMessage] = useState('');

   const handleChange = (e) => {
      e.preventDefault();
      setMessage(e.target.value);
   };

   return (
      <SafeAreaProvider>
         <NativeBaseProvider>
            <SafeAreaView style={{ backgroundColor: 'gray.900' }}>
               <Box
                  bg={colorMode === 'dark' ? 'black' : 'white'}
                  pt={2}
                  alignContent={'flex-start'}
                  backgroundColor={'gray.900'}
               >
                  <View
                     px={5}
                     style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: height - 64,
                        justifyContent: 'space-evenly',
                     }}
                  >
                     {/* the greeting on screen */}
                     <Greeting user={User[0].name.split(' ')[0]} />
                     {/* create a post */}
                     <CreatePost avatar={User[0].avatar} />
                     {/* placeholder menu items, will change into timeline sneak peek  */}
                     <MenuItem
                        text={'text'}
                        color={'#FF000070'}
                        component={'Test1'}
                     />
                     <MenuItem
                        text={'text'}
                        color={'#FF000070'}
                        component={'Test2'}
                     />
                     <MenuItem
                        text={'text'}
                        color={'#FF000070'}
                        component={'Test3'}
                     />
                  </View>
               </Box>
            </SafeAreaView>
         </NativeBaseProvider>
      </SafeAreaProvider>
   );
}
