import 'react-native-gesture-handler';
import React, { useState } from 'react';

import {
   View,
   useColorMode,
   NativeBaseProvider,
   extendTheme,
   Box,
   Pressable,
   HStack,
   Flex,
   Text,
   Avatar,
   Heading,
} from 'native-base';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import MenuItem from './MenuItem';
import Greeting from './Greeting';
import CreatePost from './CreatePost';
import User from '../data/userinfo.json';
import Post from '../data/userpost.json';
import { borderWidth } from 'styled-system';
import AchievementsHome from './AchievementsHome';

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

   function timeSince(date) {
      let seconds = Math.floor((new Date() - Date.parse(date)) / 1000);

      let interval = seconds / 31536000;

      if (interval > 1) {
         return Math.floor(interval) + ' years ago';
      }
      interval = seconds / 2592000;
      if (interval > 1) {
         return Math.floor(interval) + ' months ago';
      }
      interval = seconds / 86400;
      if (interval > 1) {
         return Math.floor(interval) + ' days ago';
      }
      interval = seconds / 3600;
      if (interval > 1) {
         return Math.floor(interval) + ' hours ago';
      }
      interval = seconds / 60;
      if (interval > 1) {
         return Math.floor(interval) + ' minutes ago';
      }
      return Math.floor(seconds) + ' seconds ago';
   }

   const throwErr = (name) => {
      throw Error(`${name} noooo`);
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
                  <Flex
                     px={5}
                     style={{
                        flexDirection: 'column',
                        height: height - 64,
                        justifyContent: 'space-evenly',
                     }}
                  >
                     {/* the greeting on screen */}
                     <Box h='10%'>
                        <Greeting user={User[0].name.split(' ')[0]} />
                     </Box>
                     {/* create a post */}
                     <Flex h='40%' justify='space-evenly'>
                        <CreatePost avatar={User[0].avatar} />
                        {/* Achievemenst home button */}
                        <AchievementsHome />
                     </Flex>
                     <Box h='35%' mb='7%'>
                        <Pressable>
                           {({ isHovered, isPressed }) => {
                              return (
                                 <HStack
                                    justifyContent={'flex-start'}
                                    alignItems={'center'}
                                    space={4}
                                    w={'100%'}
                                    h={'100%'}
                                    px={4}
                                    borderRadius={'2xl'}
                                    bg={
                                       isPressed
                                          ? '#2b2b2e'
                                          : isHovered
                                          ? '#2b2b2e'
                                          : '#3c3c3f'
                                    }
                                 >
                                    <HStack
                                       justifyContent={'center'}
                                       alignItems={'center'}
                                       space={2}
                                    >
                                       {User[0].id === Post[0].id ? (
                                          <Flex justify='flex-start'>
                                             <HStack
                                                justify='flex-start'
                                                alignItems={'center'}
                                                space={4}
                                                py={5}
                                                w='100%'
                                             >
                                                <Avatar
                                                   size='md'
                                                   source={{
                                                      uri: User[0].avatar,
                                                   }}
                                                />
                                                <Box>
                                                   <Heading
                                                      fontSize={'lg'}
                                                      color='white'
                                                   >
                                                      {User[0].name}
                                                   </Heading>
                                                   <Text color='gray.500'>
                                                      {timeSince(Post[0].time)}
                                                   </Text>
                                                </Box>
                                             </HStack>
                                             <Box h='60%'>
                                                <Text color={'white'}>
                                                   {Post[0].body}
                                                </Text>
                                             </Box>
                                          </Flex>
                                       ) : (
                                          throwErr('post')
                                       )}
                                    </HStack>
                                 </HStack>
                              );
                           }}
                        </Pressable>
                     </Box>
                  </Flex>
               </Box>
            </SafeAreaView>
         </NativeBaseProvider>
      </SafeAreaProvider>
   );
}
