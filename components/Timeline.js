import React, {
   useState,
   useContext,
   useRef,
   useCallback,
   useEffect,
} from 'react';
import {
   Box,
   Pressable,
   VStack,
   Flex,
   Heading,
   HStack,
   FlatList,
   Avatar,
   Text,
   View,
} from 'native-base';
import { RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { DataStore } from '@aws-amplify/datastore';
import { Post } from '../models';
import { Predicates, SortDirection } from 'aws-amplify';
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios';
import User from '../data/userinfo.json';
import { PostContext } from '../PostContext';
import TimelineNoServer from './TimelineNoServer';
import { fetchAPI } from '../fetchAPI';
export default function Timeline() {
   const [refreshing, setRefreshing] = useState(false);
   const [post, setPost] = useContext(PostContext);
   const wait = (timeout) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
   };

   const onRefresh = useCallback(async () => {
      setRefreshing(true);
      // fetchAPI(setPost);
      try {
         const postData = await DataStore.query(Post, Predicates.ALL, {
            sort: (s) => s.createdAt(SortDirection.DESCENDING),
         });
         setPost(postData);
      } catch (err) {
         console.log(err);
      }
      wait(1000).then(() => setRefreshing(false));
   }, []);

   const renderItem = ({ item }) => (
      <Pressable>
         {({ isHovered, isPressed }) => {
            return (
               <HStack
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                  space={4}
                  w={'100%'}
                  px={4}
                  bg={isPressed ? '#2b2b2e' : isHovered ? '#2b2b2e' : '#3c3c3f'}
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
                     <Box>
                        <Text fontSize={'md'} color={'white'}>
                           {item.body}
                        </Text>
                     </Box>
                     <LikeComment />
                  </Flex>
               </HStack>
            );
         }}
      </Pressable>
   );

   const LikeComment = React.memo(() => {
      return (
         <HStack py={5} justifyContent={'space-evenly'}>
            <Pressable>
               <HStack justifyContent={'center'} alignItems={'center'}>
                  <EvilIcons name='like' size={24} color='white' />
                  <Text color='white'>Like</Text>
               </HStack>
            </Pressable>
            <Pressable>
               <HStack w='100%' justifyContent={'center'} alignItems={'center'}>
                  <EvilIcons name='comment' size={24} color='white' />
                  <Text color='white'>Comment</Text>
               </HStack>
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

   const Separator = () => {
      return <View bg='black' h='5px' />;
   };
   return (
      <SafeAreaView>
         {post ? (
            <FlatList
               data={post}
               renderItem={renderItem}
               keyExtractor={(item) => item.id.toString()}
               ItemSeparatorComponent={Separator}
               // refreshControl={
               //    <RefreshControl
               //       refreshing={refreshing}
               //       onRefresh={onRefresh}
               //    />
               // }

               maxToRenderPerBatch={30}
               refreshing={refreshing}
               onRefresh={onRefresh}
               extraData={post}
               // onContentSizeChange={() =>
               //    flatList.current.scrollToIndex({ index: 0, animated: true })
               // }
               // onLayout={() =>
               //    flatList.current.scrollToIndex({ index: 0, animated: true })
               // }
               // refreshControl={}
            />
         ) : (
            <TimelineNoServer />
         )}
      </SafeAreaView>
   );
}
