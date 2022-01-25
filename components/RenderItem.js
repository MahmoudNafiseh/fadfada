import React, { useState, useEffect, useContext } from 'react';
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
import { Image, Dimensions } from 'react-native';
import { Storage } from 'aws-amplify';
import { EvilIcons } from '@expo/vector-icons';
import { User, Likes } from '../models';
import { DataStore } from 'aws-amplify';
import { ActivityIndicator } from 'react-native';
import { ProfileContext } from '../ProfileContext';
const RenderItem = ({ item }) => {
   const [image, setImage] = useState(null);
   const [profile, setProfile] = useState([]);
   const [likes, setLikes] = useState([]);
   const [userLikes, setUserLikes] = useState([]);
   const [isLiked, setIsLiked] = useState(false);
   const [userProfile, setUserProfile] = useContext(ProfileContext);
   useEffect(async () => {
      setProfile(await DataStore.query(User, (c) => c.sub('eq', item.userID)));
      setLikes(await DataStore.query(Likes, (c) => c.postID('eq', item.id)));
      setUserLikes(
         await DataStore.query(Likes, (c) =>
            c.postID('eq', item.id).userID('eq', userProfile[0].id)
         )
      );
   }, []);

   useEffect(async () => {
      setUserLikes(
         await DataStore.query(Likes, (c) =>
            c.postID('eq', item.id).userID('eq', userProfile[0].id)
         )
      );

      if (userLikes.length > 0) {
         setIsLiked(true);
      }
   }, [userLikes]);
   useEffect(() => {
      if (item.image && item.image.startsWith('http')) setImage(item.image);
      else Storage.get(item.image).then(setImage);
   }, [item]);

   const addLike = async () => {
      try {
         if (userLikes.length > 0) {
            setIsLiked(false);

            await DataStore.delete(Likes, (c) =>
               c.postID('eq', item.id).userID('eq', userProfile[0].id)
            )
               .then(
                  setLikes(
                     await DataStore.query(Likes, (c) =>
                        c.postID('eq', item.id)
                     )
                  )
               )
               .then(
                  setUserLikes(
                     await DataStore.query(Likes, (c) =>
                        c.postID('eq', item.id).userID('eq', userProfile[0].id)
                     )
                  )
               );
         } else {
            setIsLiked(true);
            await DataStore.save(
               new Likes({
                  postID: item.id,
                  userID: userProfile[0].id,
               })
            )
               .then(
                  setLikes(
                     await DataStore.query(Likes, (c) =>
                        c.postID('eq', item.id)
                     )
                  )
               )
               .then(
                  setUserLikes(
                     await DataStore.query(Likes, (c) =>
                        c.postID('eq', item.id).userID('eq', userProfile[0].id)
                     )
                  )
               );
         }
      } catch (Err) {
         console.warn(Err);
      }
   };
   const LikeComment = ({ isLiked }) => {
      return (
         <HStack
            w='100%'
            justifyContent={'space-evenly'}
            alignItems={'center'}
            h='55px'
         >
            <Pressable w='50%' onPress={addLike}>
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
                              : isLiked && isPressed
                              ? '#F16E00'
                              : isLiked && isHovered
                              ? '#F16E00'
                              : isLiked
                              ? '#FF7900'
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
                  {profile.length > 0 ? (
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
                                 uri: profile[0].image,
                              }}
                              bg='#FF7900'
                           />
                           <Box>
                              <Heading fontSize={'lg'} color='white'>
                                 {profile[0].firstName} {profile[0].lastName}
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
                           <LikeComment isLiked={isLiked} />
                        </Box>
                     </Flex>
                  ) : (
                     <Box
                        h={Dimensions.get('window').height}
                        w='100%'
                        justifyContent={'center'}
                        d='flex'
                        bg='black'
                     >
                        {' '}
                        <ActivityIndicator size='large' color='#FF7900' />
                     </Box>
                  )}
               </HStack>
            );
         }}
      </Pressable>
   );
};

export default RenderItem;
