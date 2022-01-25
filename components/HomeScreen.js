import 'react-native-gesture-handler';
import React, { useState, useEffect, useContext } from 'react';

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
import { User } from '../models';
import { DataStore } from '@aws-amplify/datastore';
import { PostContext } from '../PostContext';
import { Auth } from 'aws-amplify';
import AchievementsHome from './AchievementsHome';
import { useNavigation } from '@react-navigation/native';
// import Post from '../data/userpost.json';

// Define the config
const config = {
   useSystemColorMode: false,
   initialColorMode: 'dark',
};

// extend the theme
export const theme = extendTheme({ config });

export default function HomeScreen() {
   const navigation = useNavigation();
   const { height } = useWindowDimensions();
   const { colorMode, toggleColorMode } = useColorMode();
   const [message, setMessage] = useState('');
   const [post, setPost] = useContext(PostContext);
   const [user, setUser] = useState();
   const [profile, setProfile] = useState([]);
   useEffect(async () => {
      try {
         Auth.currentAuthenticatedUser({
            bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
         })
            .then((user) => setUser(user.attributes.sub))
            .then(
               setProfile(await DataStore.query(User, (c) => c.sub('eq', user)))
            )
            .catch((err) => console.log(err));
      } catch (Err) {
         console.warn(Err);
      }
   });
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
         if (Math.floor(interval) === 1) {
            return Math.floor(interval) + ' hour ago';
         }
         return Math.floor(interval) + ' hours ago';
      }
      interval = seconds / 60;
      if (interval > 1) {
         return Math.floor(interval) + ' minutes ago';
      }
      return Math.floor(seconds) + ' seconds ago';
   }

   const throwErr = (name) => {
      throw Error(`Homepage ${name} noooo`);
   };
   return (
      <SafeAreaProvider>
         <NativeBaseProvider>
            <SafeAreaView style={{ backgroundColor: 'gray.900' }}>
               {post.length > 0 && profile.length > 0 ? (
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
                           <Greeting user={profile[0].firstName} />
                        </Box>
                        {/* create a post */}
                        <Flex h='40%' justify='space-evenly'>
                           <CreatePost avatar={profile[0].image} />
                           {/* Achievemenst home button */}
                           <AchievementsHome />
                        </Flex>
                        <Box h='35%' mb='7%'>
                           <Pressable
                              onPress={() => {
                                 navigation.navigate('Timeline');
                              }}
                           >
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
                                                      uri: profile[0].image,
                                                   }}
                                                   bg={'#FF7900'}
                                                />
                                                <Box>
                                                   <Heading
                                                      fontSize={'lg'}
                                                      color='white'
                                                   >
                                                      {profile[0].firstName}{' '}
                                                      {profile[0].lastName}
                                                   </Heading>
                                                   <Text color='gray.500'>
                                                      {timeSince(
                                                         post[0].createdAt
                                                      )}
                                                   </Text>
                                                </Box>
                                             </HStack>
                                             <Box h='60%'>
                                                <Text color={'white'}>
                                                   {post[0].body}
                                                </Text>
                                             </Box>
                                          </Flex>
                                       </HStack>
                                    </HStack>
                                 );
                              }}
                           </Pressable>
                        </Box>
                     </Flex>
                  </Box>
               ) : null}
            </SafeAreaView>
         </NativeBaseProvider>
      </SafeAreaProvider>
   );
}
