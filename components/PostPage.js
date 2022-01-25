// Formik x React Native example
import React, { useState, useEffect, useContext, useRef } from 'react';
import {
   TextInput,
   View,
   Keyboard,
   Dimensions,
   ActivityIndicator,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Entypo } from '@expo/vector-icons';
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
import { PostContext } from '../PostContext';
import { useNavigation } from '@react-navigation/native';
import { DataStore } from '@aws-amplify/datastore';
import { Post, User } from '../models';
import { Storage, Auth, Predicates, SortDirection } from 'aws-amplify';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as ImagePicker from 'expo-image-picker';
import { ProfileContext } from '../ProfileContext';
import { AntDesign } from '@expo/vector-icons';

const PostPage = () => {
   const [post, setPost] = useContext(PostContext);
   const navigation = useNavigation();
   const [userID, setUserID] = useState(null);
   const [image, setImage] = useState(null);
   const [uploading, setUploading] = useState(false);
   const [progress, setProgress] = useState();
   const [extension, setExtension] = useState('');
   const [profile, setProfile] = useContext(ProfileContext);
   const formikRef = useRef();
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
         aspect: [4, 3],
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
               userID: profile[0].sub,
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
                        userid: profile[0].sub,
                     }}
                     onSubmit={(values) => addPost(values)}
                     innerRef={formikRef}
                  >
                     {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <Flex h='100%'>
                           <HStack
                              h='50%'
                              minH='100px'
                              maxH='100px'
                              justify={'center'}
                              alignContent={'center'}
                           >
                              <Avatar
                                 size='md'
                                 source={{
                                    uri: profile[0].image,
                                 }}
                                 ml='2'
                                 bg='#FF7900'
                              />
                              <Box ml='5'>
                                 <TextInput
                                    style={{ borderColor: '#00000050' }}
                                    autoFocus
                                    onChangeText={handleChange('body')}
                                    onBlur={handleBlur('body')}
                                    value={values.email}
                                    placeholder="What's happening?"
                                    style={{
                                       fontSize: 20,
                                       maxWidth: '95%',
                                    }}
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
                                 <HStack justifyContent={'center'}>
                                    <Button
                                       colorScheme='orange'
                                       bg='black'
                                       opacity={0.85}
                                       size={10}
                                       rounded={'full'}
                                       position={'absolute'}
                                       zIndex={1000}
                                       right={2}
                                       top={2}
                                       onPress={() => setImage(null)}
                                    >
                                       <AntDesign
                                          name='close'
                                          size={24}
                                          color='white'
                                       />
                                    </Button>
                                    <Image
                                       source={{ uri: image }}
                                       style={{
                                          height: undefined,
                                          width: '75%',
                                          aspectRatio: 4 / 3,
                                          borderRadius: 10,
                                       }}
                                       alt='Image preview'
                                    />
                                 </HStack>
                              </Flex>
                           )}
                           <Flex
                              justifyContent={'flex-end'}
                              h='250px'
                              // maxH={'50%'}
                           >
                              <HStack
                                 w='100%'
                                 h='100%'
                                 justifyContent={'flex-start'}
                              >
                                 <Pressable>
                                    <Button
                                       bg='#FF7900'
                                       colorScheme='orange'
                                       onPress={pickImage}
                                       mt={2}
                                    >
                                       <Entypo
                                          name='images'
                                          size={24}
                                          color='black'
                                       />
                                    </Button>
                                 </Pressable>
                              </HStack>
                           </Flex>
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
