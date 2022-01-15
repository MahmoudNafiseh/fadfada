// Formik x React Native example
import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { TextInput, View, Keyboard, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import {
   Flex,
   Box,
   Text,
   Pressable,
   HStack,
   Avatar,
   KeyboardAvoidingView,
   Button,
} from 'native-base';
import { Platform } from 'react-native';
import User from '../data/userinfo.json';
import { PostContext } from '../PostContext';
import { useNavigation } from '@react-navigation/native';
import { DataStore } from '@aws-amplify/datastore';
import { Post } from '../models';
import { Auth, Predicates, SortDirection } from 'aws-amplify';

import fetchAPI from '../fetchAPI';
const PostPage = () => {
   const [post, setPost] = useContext(PostContext);
   const navigation = useNavigation();
   const [userID, setUserID] = useState(null);
   useEffect(() => {
      Auth.currentAuthenticatedUser({
         bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      })
         .then((user) => setUserID(user.attributes.sub))
         .catch((err) => console.log(err));
   }, []);

   const createDate = () => {
      return new Date();
   };

   // const BackButton = () => {
   //    return (
   //       <Pressable
   //          onPress={() => navigation.goBack()}
   //          style={{
   //             borderBottomColor: '#ffffff15',
   //             borderBottomWidth: 1,
   //             minHeight: '36px',
   //             height: '5%',
   //          }}
   //       >
   //          {({ isHovered, isPressed }) => {
   //             return (
   //                <Box
   //                   bg={
   //                      isPressed
   //                         ? '#2b2b2e'
   //                         : isHovered
   //                         ? '#2b2b2e'
   //                         : '#3c3c3f'
   //                   }
   //                >
   //                   <Ionicons name='arrow-back' size={36} color='white' />
   //                </Box>
   //             );
   //          }}
   //       </Pressable>
   //    );
   // };
   const addPost = async (data) => {
      try {
         await DataStore.save(
            new Post({
               body: data.body,
               createdAt: createDate().toJSON(),
               userID: userID,
               Comments: [],
               Likes: [],
            })
         );
      } catch (error) {
         console.warn(error);
      } finally {
         try {
            const postData = await DataStore.query(Post, Predicates.ALL, {
               sort: (s) => s.createdAt(SortDirection.DESCENDING),
            });
            setPost(postData);
         } catch (err) {
            console.log(err);
         }
         navigation.navigate('Timeline');
      }
   };
   return (
      <SafeAreaProvider>
         <SafeAreaView
            style={{
               backgroundColor: '#18181b',
            }}
         >
            <KeyboardAvoidingView
               keyboardVerticalOffset={Platform.OS == 'ios' ? 10 : 28}
               behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
               style={{ backgroundColor: '#18181b' }}
            >
               <Box h='5%' minH={'36px'}>
                  <Pressable
                     onPress={() => navigation.goBack()}
                     style={{
                        borderBottomColor: '#ffffff15',
                        borderBottomWidth: 1,
                     }}
                  >
                     <Ionicons name='arrow-back' size={36} color='white' />
                  </Pressable>
               </Box>
               <Box mt='5' backgroundColor={'#18181b'} h={'95%'}>
                  <Formik
                     initialValues={{
                        body: '',
                        userid: User[0].id,
                     }}
                     onSubmit={(values) => addPost(values)}
                  >
                     {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <Flex h='95%'>
                           <HStack
                              h='90%'
                              justify={'center'}
                              alignContent={'center'}
                           >
                              <Avatar
                                 size='md'
                                 source={{
                                    uri: User[0].avatar,
                                 }}
                                 ml='2'
                              />
                              <Box ml='5'>
                                 {/* <Text fontSize={20} color='gray.500'>
                                       What's happening?
                                    </Text> */}
                                 <TextInput
                                    style={{ borderColor: '#00000050' }}
                                    autoFocus
                                    onChangeText={handleChange('body')}
                                    onBlur={handleBlur('body')}
                                    value={values.email}
                                    placeholder="What's happening?"
                                    style={{ fontSize: 20, maxWidth: '90%' }}
                                    color='white'
                                    multiline
                                    placeholderTextColor={'#9E9E9E'}
                                 />
                              </Box>
                           </HStack>
                           <HStack w='100%'>
                              <Button
                                 bg={'#FF7900'}
                                 size='md'
                                 onPress={handleSubmit}
                                 title='Submit'
                                 fontWeight={'bold'}
                                 w='100%'
                              >
                                 SUBMIT
                              </Button>
                           </HStack>
                        </Flex>
                     )}
                  </Formik>
               </Box>
            </KeyboardAvoidingView>
         </SafeAreaView>
      </SafeAreaProvider>
   );
};
export default PostPage;
