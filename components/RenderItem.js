import React, { useState, useEffect } from 'react';
import {
   Pressable,
   HStack,
   //    Image,
   Text,
   Flex,
   Avatar,
   Box,
   Heading,
} from 'native-base';
import { Image } from 'react-native';
import { Storage } from 'aws-amplify';
import User from '../data/userinfo.json';
import { EvilIcons } from '@expo/vector-icons';

const RenderItem = ({ item }) => {
   const [image, setImage] = useState(null);

   useEffect(() => {
      if (item.image && item.image.startsWith('http')) setImage(item.image);
      else Storage.get(item.image).then(setImage);
   }, [item]);

   console.log(image);
   const LikeComment = React.memo(() => {
      return (
         <HStack
            w='100%'
            justifyContent={'space-evenly'}
            alignItems={'center'}
            h='55px'
         >
            <Pressable w='50%'>
               {({ isHovered, isPressed }) => {
                  return (
                     <HStack
                        w='100%'
                        h='50px'
                        borderRightWidth={1}
                        borderRightColor={'#00000050'}
                        bg={
                           isPressed
                              ? '#2b2b2e'
                              : isHovered
                              ? '#2b2b2e'
                              : '#3c3c3f'
                        }
                        justifyContent={'center'}
                        alignItems={'center'}
                     >
                        <EvilIcons name='like' size={24} color='white' />
                        <Text color='white'>Like</Text>
                     </HStack>
                  );
               }}
            </Pressable>
            <Pressable w='50%'>
               {({ isHovered, isPressed }) => {
                  return (
                     <HStack
                        w='100%'
                        h='50px'
                        bg={
                           isPressed
                              ? '#2b2b2e'
                              : isHovered
                              ? '#2b2b2e'
                              : '#3c3c3f'
                        }
                        justifyContent={'center'}
                        alignItems={'center'}
                     >
                        <EvilIcons name='comment' size={24} color='white' />
                        <Text color='white'>Comment</Text>
                     </HStack>
                  );
               }}
            </Pressable>
         </HStack>
      );
   });

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

   return (
      <Pressable>
         {({ isHovered, isPressed }) => {
            return (
               <HStack
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                  space={4}
                  w={'100%'}
                  bg={isPressed ? '#2b2b2e' : isHovered ? '#2b2b2e' : '#3c3c3f'}
               >
                  <Flex justify='flex-start'>
                     <HStack
                        justify='flex-start'
                        alignItems={'center'}
                        space={4}
                        py={5}
                        px={4}
                        w='100%'
                     >
                        <Avatar
                           size='md'
                           source={{
                              uri: User[0].avatar,
                           }}
                        />
                        <Box>
                           <Heading fontSize={'lg'} color='white'>
                              {User[0].name}
                           </Heading>
                           <Text color='gray.500'>
                              {timeSince(item.createdAt)}
                           </Text>
                        </Box>
                     </HStack>
                     <Box pb='6' px={4}>
                        <Text fontSize={'md'} color={'white'}>
                           {item.body}
                        </Text>
                     </Box>
                     {item.image && (
                        <Box pb='2'>
                           <Image
                              source={{ uri: image }}
                              style={{
                                 height: undefined,
                                 width: '100%',
                                 aspectRatio: 16 / 9,
                              }}
                           />
                        </Box>
                     )}
                     <Box borderTopWidth={1} borderTopColor={'#00000050'}>
                        <LikeComment />
                     </Box>
                  </Flex>
               </HStack>
            );
         }}
      </Pressable>
   );
};

export default RenderItem;
