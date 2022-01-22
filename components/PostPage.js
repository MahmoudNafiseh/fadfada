// Formik x React Native example
import React, { useState, useEffect, useContext, useRef } from 'react';
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
   Image,
   Button,
} from 'native-base';
import { Platform } from 'react-native';
import User from '../data/userinfo.json';
import { PostContext } from '../PostContext';
import { useNavigation } from '@react-navigation/native';
import { DataStore } from '@aws-amplify/datastore';
import { Post } from '../models';
import { Storage, Auth, Predicates, SortDirection } from 'aws-amplify';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as ImagePicker from 'expo-image-picker';

const PostPage = () => {
   const [post, setPost] = useContext(PostContext);
   const navigation = useNavigation();
   const [userID, setUserID] = useState(null);
   const [image, setImage] = useState(null);
   const [uploading, setUploading] = useState(false);
   const [progress, setProgress] = useState();
   const [extension, setExtension] = useState('');
   const formikRef = useRef();
   useEffect(() => {
      Auth.currentAuthenticatedUser({
         bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      })
         .then((user) => setUserID(user.attributes.sub))
         .catch((err) => console.log(err));
   }, []);
   useEffect(() => {
      (async () => {
         if (Platform.OS !== 'web') {
            const { status } =
               await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
               alert(
                  'Sorry, we need camera roll permissions to make this work!'
               );
               navigation.navigate('Home');
            }
         }
      })();
   }, []);

   const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [16, 9],
         quality: 1,
      }).then(setImage(null));

      if (!result.cancelled) {
         setImage(result.uri);
         setExtension(result.uri.split('.').pop());
         setUploading(false);
      }
   };
   const uploadImage = async () => {
      if (!image) {
         return;
      }
      try {
         const response = await fetch(image);
         const blob = await response.blob();
         let imgKey = uuidv4() + '.' + extension;
         await Storage.put(imgKey, blob, {
            progressCallback: (p) => {
               setProgress(p.loaded / p.total);
            },
         });
         return imgKey;
      } catch (err) {
         console.warn('error uploading file: ', err);
      }
   };

   const createDate = () => {
      return new Date();
   };

   const addPost = async (data) => {
      try {
         const key = await uploadImage();
         await DataStore.save(
            new Post({
               body: data.body,
               createdAt: createDate().toJSON(),
               userID: userID,
               image: key,
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
               <Box
                  h='5%'
                  w='100%'
                  minH={'40px'}
                  style={{
                     borderBottomColor: '#ffffff15',
                     borderBottomWidth: 1,
                  }}
               >
                  <HStack w='100%' justifyContent='space-between'>
                     <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons name='arrow-back' size={36} color='white' />
                     </Pressable>
                     <Button
                        bg={'#FF7900'}
                        size='md'
                        onPress={() => formikRef.current.handleSubmit()}
                        title='Submit'
                        fontWeight={'bold'}
                        w='30%'
                        colorScheme='orange'
                        mb='1'
                        rounded={'none'}
                     >
                        SUBMIT
                     </Button>
                  </HStack>
               </Box>
               <Box mt='5' backgroundColor={'#18181b'} h={'95%'}>
                  <Formik
                     initialValues={{
                        body: '',
                        userid: User[0].id,
                     }}
                     onSubmit={(values) => addPost(values)}
                     innerRef={formikRef}
                  >
                     {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <Flex h='95%'>
                           <HStack
                              h='30%'
                              minH='200px'
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
                                 <TextInput
                                    style={{ borderColor: '#00000050' }}
                                    autoFocus
                                    onChangeText={handleChange('body')}
                                    onBlur={handleBlur('body')}
                                    value={values.email}
                                    placeholder="What's happening?"
                                    style={{ fontSize: 20, maxWidth: '100%' }}
                                    color='white'
                                    multiline
                                    selectionColor={'#FF7900'}
                                    placeholderTextColor={'#9E9E9E'}
                                 />
                              </Box>
                           </HStack>
                           {image && (
                              <Flex
                                 justifyContent={'center'}
                                 alignItems='center'
                              >
                                 <Image
                                    source={{ uri: image }}
                                    style={{
                                       height: 200,
                                       width: undefined,
                                       aspectRatio: 16 / 9,
                                    }}
                                 />
                              </Flex>
                           )}
                           <HStack w='100%'>
                              <Button
                                 bg='#FF7900'
                                 colorScheme='orange'
                                 onPress={pickImage}
                              >
                                 Add Image
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
